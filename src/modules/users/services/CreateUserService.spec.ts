import CreateUserService from '../services/CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

describe('CreateUser', () => {
    let fakeUsersRepository: FakeUsersRepository
    let createUser: CreateUserService

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()

        createUser = new CreateUserService(
            fakeUsersRepository
        )
    })

    it('should be able to create a user', async () => {
        expect(await createUser.execute({
            name: 'John Doe',
            age: 32,
            github_user: 'johndoe',
            cep: '01001000'
        })).toHaveProperty('id')
    })

    // eslint-disable-next-line max-len
    it('should not be able to create a user with a github username that does not exists', async () => {
        await expect(createUser.execute({
            name: 'John Doe',
            age: 32,
            cep: '12345678',
            github_user: 'non-existing-github-username'
        })).rejects.toBeInstanceOf(Error)
    })

    // eslint-disable-next-line max-len
    it('should not be able to create a user with a cep with more or less than 8 digits', async () => {
        await expect(createUser.execute({
            name: 'John Doe',
            age: 32,
            cep: '123456789',
            github_user: 'johndoe'
        })).rejects.toBeInstanceOf(Error)
    })

    // eslint-disable-next-line max-len
    it('should not be able to create a user with a cep with a non-numeric character', async () => {
        await expect(createUser.execute({
            name: 'John Doe',
            age: 32,
            cep: '123456a',
            github_user: 'johndoe'
        })).rejects.toBeInstanceOf(Error)
    })

    it('should not be able to create a user with a cep that does not exists', async () => {
        await expect(createUser.execute({
            name: 'John Doe',
            age: 32,
            cep: '00000000',
            github_user: 'johndoe'
        })).rejects.toBeInstanceOf(Error)
    })
})
