import { AppOperation } from '@arisale/infrastructure-setup'
import { Body, Controller, Post, Scope } from '@nestjs/common'
import { ApiOkResponse } from '@nestjs/swagger'
import { XsdValidationResponse } from '../../core/models/xsd-validation-response.model'
import { ValidateDto } from './validate.dto'
import { XsdValidatorUseCase } from './xsd-validator.use-case'

@Controller({ scope: Scope.REQUEST, path: '/xsd-validator' })
export class XsdValidatorHttpController {
	constructor(private readonly xsdValidatorUseCase: XsdValidatorUseCase) {}

	/* @AppOperation(Post(), 'xsd-validator')
	async execute(@Body() body: { xmlContent: string; ubl: string; invoiceTypeCode: string; inputName: string }): Promise<XsdValidationResponse> {
		return await this.xsdValidatorUseCase.execute(body)
	} */

	@AppOperation(Post(), 'xsd-validator')
	@ApiOkResponse({ type: XsdValidationResponse })
	async execute(@Body() validateDto: ValidateDto): Promise<XsdValidationResponse> {
		return await this.xsdValidatorUseCase.execute(validateDto)
	}
}
