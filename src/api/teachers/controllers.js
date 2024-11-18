import User from '../users/user.js'

class Teachers {
  // get all teacher role teachers {
  static async getAllTeachers(req, res) {
    try {
      const teachers = await User.find({ role: 'teacher' })
      res.status(200).json(teachers)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // get a teacher role user by accountNumber
  static async getTeacherByAccountNumber(req, res) {
    try {
      const teacher = await User.findOne({
        accountNumber: req.params.accountNumber,
        role: 'teacher'
      })
      res.status(200).json(teacher)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // delete a teacher
  static async deleteUser(req, res) {
    try {
      await User.findOneAndDelete({ accountNumber: req.params.accountNumber })
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // put a teacher
  static async replaceUser(req, res) {
    try {
      await User.findOneAndReplace(
        { accountNumber: req.params.accountNumber },
        req
      )
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // patch a teacher
  static async updateUser(req, res) {
    try {
      await User.findOneAndUpdate(
        { accountNumber: req.params.accountNumber },
        req.body,
        { new: true }
      )
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default Teachers
