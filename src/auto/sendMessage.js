const { Telegraf } = require("telegraf")

const app = new Telegraf("933198108:AAFChuapeL6Ypig4ZoNWczKlliKROdzqwuo")

const sendMessage = (msg) =>{
    try {
        return new Promise((resolve, reject) => {
            app.telegram.sendMessage("954700360", msg)
            return resolve(true)
        })
    } catch (error) {
        console.log("error", error.message)
        return false
    }
}

module.exports = {
    sendMessage
}