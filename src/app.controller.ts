import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly rabbitmqService: RabbitmqService
    ) { }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }


    @Get("send")
    SendMessage() {
        const data = { text: "this is a test data" }
        this.rabbitmqService.SendMessage(data)
        return {
            status: "Message sent"
        }
    }

    

}
