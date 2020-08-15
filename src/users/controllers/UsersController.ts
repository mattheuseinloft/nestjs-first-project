import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'

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
    getById(@Param('id') id: string): User | undefined {
        const user = this.usersService.getById(id)

        return user
    }

    @Post()
    async create(@Body() userData: IUserData): Promise<User | null> {
        return this.usersService.create(userData)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() userData: IUserData): Promise<User | null> {
        return this.usersService.update(id, userData)
    }

    @Delete(':id')
    delete(@Param('id') id: string): void {
        this.usersService.delete(id)
    }

}
