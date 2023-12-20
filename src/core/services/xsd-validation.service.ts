import { RequestLogger } from '@arisale/infrastructure-setup'
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import * as xml2js from 'xml2js'

import { XsdInitializerService } from './xsd-initializer.service'

@Injectable()
export class XsdValidationService {
	constructor(private readonly requestLogger: RequestLogger, private readonly xsdInitializerService: XsdInitializerService) {}

	async execute(xmlContent: string, typeCode: string): Promise<void> {
		this.requestLogger.debug(`inside ${this.constructor.name}.execute()`)

		/**
		 * Obtener el esquema XSD (JOI Schema)
		 */
		const schema = await this.xsdInitializerService.getXsd(typeCode)

		try {
			/**
			 * Parsear el contenido XML
			 */
			// const xmlDoc = libxmljs.parseXml(xmlContent)

			/**
			 * Convertir el XML a objeto
			 */
			const xmlObject = await new Promise<any>((resolve, reject) => {
				xml2js.parseString(xmlContent.toString(), { explicitArray: false, mergeAttrs: true }, (err, result) => {
					if (err) {
						reject(err)
					} else {
						resolve(result)
					}
				})
			})

			/**
			 * Validar el objeto XML
			 */
			const validationResult = schema.validate(xmlObject)

			if (validationResult.error) {
				this.requestLogger.verbose(`validationResult.error = ${JSON.stringify(validationResult.error.message)}`)

				/**
				 * Mapear details
				 */

				const details = validationResult.error.details.map(detail => {
					return {
						type: detail.type,
						path: detail.path,
						message: detail.message
					}
				})

				throw new ConflictException({
					message: 'Error de validación',
					details
				})
			} else {
				/**
				 * No hay errores
				 */

				this.requestLogger.log(`No hay errores de validación`)
			}
		} catch (err) {
			throw new BadRequestException(`Error durante la validación: ${err.message}`)
		}
	}
}
