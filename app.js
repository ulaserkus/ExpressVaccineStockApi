import express from 'express'
import doctorRoutes from './routes/doctorRoutes.js'
import patientRoutes from './routes/patientRoutes.js'
import producerRoutes from './routes/producerRoutes.js'
import ministaryRoutes from './routes/ministaryRoutes.js'
import stockRoutes from './routes/vaccineStockRoutes.js'
import unitsRoutes from './routes/healthUnitsRoutes.js'
import appointmentsRoutes from './routes/appointmentRoutes.js'
import userRoutes from './routes/userRoutes.js'
import producerMinistaryRoutes from './routes/producerMinistaryRoutes.js'

import cors from 'cors'


const app = express()
const PORT = 5000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.options('*', cors())

app.use('/api/doctor', doctorRoutes)
app.use('/api/patient', patientRoutes)
app.use('/api/producer', producerRoutes)
app.use('/api/ministary', ministaryRoutes)
app.use('/api/vaccinestock', stockRoutes)
app.use('/api/healthunits', unitsRoutes)
app.use('/api/appointments', appointmentsRoutes)
app.use('/api/producerministary', producerMinistaryRoutes)
app.use('/api/user', userRoutes)




app.use((req, res) => {
    res.status(404).send('<h1>Sayfa Bulunamadı</h1>')
})


app.listen(PORT, () => {
    console.log(`Server listening on http//:localhost:${PORT}`)
})

