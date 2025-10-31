const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require("cors")
const app = express()
const connectDB = require('./DB/db')



app.use(express.json()) 
app.use(cors()) 
connectDB()

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/postRoutes'))
app.use('/api', require('./routes/commentRoutes'))

app.use('/api', require('./routes/contactRoutes'))
app.get('/', (req, res) => {
    res.send('This is the TeekVille')
})



app.listen(3000, () => {
    console.log('Running on port 3000')
})