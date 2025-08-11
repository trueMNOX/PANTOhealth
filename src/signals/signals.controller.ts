import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SignalsService } from './signals.service';
import { Signal } from './schemas/signal.schema';

@Controller('signals')
export class SignalsController {
    constructor(
        private readonly signalService: SignalsService
    ) { }

    @Get()
    async GetAll(): Promise<Signal[]> {
        return this.signalService.findAll()
    }

    @Get(':id')
    async GetOne(@Param('id') id: string): Promise<Signal | null> {
        return this.signalService.findById(id)
    }

    @Post()
    async Create(@Body() data: any): Promise<Signal> {
        return this.signalService.saveSignal(data)
    }

    @Put(':id')
    async Update(@Param('id') id: string, @Body() data: Partial<Signal>): Promise<Signal | null> {
        return this.signalService.Update(id, data)
    }

    @Delete(':id')
    async Delete(@Param('id') id: string): Promise<{ deleted: boolean }> {
        const deleted = await this.signalService.Delete(id)
        return { deleted }
    }

    @Get('filter')
    async Filter(
        @Query('deviceId') deviceId?: string,
        @Query('from') from?: string,
        @Query('to') to?: string
    ):Promise<Signal[]>{
        return await this.signalService.FilterSignal(deviceId, from, to)
    }
}
