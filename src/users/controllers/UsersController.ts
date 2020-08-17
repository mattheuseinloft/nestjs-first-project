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
import IUserData from '../dtos/IUserData'

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    getAll(): User[] {
        return this.usersService.getAll()
    }

    @Get(':id')
    getById(@Param('id') id: string): User | HttpException {
        try {
            const user = this.usersService.getById(id)

            return user
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    @Post()
    async create(@Body() userData: IUserData): Promise<User | HttpException> {
        if (!userData.name || !userData.age || !userData.github_user || !userData.github_user) {
            throw new HttpException(
                'Input validation error!',
                HttpStatus.BAD_REQUEST
            )
        }

        try {
            const user = await this.usersService.create(userData)

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
        @Body() userData: IUserData
    ): Promise<User | HttpException> {
        if (!userData.name || !userData.age || !userData.github_user || !userData.github_user) {
            throw new HttpException(
                'Input validation error!',
                HttpStatus.BAD_REQUEST
            )
        }

        try {
            const user = await this.usersService.update(id, userData)

            return user
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    @Delete(':id')
    delete(@Param('id') id: string): null | HttpException {
        try {
            return this.usersService.delete(id)
        } catch (error) {
            throw new HttpException(
                error,
                HttpStatus.BAD_REQUEST
            )
        }
    }

}
