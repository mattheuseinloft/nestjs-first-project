import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpException,
    HttpStatus
} from '@nestjs/common'

import { User } from '../models/User'
import ListUsersService from '../services/ListUsersService'
import CreateUserService from '../services/CreateUserService'
import ShowUserService from '../services/ShowUserService'
import UpdateUserService from '../services/UpdateUserService'
import DeleteUserService from '../services/DeleteUserService'

interface IRequest {
    name: string
    age: number
    github_user: string
    cep: string
}

@Controller('users')
export class UsersController {

    constructor(
        private readonly listUsersService: ListUsersService,
        private readonly createUserService: CreateUserService,
        private readonly showUserService: ShowUserService,
        private readonly updateUserService: UpdateUserService,
        private readonly deleteUserService: DeleteUserService
    ) { }

    @Get()
    async index(): Promise<User[]> {
        return this.listUsersService.execute()
    }

    @Get(':id')
    async show(@Param('id') id: string): Promise<User> {
        try {
            const user = await this.showUserService.execute({ user_id: id })

            return user
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post()
    async create(@Body() { name, age, github_user, cep }: IRequest): Promise<User> {
        if (!name || !age || !github_user || !cep) {
            throw new HttpException(
                'Input validation error!',
                HttpStatus.BAD_REQUEST
            )
        }

        try {
            const user = await this.createUserService.execute({
                name,
                age,
                github_user,
                cep
            })

            return user
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() { name, age, github_user, cep }: IRequest
    ): Promise<User> {
        if (!name || !age || !github_user || !cep) {
            throw new HttpException(
                'Input validation error!',
                HttpStatus.BAD_REQUEST
            )
        }

        try {
            const user = await this.updateUserService.execute({
                user_id: id,
                name,
                age,
                github_user,
                cep
            })

            return user
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<null> {
        try {
            return await this.deleteUserService.execute({ user_id: id })
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

}
