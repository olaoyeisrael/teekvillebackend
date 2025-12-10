const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require("cors")
const app = express()
const connectDB = require('./DB/db')



app.use(express.json()) 
app.use(cors({methods: ['GET', 'POST'], // Allow only these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],})) 
connectDB()

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/postRoutes'))
app.use('/api/comments', require('./routes/commentRoutes'))

app.use('/api', require('./routes/contactRoutes'))
app.use('/api/quiz', require('./routes/quizRoutes'));
app.get('/', (req, res) => {
    res.send('This is the TeekVille')
})



app.listen(3000, () => {
    console.log('Running on port 3000')
})