import { DataSource, DataSourceOptions } from "typeorm";

require("dotenv").config();

export default class ConnectionService {
  private static instance: ConnectionService;
  private connection: DataSource;

  private constructor() {
    const dataSourceOptions: DataSourceOptions = {
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      entities: [
        // 프로덕션과 개발버전 차이
        process.env.NODE_ENV === "production"
          ? "dist/server/models/**/*.entity.{js,ts}"
          : "server/models/**/*.entity.{js,ts}",
      ],
    };
    this.connection = new DataSource(dataSourceOptions);
    ConnectionService.instance = this;
  }

  static async getConnection() {
    if (!this.instance) {
      this.instance = new ConnectionService();
    }
    const connection = this.instance.connection;
    if (!connection.isInitialized) {
      await connection.initialize();
    }
    return connection;
  }
}
