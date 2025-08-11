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

    async saveSignal(rawData: any): Promise<Signal> {
        try {

            const deviceId = Object.keys(rawData)[0]
            const deviceData = rawData[deviceId]
            const time = deviceData.time
            const dataArray = deviceData.data || []
            const dataLength = dataArray.length
            const dataVolume = Buffer.byteLength(JSON.stringify(dataArray), 'utf8')

            const signal = new this.signalModel({
                deviceId,
                time,
                dataLength: dataLength,
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

    async findAll(): Promise<Signal[]> {
        return this.signalModel.find().exec()
    }

    async findById(id: string): Promise<Signal | null> {
        const result = await this.signalModel.findById(id).exec();
        if (!result) {
            this.logger.warn("the item is not found")
            return null;
        }
        return result.toObject();
    }
    async Update(id: string, updateData: Partial<Signal>): Promise<Signal | null> {
        const result = await this.signalModel.findById(id).exec();
        if (!result) {
            this.logger.warn("the item is not found")
            return null;
        }
        return this.signalModel.findByIdAndUpdate(id, updateData, { new: true }).exec()
    }

    async Delete(id: string): Promise<boolean> {
        const result = await this.signalModel.findById(id).exec();
        if (!result) {
            this.logger.warn("the item is not found")
        }
        const item = await this.signalModel.findByIdAndDelete(id).exec()
        return !!item
    }

    async FilterSignal(deviceId?: string, from?: string, to?: string): Promise<Signal[]> {
        const query: any = {}
        if (deviceId) {
            query.deviceId = deviceId
        }

        if (from || to) {
            query.time = {}
            if (from) query.time.$gte = Number(from)
            if (to) query.time.$lte = Number(to)
        }

        return this.signalModel.find(query).exec()
    }
}
