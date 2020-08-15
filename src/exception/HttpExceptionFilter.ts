import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { ErrorResponse } from '@roit/roit-response-handler'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        const message: string = exception.message
        // eslint-disable-next-line no-console
        console.error(exception)
        response
            .status(status)
            .send(ErrorResponse(message))
    }

}
