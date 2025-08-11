import { forwardRef, Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
    imports: [forwardRef(() => RabbitmqModule)],
    providers: [ProducerService],
    exports: [ProducerService],

})
export class ProducerModule { }
