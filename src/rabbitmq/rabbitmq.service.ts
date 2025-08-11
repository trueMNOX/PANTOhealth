import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from "amqplib";
import { SignalsService } from 'src/signals/signals.service';


@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {


    private readonly logger = new Logger(RabbitmqService.name)
    private conection = amqp.Conection
    private channel = amqp.Channel
    private readonly queueName = 'x-ray'

    constructor(
        private config: ConfigService,
        private readonly signalService: SignalsService
    ) { }

    async onModuleInit() {
        try {
            const rabbitUrl = await this.config.get<string>('RABBITMQ_URL')

            this.conection = await amqp.connect(rabbitUrl)
            this.logger.log("Connected to RabbitMQ")

            this.channel = await this.conection.createChannel()
            this.logger.log("Channel created")

            await this.channel.assertQueue(this.queueName, { durable: true })
            this.logger.log(`Queue "${this.queueName}" is ready`);

            await this.ConsumeMessage()

        } catch (err) {
            this.logger.error('Failed to connect to RabbitMQ', err);
        }
    }

    async SendMessage(message: any) {
        if (!this.channel) throw new Error("Channel not initialized");
        const BufferMessage = Buffer.from(JSON.stringify(message))
        this.channel.sendToQueue(this.queueName, BufferMessage, { persistent: true })
        this.logger.log(`Sent message to queue "${this.queueName}": ${JSON.stringify(message)}`);
    }

    async ConsumeMessage() {
        if (!this.channel) throw new Error('Channel not initialized');
        await this.channel.consume(this.queueName, async (msg) => {
            if (msg) {
                try {

                    const content = JSON.parse(msg.content.toString())
                    this.logger.log(`Received message`)

                    await this.signalService.saveSignal(content)
                    this.channel.ack(msg)

                } catch (err) {
                    this.logger.error('Error processing message', err);
                    this.channel.nack(msg, false, false);
                }
            }
        })
    }

    async onModuleDestroy() {
        await this.channel?.close()
        await this.conection?.close()
        this.logger.log('RabbitMQ connection closed');
    }
}
