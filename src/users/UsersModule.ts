import { Module } from '@nestjs/common'

import { UsersController } from '../users/controllers/UsersController'
import { UsersService } from '../users/services/UsersService'

import UsersRepository from './repositories/UsersRepository'

@Module({
    controllers: [UsersController],
    providers: [UsersService, {
        provide: 'UsersRepository',
        useClass: UsersRepository
    }]
})
export class UsersModule { }
