import { RequestLogger } from '@arisale/infrastructure-setup'
import { Injectable } from '@nestjs/common'
import { XsdValidationService } from '../../core/services/xsd-validation.service'

@Injectable()
export class XsdValidatorUseCase {
	constructor(private readonly requestLogger: RequestLogger, private readonly xsdValidationService: XsdValidationService) {}

	/* async execute(body: { xmlContent: string; ubl: string; invoiceTypeCode: string; inputName: string }): Promise<XsdValidationResponse> {
		this.requestLogger.debug(`inside ${this.constructor.name}.execute()`)

		const startTime = Date.now()

		try {
			// Llama al servicio de validación XSD
			const xsdValidationResponse = await this.xsdValidationService.execute(body.xmlContent, body.ubl, body.invoiceTypeCode)

			console.log(`Validación del XSD demoró '${Date.now() - startTime}' milisegundos en responder.`)
			console.log('----------------------------- Fin XSD -----------------------------')

			// Si hay un error de XSD, devuelve la respuesta de error
			if (xsdValidationResponse.hasError) {
				return xsdValidationResponse
			}

			console.log('end xsl validation')
		} catch (error) {
			console.error(`Error durante la validación: ${error.message}`)
			// Manejar el error y devolver una respuesta adecuada
			return new XsdValidationResponse(true, 'Error during validation')
		}
	} */

	async execute(): Promise<any> {
		this.requestLogger.debug(`inside ${this.constructor.name}.execute()`)

		// const xmlContent = '../../xml/20123456789-01-F001-1.xml'

		/**
		 * Leer una archivo XML
		 */

		const xmlContent = fs.readFileSync(path.join(__dirname, '../../xml/20123456789-01-F001-1.xml'), 'utf8')

		const typeCode = '01'

		const result = this.xsdValidationService.execute(xmlContent, typeCode)

		console.log('result', result)
	}
}
