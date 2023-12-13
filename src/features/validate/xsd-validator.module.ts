import { Module } from '@nestjs/common'
import { XsdValidatorHttpController } from './xsd-validator.http.controller'
import { XsdValidatorUseCase } from './xsd-validator.use-case'

@Module({
	imports: [],
	controllers: [XsdValidatorHttpController],
	providers: [XsdValidatorUseCase],
	exports: []
})
export class XsdValidatorModule {}
