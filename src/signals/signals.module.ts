import { Module } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { SignalsController } from './signals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Signal, SignalSchema } from './schemas/signal.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Signal.name, schema: SignalSchema }]),
    ],
    controllers: [SignalsController],
    providers: [SignalsService],
    exports: [SignalsService],
})
export class SignalsModule { }
