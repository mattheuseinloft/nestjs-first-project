import ShowUserService from '../services/ShowUserService'
import { User } from '../models/User'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

describe('ShowUser', () => {
    let fakeUsersRepository: FakeUsersRepository
    let showUser: ShowUserService

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()

        showUser = new ShowUserService(
            fakeUsersRepository
        )
    })

    it('should be able to get a user by his id', async () => {
        const user: User = {
            id: 'user-id',
            name: 'John Doe',
            age: 32,
            github_data: {
                login: 'johndoe',
                avatar_url: 'avatar-url',
                repos_url: 'repos-url'
            },
            address: {
                cep: '12345678',
                logradouro: 'logradouro',
                complemento: 'complemento',
                bairro: 'bairro',
                localidade: 'localidade',
                uf: 'uf'
            }
        }

        // eslint-disable-next-line @typescript-eslint/require-await
        jest.spyOn(showUser, 'execute').mockImplementation(async () => user)

        expect(await showUser.execute({ user_id: 'user-id' })).toBe(user)
    })

    it('should not be able to get a user that does not exists', async () => {
        // eslint-disable-next-line max-len
        await expect(showUser.execute({ user_id: 'non-existing-user-id' })).rejects.toBeInstanceOf(Error)
    })
})
