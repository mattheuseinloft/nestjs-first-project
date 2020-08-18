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

import { UsersService } from '../services/UsersService'
import { User } from '../models/User'

interface IRequest {
    name: string
    age: number
    github_user: string
    cep: string
}

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    index(): User[] {
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    async show(@Param('id') id: string): Promise<User> {
        try {
            const user = await this.usersService.getUserById(id)

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
            const user = await this.usersService.createUser({
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
            const user = await this.usersService.updateUser(id, {
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
            return await this.usersService.deleteUser(id)
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

}
