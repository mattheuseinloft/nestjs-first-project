import { Injectable, NestInterceptor,
    ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { OkResponse } from '@roit/roit-response-handler'

@Injectable()
export class OkResponseInterceptor<T> implements NestInterceptor<T> {

    intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(data => (OkResponse(data))))
    }

}
