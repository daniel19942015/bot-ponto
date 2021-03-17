const { Router } = require("express")
const router = Router()
const {
    index
} = require("../controller/controller")

router.get("/", index)

module.exports = router
