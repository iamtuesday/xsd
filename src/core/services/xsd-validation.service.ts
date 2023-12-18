import { RequestLogger } from '@arisale/infrastructure-setup'
import { Injectable } from '@nestjs/common'
import Joi from 'joi'
import * as libxmljs from 'libxmljs'
import { XsdInitializerService } from './xsd-initializer.service'

@Injectable()
export class XsdValidationService {
	constructor(private readonly requestLogger: RequestLogger, private readonly xsdInitializerService: XsdInitializerService) {}

	execute(xmlContent: string, typeCode: string, ubl?: string): boolean {
		this.requestLogger.debug(`inside ${this.constructor.name}.execute()`)

		const schema = this.xsdInitializerService.getXsd(typeCode)

		try {
			// Parse the XML document
			const xmlDoc = libxmljs.parseXml(xmlContent)

			// Convert the parsed XML document to a JavaScript object
			const xmlObject = this.xsdInitializerService.xmlToJson(xmlDoc)

			// Validate the JavaScript object against the Joi schema
			Joi.assert(xmlObject, schema)

			return true
		} catch (err) {
			console.log(err)
			return false
		}
	}
}
