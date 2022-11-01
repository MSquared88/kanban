import server from "../server/server";

const port = process.env.PORT || 8888;
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
