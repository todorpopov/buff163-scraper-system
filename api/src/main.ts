import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.API_PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    console.log(`Nest.js api server listening on port ${port}`)
  });
}
bootstrap();
