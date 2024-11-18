import User from './model.js'

class Users {
  // post a new user
  static async createUser(req, res) {
    try {
      const { name, accountNumber, uid, role, password } = req.body

      const existingUser = await User.findOne({ accountNumber })

      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' })
      }

      const newUser = await User.create({
        name,
        accountNumber,
        uid,
        role,
        password
      })

      res.status(201).json(newUser)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default Users
