import { Module, Global } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

// Shared LoggerModule for all microservices using nestjs-pino, pino-pretty (dev), and pino-mongodb (prod)
@Global()
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      useFactory: () => {
        const logToMongo = process.env.LOG_TO_MONGODB === 'true';
        return {
          pinoHttp: logToMongo
            ? {
                level: 'info',
                transport: {
                  target: 'pino-mongodb',
                  options: {
                    uri: process.env.MONGODB_URI,
                    collection: 'logs',
                  },
                },
              }
            : {
                level: 'debug',
                transport: {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                  },
                },
              },
        };
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {} 