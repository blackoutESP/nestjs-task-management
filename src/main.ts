import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TasksLogger } from './logger/logger';

async function bootstrap() {
  const logger = new TasksLogger();
  const app = await NestFactory.create(AppModule, {
    logger: logger,
    cors: {
      origin: true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      credentials: false
    }
  });
  await app.listen(3000);
}
bootstrap();
