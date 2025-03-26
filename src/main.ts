import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger(),
  });

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe());

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the server
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
