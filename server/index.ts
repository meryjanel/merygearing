import nextApp from "./next";
import { Express } from "express";
require("dotenv").config();

const PORT = process.env.PORT;

// nextApp 실행하기
nextApp()
  .then((server: Express) => {
    server.listen(PORT, () => {
      console.log(`Server ready on http://localhost:${PORT}`);
    });
  })
  .catch((e: Error) => {
    console.error("mainserver : " + e);
  });
