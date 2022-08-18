import { Injectable } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
  getDbConnection() {
    return MongooseModule.forRoot("mongodb://localhost:27017/demo");
  }
}
