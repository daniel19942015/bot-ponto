const { Telegraf } = require("telegraf")

const app = new Telegraf("933198108:AAFChuapeL6Ypig4ZoNWczKlliKROdzqwuo")

const group = "954700360"

const sendMessage = (msg) => {
    try {
        return new Promise((resolve, reject) => {
            app.telegram.sendMessage(group, msg)
            return resolve(true)
        })
    } catch (error) {
        console.log("error", error.message)
        return false
    }
}

const sendPhoto = () => {
    try {
        return new Promise((resolve, reject) => {
            app.telegram.sendPhoto(group, { source: "./image.png" })
            return resolve(true)
        })
    } catch (error) {
        console.log("error", error.message)
        return false
    }
}

module.exports = {
    sendMessage,
    sendPhoto
}