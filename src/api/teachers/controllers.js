import { User } from '../users/model.js'

class Teachers {
  // get all teacher role teachers {
  static async getAllTeachers(req, res) {
    try {
      const foundTeachers = await User.find({ role: 'teacher' })

      res.status(200).json(foundTeachers)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // get a teacher role user by accountNumber
  static async getTeacherByAccountNumber(req, res) {
    try {
      const { accountNumber } = req.params

      const foundTeacher = await User.findOne({
        accountNumber,
        role: 'teacher'
      })

      res.status(200).json(foundTeacher)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // delete a teacher
  static async deleteTeacher(req, res) {
    try {
      const { accountNumber } = req.params

      const foundTeacher = await User.findOne({
        accountNumber,
        role: 'teacher'
      })

      if (!foundTeacher) {
        return res.status(404).json({ message: 'User not found' })
      }

      await User.findOneAndDelete({ accountNumber })

      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // PUT a teacher
  static async replaceUser(req, res) {
    try {
      const { accountNumber } = req.params
      const newUserData = req.body

      const replacedUser = await User.findOneAndReplace(
        { accountNumber },
        newUserData,
        { new: false, upsert: false, runValidators: true }
      )

      if (!replacedUser || !Object.keys(newUserData).length) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(200).json({ message: 'User replaced successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // patch a teacher
  static async updateUser(req, res) {
    try {
      const { accountNumber } = req.params
      const newUserData = req.body

      if (!newUserData || !Object.keys(newUserData).length) {
        return res.status(400).json({ message: 'No updates provided' })
      }

      const updatedUser = await User.findOneAndUpdate(
        { accountNumber },
        { $set: newUserData },
        { new: false, upsert: false, runValidators: true }
      )

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(200).json({ message: 'User updated successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export { Teachers }
