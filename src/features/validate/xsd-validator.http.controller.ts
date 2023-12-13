import { AppOperation } from '@arisale/infrastructure-setup'
import { Controller, Post, Scope } from '@nestjs/common'
import { XsdValidationResponse } from '../../core/models/xsd-validation-response.model'
import { XsdValidatorUseCase } from './xsd-validator.use-case'

@Controller({ scope: Scope.REQUEST, path: '/xsd-validator' })
export class XsdValidatorHttpController {
	constructor(private readonly xsdValidatorUseCase: XsdValidatorUseCase) {}

	/* @AppOperation(Post(), 'xsd-validator')
	async execute(@Body() body: { xmlContent: string; ubl: string; invoiceTypeCode: string; inputName: string }): Promise<XsdValidationResponse> {
		return await this.xsdValidatorUseCase.execute(body)
	} */

	@AppOperation(Post(), 'xsd-validator')
	async execute(): Promise<XsdValidationResponse> {
		return await this.xsdValidatorUseCase.execute()
	}
}
