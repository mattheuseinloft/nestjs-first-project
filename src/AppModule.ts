import { Module } from '@nestjs/common'
import { AppController } from './api/v1/AppController'
import { AppService } from './services/AppService'

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
