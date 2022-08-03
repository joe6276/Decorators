import express, { json, Request, Response } from 'express'
import cookie from 'cookie-session'
import bodyParser from 'body-parser'
import router from './Routes/loginRoutes'
import './Controllers/LoginController'
import { AppRouter } from './AppRouter'

const app= express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(cookie({keys:['hdvfdvfdvdfvdfv']}))
app.use(router)
app.use(AppRouter.getInstance())
app.listen(4004, ()=>{
    console.log('App Starting');
})


// class Server{
// app:express.Express = express()
//     constructor(){
//         this.app.use(bodyParser.urlencoded({extended:true}))
//         this.app.use(cookie({keys:['hdvfdvfdvdfvdfv']}))
//         this.app.use(router)
//         this.app.listen(4000, ()=>{
//             console.log('App Starting with Classes');
            
//         })
//     }

//     fun(){
//         console.log('Fun');
        
//     }
// }


// const s= new Server()