import express, { Request, Response } from "express";
import multer from "multer";
import * as Minio from "minio";

const app = express();
const port = 8080;

const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "minio",
  secretKey: "minio123",
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    try {
      const tempFilePath = `temp/${file.originalname}`;
      await minioClient.putObject(
        "video-encoder-temp",
        tempFilePath,
        file.buffer
      );
      res.send("File uploaded successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to upload file.");
    }
  }
);
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

