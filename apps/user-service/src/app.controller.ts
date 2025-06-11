import { Controller, Get, Req } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

@Controller('test')
export class TestController {
  constructor(private readonly logger: PinoLogger) {}

  @Get()
  getTest(@Req() req: any) {
    this.logger.info({
      msg: 'User Service test endpoint hit',
      tenantId: req.tenantId,
      correlationId: req.correlationId,
    });
    return { message: 'ok' };
  }
} 