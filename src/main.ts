/* eslint-disable no-console */
import {
  BaseExceptionFilter,
  HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';
import cors from 'cors';
import compression from 'compression';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  /**
   * Security and optimization middlewares
   */
  app.use(cors());
  app.use(compression());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // References: https://nestjs-prisma.dev/docs/shutdown-hook/
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  /** Start NestApplication HTTP server */
  const port = parseInt(process.env.PORT, 10) || 3000;
  await app.listen(port);
  console.log(`Nest app listening at port ${port}`);
}

bootstrap();
