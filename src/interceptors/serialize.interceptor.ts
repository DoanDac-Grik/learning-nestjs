import {
    CallHandler, ExecutionContext, NestInterceptor, UseInterceptors
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from 'src/users/dtos/user.dto';

interface ClassConstructor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data:any)=> {
               return plainToClass(UserDto, data, {
                excludeExtraneousValues: true,
               });
            })
        )
    }
}