
import {NextFunction, Request,Response, Router} from 'express'
import 'reflect-metadata'
import { Methods } from './Methods'
import{AppRouter} from '../../AppRouter'
import { Metadatakeys } from './Metadatakeys'
function bodyValidators(keys:string[]){
    return function (req:Request , res:Response, next:NextFunction ){
        if(!req.body){
            res.status(400).send('Invalid Request')
            return
        }

        for(let key of keys){
            if(!req.body[key]){
               res.status(400).send(`Invalid request ${key} is missing`)  
               return           
            }
        }

        next()
    }

}

 export function controller(prefix:string){
    return function(target:Function){
        const parent=Object.getOwnPropertyNames(target.prototype)
        for(let key of parent){
            const router=AppRouter.getInstance()
            const routeHandler=target.prototype[key]
            const path = Reflect.getMetadata(Metadatakeys.path,target.prototype,key)
            const method:Methods = Reflect.getMetadata(Metadatakeys.method,target.prototype,key) 
            const middlewares = Reflect.getMetadata(Metadatakeys.middleware,target.prototype,key)||[]

            const validators= Reflect.getMetadata(Metadatakeys.validator, target.prototype,key)||[]

            const validator=bodyValidators(validators)

            path?router[method](`${prefix}${path}`,...middlewares,validator, routeHandler):'';
        }
        }
    }
 