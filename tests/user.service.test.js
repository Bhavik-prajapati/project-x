jest.mock('../src/config/db', () => ({
  query: jest.fn()
}))

const pool = require('../src/config/db')
const userService = require('../src/services/user.service')


describe('User Service', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should create a user successfully', async () => {
    const fakeUser = {
      id: 1,
      name: 'Rahul',
      email: 'rahul@test.com'
    }

    pool.query.mockResolvedValue({
      rows: [fakeUser]
    })

    const user = await userService.createUser('Rahul', 'rahul@test.com')

    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      ['Rahul', 'rahul@test.com']
    )

    expect(user).toEqual(fakeUser)
  })

  test('should return users list', async () => {
    pool.query.mockResolvedValue({
      rows: [
        { id: 1, name: 'Amit', email: 'amit@test.com' }
      ]
    })

    const users = await userService.getUsers()

    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM users')
    expect(users.length).toBe(1)
  })

  test('should throw error if name is missing', async () => {
    await expect(
      userService.createUser('', 'test@test.com')
    ).rejects.toThrow('Name and email are required')
  })

})