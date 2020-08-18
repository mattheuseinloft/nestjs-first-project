import { Injectable, Inject } from '@nestjs/common'

import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
    user_id: string
}

@Injectable()
class DeleteUserService {

    constructor(
        @Inject('UsersRepository')
        private repository: IUsersRepository
    ) { }

    public async execute({ user_id }: IRequest): Promise<null> {
        const userExists = await this.repository.findById(user_id)

        if (!userExists) {
            throw Error('User does not exists!')
        }

        return this.repository.remove(user_id)
    }

}

export default DeleteUserService
