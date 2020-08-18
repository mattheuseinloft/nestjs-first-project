import CreateUserService from '../services/CreateUserService'
import DeleteUserService from '../services/DeleteUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

describe('DeleteUser', () => {
    let fakeUsersRepository: FakeUsersRepository
    let deleteUser: DeleteUserService
    let createUser: CreateUserService

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()

        deleteUser = new DeleteUserService(
            fakeUsersRepository
        )

        createUser = new CreateUserService(
            fakeUsersRepository
        )
    })

    it('should be able to delete a user', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            age: 32,
            github_user: 'johndoe',
            cep: '01001000'
        })

        expect(await deleteUser.execute({ user_id: user.id })).toBe(null)
    })

    it('should not be able to delete a user that does not exists', async () => {
        // eslint-disable-next-line max-len
        await expect(deleteUser.execute({ user_id: 'non-existing-user-id' })).rejects.toBeInstanceOf(Error)
    })
})
