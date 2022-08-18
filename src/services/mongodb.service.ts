import { Injectable } from "@nestjs/common";
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from "@nestjs/mongoose";

@Injectable()
export class MongoService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    const user = process.env.REMOTE_DB_UNAME;
    const database = "csv-employee-directory";
    const password = process.env.REMOTE_DB_PWORD;

    return {
      uri: `mongodb+srv://${user}:${password}@cluster0.cewxcbd.mongodb.net/${database}`,
    };
  }
}
