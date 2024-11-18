import router from 'express'
import Attendances from './controllers.js'

const attendances = router()

// attendances routes
attendances.get('/', Attendances.getAllAttendances)
attendances.get('/:accountNumber', Attendances.getAttendanceByAccountNumber)
attendances.post('/check', Attendances.check)

export default attendances
