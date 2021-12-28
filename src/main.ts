import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  //enable cors.
  app.enableCors();
  app.useLogger(app.get(LoggerService));
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const logger = app.get(LoggerService);
  await app.listen(configService.get('PORT') ?? 8888);
  logger.log(
    `Server running at: http://localhost:${configService.get('PORT')}`,
  );
}
bootstrap();
