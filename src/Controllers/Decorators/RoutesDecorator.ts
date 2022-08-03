
 import 'reflect-metadata'
 import {Methods} from './Methods'
 import{ Metadatakeys} from './Metadatakeys'
function RouteBinder(method:string){
     return function(path:string){
    return function (target:any, key:string, prop:PropertyDescriptor){
     Reflect.defineMetadata(Metadatakeys.path,path ,target, key)    
     Reflect.defineMetadata(Metadatakeys.method, method,target, key)
     }
}
}


export const get = RouteBinder(Methods.get)
export const post = RouteBinder(Methods.post)
export const put = RouteBinder(Methods.put)
export const patch = RouteBinder(Methods.patch)
export const del = RouteBinder(Methods.del)