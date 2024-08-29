import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

const port = process.env.API_PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(port, () => {
    console.log(`Nest.js api server listening on port ${port}`)
  });
}
bootstrap();
