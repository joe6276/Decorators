import {NextFunction, Request,Response} from "express"
import { get,controller, post, bodyValidators } from "./Decorators"


  @controller('/auth') 
  class LoginController{
  @get('/login')
   getLogin (req:Request ,res:Response):void{
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
  }

@post('/login')
@bodyValidators('email', 'password')
  loginUser(req:Request, res:Response){
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

}

}


