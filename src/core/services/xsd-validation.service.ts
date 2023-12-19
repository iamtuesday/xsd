import { RequestLogger } from '@arisale/infrastructure-setup'
import { Injectable } from '@nestjs/common'
import * as libxmljs from 'libxmljs'
import * as xml2js from 'xml2js'

import { XsdInitializerService } from './xsd-initializer.service'

@Injectable()
export class XsdValidationService {
	constructor(private readonly requestLogger: RequestLogger, private readonly xsdInitializerService: XsdInitializerService) {}

	async execute(xmlContent: string, typeCode: string, ubl?: string): Promise<boolean> {
		this.requestLogger.debug(`inside ${this.constructor.name}.execute()`)

		const schema = await this.xsdInitializerService.getXsd(typeCode)

		try {
			// Parse the XML document
			const xmlDoc = libxmljs.parseXml(xmlContent)

			//Convert the parsed XML document to a JavaScript object
			const xmlObject = await new Promise<any>((resolve, reject) => {
				xml2js.parseString(xmlDoc.toString(), { explicitArray: false, mergeAttrs: true }, (err, result) => {
					if (err) {
						reject(err)
					} else {
						// console.log(JSON.stringify(result, null, 2))

						resolve(result)
					}
				})
			})

			console.log('xmlObject', JSON.stringify(xmlObject, null, 2))

			const validationResult = schema.validate(xmlObject)

			if (validationResult.error) {
				// this.requestLogger.verbose(`validationResult.error = ${JSON.stringify(validationResult.error)}`)

				console.log('error', validationResult.error)
			} else {
				console.log('Los datos son válidos.')
			}

			return true
		} catch (err) {
			console.error(err)
			return false
		}
	}
}
