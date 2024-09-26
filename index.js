import express from 'express'


const app = express()

app.use('/', (req, res) => {
    res.send('Port in /')
})

app.listen(3001, () => {
    console.log('Server ON');
})

