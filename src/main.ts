import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  const options = new DocumentBuilder()
    .setTitle('Stationary Project')
    .setDescription('The Stationary API description')
    .setVersion('1.0')
    .addTag('mighat')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen( process.env.port || 3000 );
}
bootstrap();
