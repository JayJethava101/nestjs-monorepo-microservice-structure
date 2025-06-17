import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiLog } from '../schemas/api-log.schema';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);

  constructor(
    @InjectModel(ApiLog.name) private readonly apiLogModel: Model<ApiLog>,
  ) {}

  async log(data: any): Promise<void> {
    try {
      const log = new this.apiLogModel(data);
      await log.save();
    } catch (error) {
      this.logger.error('Failed to save log:', error);
    }
  }
} 