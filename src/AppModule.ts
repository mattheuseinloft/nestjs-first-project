import { Module } from '@nestjs/common'

import { AppController } from './api/v1/AppController'
import { AppService } from './services/AppService'
import { UsersModule } from './users/UsersModule'

@Module({
    imports: [UsersModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule { }
