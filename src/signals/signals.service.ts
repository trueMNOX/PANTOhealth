import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Signal, SignalDocument, SignalSchema } from './schemas/signal.schema';
import { Model } from 'mongoose';

@Injectable()
export class SignalsService {
    private readonly logger = new Logger(SignalsService.name)

    constructor(
        @InjectModel(Signal.name)
        private readonly signalModel: Model<SignalDocument>
    ) { }

    async saveData(rawData: any): Promise<Signal> {
        try {

            const deviceId = Object.keys(rawData)[0]
            const deviceData = rawData[deviceId]
            const time = deviceData.time
            const dataArray = deviceData.data || []
            const dataLenght = deviceData.length
            const dataVolume = Buffer.byteLength(JSON.stringify(dataArray), 'utf8')

            const signal = new this.signalModel({
                deviceId,
                time,
                dataLenght,
                dataVolume,
                rawData
            })

            const saved = await signal.save()
            this.logger.log(`Signal saved for deviceId=${deviceId}`)
            return saved

        } catch (err) {

            this.logger.error('Error saving signal', err)
            throw err
        }

    }

    async findAll ():Promise<Signal[]> {
        return this.signalModel.find().exec()
    }

}
