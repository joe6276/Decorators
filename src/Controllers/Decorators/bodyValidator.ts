import 'reflect-metadata'
import { Metadatakeys } from './Metadatakeys'

export function bodyValidators(...keys:string[]){
    return function(target:any, key:string, props:PropertyDescriptor){
        Reflect.defineMetadata(Metadatakeys.validator,keys, target, key)
    }

}