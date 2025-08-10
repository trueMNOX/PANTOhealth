import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true
    }),
    MongooseModule.forRootAsync({
        inject:[ConfigService],
        useFactory: (config : ConfigService) => ({
            uri: config.get<string>('MONGO_URI')
        }),

    }),
    RabbitmqModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
