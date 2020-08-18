import { Module } from '@nestjs/common'

import { UsersController } from '../users/controllers/UsersController'
import ListUsersService from '../users/services/ListUsersService'
import CreateUserService from '../users/services/CreateUserService'
import ShowUserService from '../users/services/ShowUserService'
import UpdateUserService from '../users/services/UpdateUserService'
import DeleteUserService from '../users/services/DeleteUserService'

import FakeUsersRepository from './repositories/fakes/FakeUsersRepository'

@Module({
    controllers: [UsersController],
    providers: [
        ListUsersService,
        CreateUserService,
        ShowUserService,
        UpdateUserService,
        DeleteUserService,
        {
            provide: 'UsersRepository',
            useClass: FakeUsersRepository
        }
    ]
})
export class UsersModule { }
