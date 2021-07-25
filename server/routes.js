const express = require("express")
const router = express.Router();

router.get("/test", (req, res, next) => {
    console.log(process.pid);
    let cnt = 0;
    for(let i = 0; i < 1e5; i++){
        cnt += i;
    }
    res.json({
        message: 'Working fine',
        id: process.pid
    })
})

module.exports = router;