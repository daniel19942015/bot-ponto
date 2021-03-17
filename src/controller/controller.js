const index = async (req, res) => {
    res.set('Content-Type', 'application/json')
    res.status(200).json(JSON.stringify({
        resultado: "ok",
        response: true 
    }))
}

module.exports = {
    index
}