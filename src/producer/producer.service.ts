import { Injectable, Logger } from '@nestjs/common';
import sampleData from './sample-data.json';
import { RabbitmqService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class ProducerService {
    private readonly logger = new Logger(ProducerService.name)

    constructor(
        private readonly rabbitmqService: RabbitmqService
    ) { }

    async SendSampleData() {
        await this.rabbitmqService.SendMessage(sampleData)
        this.logger.log('Sample data sent to RabbitMQ');
    }
}
