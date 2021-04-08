const schedule = require("node-schedule")
const fs = require("fs")
const path = require("path")

const {
    sendMessage,
    sendPhoto
} = require("./sendMessage")
const {
    DataHora,
    weekday,
    Hora,
    readFile
} = require("../functions/functions")
const {
    init
} = require("./screenshot")

let file = {}

const week = ["Domingo", "Sábado"]
const day = weekday()

let retry = 0

const main = async () => {
    console.log(`[${DataHora()}] ====== Start Schedule ======`)
    console.log(`[${DataHora()}] [BOT] Montando PATH`)
    filePath()

    console.log(`[${DataHora()}] [BOT] Acessando Ponto`)
    await entrada()
    await almoco()
    await retorno()
    await saida()
}

const filePath = () => {
    let jsonPath = path.join(__dirname, '..', 'files', 'config.json');
    file = readFile(jsonPath)
}

const message = (msg) => {
    return `**Horário de ${msg}** 
            \nBoa tarde, Daniel!😁 
            \nPonto batido com sucesso! ✅ 
            \nPonto registrado às ${Hora()}`
}

const analise = async (msg) => {
    if (day !== week[0] && day !== week[1]) {
        const result = await init()
        if(!result){
            await retryFlow(result, msg)
        }else{
            if (result) {
                await sendMessage(msg)
                console.log(`[${DataHora()}][MESSAGE] Send photo to Telegram -> Entrada`)
                await sendPhoto()
                console.log(`[${DataHora()}][MESSAGE] Send Success!`)
                return true;
    
            } else {
                console.log(`[${DataHora()}][MESSAGE][ERROR] Send Message error`)
                await sendMessage(`[${DataHora()}][ERROR] Send message error`)
                return false;
            }
        }
    } else {
        console.log(`[${DataHora()}][MESSAGE] Hoje é ${day}! Nao bato o ponto`)
        await sendMessage(`[${DataHora()}][MESSAGE] Hoje é ${day}! Nao bato o ponto`)
        return true;
    }
}

async function retryFlow(erro, message) {

    if (!erro) {
        if (retry < 3) {
            retry++;
            console.info(`\n[${DataHora()}] - Fluxo de retry - ${retry}º tentativa.`);
            await analise(message);
        } else {
            retry = 0;
            console.info(`\n[${DataHora()}] - Número de tentivas excedida.`);
            return false;
        }
    }

    return true;
}

const entrada = async () => {

    let scheduler = schedule.scheduleJob(file.entrada, async () => {
        await analise(message("entrada"))
    })
}

const almoco = async () => {

    let scheduler = schedule.scheduleJob(file.almoco, async () => {
        await analise(message("almoço"))
    })
}

const retorno = async () => {

    let scheduler = schedule.scheduleJob(file.retorno, async () => {
        await analise(message("retorno"))
    })
}

const saida = async () => {

    let scheduler = schedule.scheduleJob(file.saida, async () => {
        await analise(message("saída"))
    })
}

module.exports = {
    main
}