import { Injectable, Inject } from '@nestjs/common'

import { User } from '../models/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
    user_id: string
}

@Injectable()
class ShowUserService {

    @Inject('UsersRepository')
    private repository: IUsersRepository

    public async execute({ user_id }: IRequest): Promise<User> {
        const user = await this.repository.findById(user_id)

        if (!user) {
            throw Error('User does not exists!')
        }

        return user
    }

}

export default ShowUserService
