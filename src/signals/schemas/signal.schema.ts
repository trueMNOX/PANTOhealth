import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type SignalDocument = Signal & Document;

@Schema({ timestamps: true })
export class Signal {
    @Prop({ required: true })
    deviceId: string;

    @Prop({ required: true })
    time: number;

    @Prop({ required: true })
    dataLength: number;

    @Prop({ required: true })
    dataVolume: number;

    @Prop({ type: Object, required: true })
    rawData: Record<string, any>;
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
