import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongoService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    const user = 'localhost';
    const port = '27017';
    const database = 'csv-employee-directory';
    // const password = this.configService.get(Configuration.DB_MONGO_PASSWORD);
    // const server   = this.configService.get(Configuration.DB_MONGO_HOST);
    // const database = this.configService.get(Configuration.DB_MONGO_DATABASE);

    return {
      // uri: `mongodb://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`,
      uri: `mongodb://${user}:${port}/${database}?retryWrites=true&w=majority`,
    };
  }
}
