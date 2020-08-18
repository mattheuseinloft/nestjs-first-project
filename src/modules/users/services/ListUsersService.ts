import { Injectable, Inject } from '@nestjs/common'

import { User } from '../models/User'
import IUsersRepository from '../repositories/IUsersRepository'

@Injectable()
class ListUsersService {

    constructor(
        @Inject('UsersRepository')
        private repository: IUsersRepository
    ) { }

    public async execute(): Promise<User[]> {
        return this.repository.findAll()
    }

}

export default ListUsersService
