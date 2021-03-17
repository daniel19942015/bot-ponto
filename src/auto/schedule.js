const schedule = require("node-schedule")
const fs = require("fs")
const path = require("path")
const { sendMessage } = require("./sendMessage")

let file = {}

const main = async () => {
    console.log("========================== Start Schedule ==========================")
    filePath()
    await entrada()
    await almoco()
    await retorno()
    await saida()
}

const filePath = () => {
    let jsonPath = path.join(__dirname, '..', 'files', 'config.json');
    file = readFile(jsonPath)
}

const entrada = async () => {

    let scheduler = schedule.scheduleJob(file.entrada, async () => {
        await sendMessage("Horário Entrada")
        console.log("Send to message in Telegram -> Entrada")
    })
}

const almoco = async () => {

    let scheduler = schedule.scheduleJob(file.almoco, async () => {
        await sendMessage("Horário Almoco")
        console.log("Send to message in Telegram -> Almoco")
    })
}

const retorno = async () => {

    let scheduler = schedule.scheduleJob(file.retorno, async () => {
        await sendMessage("Horário Retorno")
        console.log("Send to message in Telegram -> Retorno")
    })
}

const saida = async () => {

    let scheduler = schedule.scheduleJob(file.saida, async () => {
        await sendMessage("Horário Saida")
        console.log("Send to message in Telegram -> Saida")
    })
}


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