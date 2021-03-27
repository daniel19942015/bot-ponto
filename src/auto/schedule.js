const schedule = require("node-schedule")
const fs = require("fs")
const path = require("path")

const {
    sendMessage,
    sendPhoto
} = require("./sendMessage")
const {
    DataHora
} = require("../functions/functions")
const {
    screenshot
} = require("./screenshot")

let file = {}

const main = async () => {
    console.log(`[${DataHora()}]====== Start Schedule ======`)
    console.log(`[${DataHora()}] [BOT] Montando PATH`)
    filePath()

    console.log(`[${DataHora()}] [BOT] Acessando Ponto`)
    await entrada()
    // await almoco()
    // await retorno()
    // await saida()
    // await vida()
}

const filePath = () => {
    let jsonPath = path.join(__dirname, '..', 'files', 'config.json');
    file = readFile(jsonPath)
}

const entrada = async () => {

    let scheduler = schedule.scheduleJob(file.entrada, async () => {
        const result = await screenshot()
        if (result) {
            await sendMessage(`[${DataHora()}][MESSAGE] Horário Entrada`)
            console.log(`[${DataHora()}][MESSAGE] Send photo to Telegram -> Entrada`)
            await sendPhoto()
            console.log(`[${DataHora()}][MESSAGE] Send Success!`)
        }else{
            console.log(`[${DataHora()}][MESSAGE][ERROR] Send Message error`)
            await sendMessage(`[${DataHora()}][ERROR] Send message error`)
            return false;
        }
    })
}

// const almoco = async () => {

//     let scheduler = schedule.scheduleJob(file.almoco, async () => {
//         await sendMessage("Horário Almoco")
//         console.log("Send to message in Telegram -> Almoco")
//     })
// }

// const retorno = async () => {

//     let scheduler = schedule.scheduleJob(file.retorno, async () => {
//         await sendMessage("Horário Retorno")
//         console.log("Send to message in Telegram -> Retorno")
//     })
// }

// const saida = async () => {

//     let scheduler = schedule.scheduleJob(file.saida, async () => {
//         await sendMessage("Horário Saida")
//         console.log("Send to message in Telegram -> Saida")
//     })
// }

// const vida = async () => {

//     let vida = schedule.scheduleJob(file.vida, async () => {
//         await sendMessage("Teste vida")
//         console.log("Send to message in Telegram -> Teste")
//         vida.cancel()
//     })
// }

const readFile = (path) => {
    try {

        file = JSON.parse(fs.readFileSync(path))
        return file;

    } catch (error) {
        console.log("Error", error.message)
        return false;
    }
}

module.exports = {
    main
}