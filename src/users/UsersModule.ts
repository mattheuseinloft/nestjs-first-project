import { Module } from '@nestjs/common'

import { UsersController } from '../users/controllers/UsersController'
import { UsersService } from '../users/services/UsersService'

@Module({
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule { }
