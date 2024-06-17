import redis from "redis";
import * as Minio from "minio";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const getMinioClient = () => {
  return new Minio.Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: "minio",
    secretKey: "minio123",
  });
};
const getRedisClient = () => {
  return redis.createClient({
    url: "redis://localhost:6379",
    password: "redis",
  });
};
(async () => {
  const client = getRedisClient();
  const subscriber = client.duplicate();
  await subscriber.connect();

  await subscriber.subscribe(
    "__keyspace@0__:temp-video-encoder",
    async (message: string) => {
      if (message === "hset") {
        await processMessage(message);
      }
    }
  );
})();

async function processMessage(message: string) {
  const client = getRedisClient();
  const subscriber = client.duplicate();
  await subscriber.connect();

  const key = "temp-video-encoder";
  const value = await subscriber.hGetAll(key);

  const minioClient = getMinioClient();
  Object.keys(value).forEach(async (key) => {
    const videoName = key.split("/")[1];
    await minioClient.fGetObject(
      "video-encoder-temp",
      videoName,
      `temp/${videoName}`
    );
  });

  const proc = Bun.spawnSync(["bash", "./script.sh"]);
  if (proc.success) {
    const files = await getFiles("temp");

    for (const file of files) {
      const fileName = file.split("/")[1];
      try {
        await subscriber.hDel(key, `video-encoder-temp/${fileName}`);
      } catch (error) {
        console.error(error);
      }
    }

    await uploadFolder("final");
  }

  await subscriber.disconnect();
}

async function getFiles(directoryPath: string) {
  try {
    const fileNames = await readdir(directoryPath);
    const filePaths = fileNames.map((fn) => join(directoryPath, fn));
    return filePaths;
  } catch (err) {
    console.error(err);
    return [];
  }
}

const uploadFolder = async (currentPath: string, prefix: string = "") => {
  const bucketName = "video-encoder-final";
  const minioClient = getMinioClient();
  const items = await readdir(currentPath, { withFileTypes: true });
  for (const item of items) {
    const itemPath = join(currentPath, item.name);
    console.log(itemPath);
    const minioPath = prefix ? `${prefix}/${item.name}` : item.name;

    if (item.isDirectory()) {
      await uploadFolder(itemPath, minioPath);
    } else {
      const fileContent = await readFile(itemPath);
      await minioClient.putObject(bucketName, minioPath, fileContent);
      console.log(`Uploaded ${minioPath} to ${bucketName}`);
    }
  }
};
