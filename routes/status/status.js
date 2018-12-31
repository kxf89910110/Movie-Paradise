var express = require('express');
var router = express.Router();

router.get('/status',(req,res)=>{
    var code = parseInt(req.query.code);
    var tips = req.query.tips;
    var return_url = req.query.return_url;
    res.render("status",{
        title:"Friendly Reminder",
        tips:tips,
        code:code,
        href:return_url
    })
})

module.exports = router;