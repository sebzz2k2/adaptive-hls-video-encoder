import redis from "redis";
(async () => {
  const client = redis.createClient({
    url: "redis://localhost:6379",
    password: "redis",
  });

  const subscriber = client.duplicate();

  await subscriber.connect();

  await subscriber.subscribe(
    "__keyspace@0__:temp-video-encoder",
    (message: string) => {
      console.log(message); // 'message'
    }
  );
})();
