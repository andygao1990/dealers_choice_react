const { syncAndSeed, models: { Member }} = require('./db')
const express = require ('express')
const path = require('path')

const app = express()

app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/api/members', async (req, res, next) => {
    try{
        res.send(await Member.findAll())
    }
    catch (err) {
        next(err)
    }
})

app.get('/api/members/:id', async (req, res, next) => {
    try{
        res.send(await Member.findByPk(req.params.id))
    }
    catch (err) {
        next(err)
    }
})

const init = async () => {
    try {
        await syncAndSeed()
        const port = process.env.PORT || 3000
        app.listen(port, () => console.log(`listening on port ${port}`))
    }
    catch (err) {
        console.log(err)
    }
}

init()