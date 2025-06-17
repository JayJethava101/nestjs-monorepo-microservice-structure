import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ApiLog extends Document {
  @Prop({ required: true })
  request_id: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  url: string;

  @Prop({ type: Object })
  request_body: any;

  @Prop({ type: Object })
  request_headers: Record<string, string>;

  @Prop({ type: Object })
  device_info: {
    browser: { name?: string; version?: string };
    os: { name?: string; version?: string };
    device: { type?: string; model?: string; vendor?: string };
  };

  @Prop()
  userId?: string;

  @Prop()
  tenant_id?: string;

  @Prop()
  correlation_id?: string;

  @Prop()
  session_id?: string;

  @Prop({ required: true })
  service_name: string;

  @Prop({ type: Object })
  response_body: any;

  @Prop({ type: Object })
  response_headers: Record<string, string>;

  @Prop({ required: true })
  status_code: number;

  @Prop({ required: true })
  response_time: number;

  @Prop({ required: true })
  payload_size: number;

  @Prop({ type: Object })
  error_details?: {
    message: string;
    stack?: string;
    code?: string;
  };
}

export const ApiLogSchema = SchemaFactory.createForClass(ApiLog); 