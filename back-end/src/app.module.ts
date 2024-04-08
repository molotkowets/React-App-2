import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskManagementModule } from './task-management/task-management.module';
import { join, relative } from 'path';
import { LoggerModule, Params } from 'nestjs-pino';
import { BoardsModule } from './boards/boards.module';
import { HistoryModule } from './history/history.module';
import * as Joi from 'joi';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbDir = relative(process.cwd(), __dirname);

        return {
          type: 'postgres',
          migrationsRun: true,
          migrationsTableName: configService.get('DATABASE_MIGRATION_TABLE'),
          host: configService.get('DATABASE_HOST'),
          port: +configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database:
            configService.get('NODE_ENV') === 'test'
              ? configService.get('DATABASE_NAME_TEST')
              : configService.get('DATABASE_NAME'),
          autoLoadEntities: true,
          migrations: [join(dbDir, 'migrations', '*.{ts,js}')],
          synchronize: false,
          logging: configService.get('NODE_ENV') === 'dev',
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
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),
      }),
      isGlobal: true,
    }),
    TaskManagementModule,
    LoggerModule.forRootAsync({
      useFactory: (cfg: ConfigService): Params => ({
        pinoHttp: [
          {
            level: cfg.get('NODE_ENV') === 'test' ? 'error' : 'info',
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
      inject: [ConfigService],
    }),
    BoardsModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
