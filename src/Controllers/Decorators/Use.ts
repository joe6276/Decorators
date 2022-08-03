import { RequestHandler } from "express";
import { Metadatakeys } from "./Metadatakeys";
import 'reflect-metadata'
export function use(middleware:RequestHandler){
    return function(target:any, key:string, props:PropertyDescriptor){
        const middlewares= Reflect.getMetadata(Metadatakeys.middleware, target, key)||[]

        Reflect.defineMetadata(Metadatakeys.middleware,[...middlewares,middleware],target,key)
    }    
}