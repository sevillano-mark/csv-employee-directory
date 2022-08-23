import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./filter/http-exception.filter";
import { MongoExceptionFilter } from "./filter/mongo-exception.filter";
import { HttpResponseInterceptor } from "./interceptors/http-response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ["1"],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle("CSV Employee Directory")
    .setDescription("API Documentation")
    .setVersion("1.0")
    .addTag("Employee")
    .addTag("Community")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
