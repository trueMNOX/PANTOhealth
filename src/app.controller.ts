import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { ProducerService } from './producer/producer.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly productService: ProducerService
    ) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }


    @Get("send")
    async ProductSample(){
        return await this.productService.SendSampleData()
        return { status: 'Sample data sent' };
    }



}
