const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended:true}));
const models = require('../db/models')

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.post('/submit',async (req,res,next)=>{
    console.log("=======req=====",req.body,req.query)
    let { name, password } = req.body;
    let userSubmit = await models.webview_user.create({
        name,
        password
    })
    res.json({
        userSubmit,
        msg:'success'
    })
})
app.post('/update',async (req,res,next) => {
    try {
        let {name,password} = req.body;
        let userInfo = await models.webview_user.findOne({
            where:{
                name
            }
        })
        if (userInfo) {
            userInfo = await userInfo.update({
                name,
                password
            })
        }
        res.json({
            userInfo,
            msg:'success'
        }) 
    } catch (error) {
        next(error)
    }
    
})
app.get('/list/:page',async(req,res,next) =>{
    let { page } = req.params;
    let limit = 10;
    let offset = (page -1)*limit; //开始下标
    let list = await models.webview_user.findAndCountAll({
        offset,
        limit
    })
    res.json({
        list,
        msg:'success'
    })
})

app.use((err,req,res,next)=>{
    if (err) {
        res.status(500).json({
            message:err.message
        })
    }
})

app.listen(3000,()=>{
    console.log('服务启动成功')
});