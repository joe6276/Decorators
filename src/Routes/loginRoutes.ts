import express, { Router, Request, Response, NextFunction } from "express";

// const router = express.Router()
const router = Router()

interface RequestWithBody extends Request{
    body:{[key:string]:string |undefined}
}

router.get('/login',(req:Request ,res:Response)=>{
   res.send(
    ` <form method="POST">
    <div>
    <label> Email</label>
    <input type="text" name="email"/>
    </div>

    <div>
    <label> Password</label>
    <input type="password" name="password"/>
    </div>

    <button type="submit"> Submit </button>
    </form>
    
    `
   )
})
router.post('/login', (req:RequestWithBody, res:Response)=>{
const {email,password}= req.body

// email? res.send(email.toLocaleUpperCase()):res.send('You must Provide a valid Email')

if(email && password && email==='joe@gmail.com' && password==='12345678'){
    // Logged In
    req.session={loggedin:true}
    res.redirect('/')
}else{
 res.send('Invalid Data')
}
console.log(`${email}, ${password}`);

})


function RequireAuth (req:Request,  res:Response , next:NextFunction):void{

    if(req.session && req.session.loggedin){
        next()
        return
    }

    res.status(403)
    res.send('Forbidden , You Not Permitted dto Acess this Route')

}

router.get('',(req:Request, res:Response)=>{
    if(req.session && req.session.loggedin){

        res.send(
            `
            <div>
            <h1> Hello Joe</div>
            <p> You are logged In to The Jitu Site</p>
            <a href='/logout' > Logout</a>
            </div>
            `
        )

    }else{

    }
})


router.get('/logout', (req:Request, res:Response)=>{
    req.session=undefined
    res.send(
        `
        <div> 
            <p> Sad to se You Go</p>
            <a href='/login'> Login Again</a>
        </div>
        `
    )
})

router.get('/protected',RequireAuth,(req:Request, res:Response)=>{
        res.send('Welcome to Protected Route')
})
export default router
