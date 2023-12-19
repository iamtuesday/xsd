import { RequestLogger } from '@arisale/infrastructure-setup'
import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import { XsdValidationResponse } from '../../core/models/xsd-validation-response.model'
import { XsdValidationService } from '../../core/services/xsd-validation.service'
import { ValidateDto } from './validate.dto'

@Injectable()
export class XsdValidatorUseCase {
	constructor(private readonly requestLogger: RequestLogger, private readonly xsdValidationService: XsdValidationService) {}

	// async execute(body: { xmlContent: string; ubl: string; invoiceTypeCode: string; inputName: string }): Promise<XsdValidationResponse> {
	async execute({ typeCode }: ValidateDto): Promise<XsdValidationResponse> {
		this.requestLogger.debug(`inside ${this.constructor.name}.execute()`)

		const startTime = Date.now()

		try {
			const pathToXsd = path.join(__dirname, `../../../xml/20123456789-01-F001-1.xml`)

			/**
			 * Leer el archivo Xml , pathToXsd
			 */

			const xmlContent = fs.readFileSync(pathToXsd, 'utf8')

			// Llama al servicio de validación XSD
			const xsdValidationResponse = this.xsdValidationService.execute(xmlContent, typeCode)

			this.requestLogger.debug(`xsdValidationResponse = ${JSON.stringify(xsdValidationResponse)}`)

			console.log(`Validación del XSD demoró '${Date.now() - startTime}' milisegundos en responder.`)

			// Si hay un error de XSD, devuelve la respuesta de error
			// if (xsdValidationResponse.hasError) {
			// 	return xsdValidationResponse
			// }

			return null
		} catch (error) {
			console.error(`Error durante la validación: ${error.message}`)
			// Manejar el error y devolver una respuesta adecuada
			// return new XsdValidationResponse(true, 'Error during validation')
		}
	}
}
