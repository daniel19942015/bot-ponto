const express = require("express")
const cors = require("cors")
const wokeDyno = require("woke-dyno")
const app = express()
const router = require("./src/routes/router.js")
const { main } = require("./src/auto/schedule")

const port = process.env.PORT || 8080

const uri = "https://bot-ponto.herokuapp.com/"

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(port, async () => {
    console.log(`Connected on port => ${port}`)
    await main()
    wokeDyno({
        url: uri,
        interval: 7200000
    }).start()
})