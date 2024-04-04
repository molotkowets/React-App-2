import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskManagementModule } from './task-management/task-management.module';
import { join, relative } from 'path';
import { LoggerModule, Params } from 'nestjs-pino';
import * as Joi from 'joi';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbDir = relative(process.cwd(), __dirname);

        return {
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: +configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          autoLoadEntities: true,
          migrations: [join(dbDir, 'migrations', '*.{ts,js}')],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().port().required(),
        DATABASE_HOST: Joi.string().required(),
        PORT: Joi.number().port().default(3000),
        NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
      }),
      isGlobal: true,
    }),
    TaskManagementModule,
    LoggerModule.forRootAsync({
      useFactory: (): Params => ({
        pinoHttp: [
          {
            level: 'info',
            transport: {
              target: 'pino-pretty',
              options: {
                colorize: true,
              },
            },
          },
          process.stdout,
        ],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
