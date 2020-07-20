import { NestFactory } from '@nestjs/core'
import { Environment } from 'roit-environment'
import { Logger } from '@nestjs/common'
import * as bodyParser from 'body-parser'

import { AppModule } from './AppModule'
import { OkResponseInterceptor } from './interceptors/ok-response.interceptor'
import { HttpExceptionFilter } from './exception/HttpExceptionFilter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api/v1')
    app.use(bodyParser.json({ limit: '10mb' }))
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
    app.enableCors()
    app.useGlobalFilters(new HttpExceptionFilter)
    app.useGlobalInterceptors(new OkResponseInterceptor())
    await app.listen(Environment.getProperty('port'))
    Logger.debug(`Listening on http://localhost:${Environment.getProperty('port')}/`)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
