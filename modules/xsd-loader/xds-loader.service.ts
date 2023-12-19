import { RequestLogger } from '@arisale/infrastructure-setup'
import { Injectable, NotFoundException } from '@nestjs/common'
import * as fs from 'fs'
import Joi from 'joi'
import * as path from 'path'

@Injectable()
export class XsdLoaderService {
	private xsdSchemas: Record<string, Joi.ObjectSchema> = {}
	constructor(private readonly requestLogger: RequestLogger) {}

	async loadXsdSchemas(): Promise<void> {
		this.requestLogger.debug(`inside ${this.constructor.name}.loadXsdSchemas()`)

		const documentTypes = ['01', '03', '07']

		documentTypes.forEach(documentType => {
			const xsdPath = this.getPath(documentType)

			try {
				const xsdContent = fs.readFileSync(xsdPath, 'utf-8')
				const schema = this.buildJoiSchemaFromXml(xsdContent)
				this.xsdSchemas[documentType] = schema
				this.requestLogger.debug(`Successfully loaded XSD for ${documentType}`)
			} catch (error) {
				console.error(`Error loading XSD for ${documentType}: ${error.message}`)
			}
		})
	}

	getXsdSchema(documentType: string): Joi.ObjectSchema {
		this.requestLogger.debug(`inside ${this.constructor.name}.getXsdSchema()`)

		console.log('this.xsdSchemas', this.xsdSchemas)
		const path = this.getPath(documentType)
		console.log('path', path)

		const schema = this.xsdSchemas[documentType]

		if (!schema) {
			throw new NotFoundException(`XSD schema not found for document type: ${documentType}`)
		}
		return schema
	}

	xmlToJson(xml: any): any {
		let obj: any = {}

		if (xml.type() === 'element') {
			// Element node
			const attributes = xml.attrs()
			if (attributes.length > 0) {
				obj['@attributes'] = {}
				for (const attribute of attributes) {
					obj['@attributes'][attribute.name()] = attribute.value()
				}
			}

			// Process child nodes
			const childNodes = xml.childNodes()
			if (childNodes.length > 0) {
				for (const childNode of childNodes) {
					const nodeName = childNode.name()
					if (!obj[nodeName]) {
						obj[nodeName] = this.xmlToJson(childNode)
					} else {
						if (!Array.isArray(obj[nodeName])) {
							const old = obj[nodeName]
							obj[nodeName] = []
							obj[nodeName].push(old)
						}
						obj[nodeName].push(this.xmlToJson(childNode))
					}
				}
			}
		} else if (xml.type() === 'text') {
			// Text node
			obj = xml.text()
		}

		return obj
	}

	private buildJoiSchemaFromXml(xmlContent: string): Joi.ObjectSchema {
		// Define aquí la lógica para construir el esquema Joi a partir del contenido XML.
		// Utiliza Joi.object(), Joi.string(), etc., según la estructura del XML.
		// Ten en cuenta que no será tan específico como xmlschema en términos de validación XML.

		// Ejemplo simple: Un esquema que espera una cadena en la propiedad 'rootElement'.
		return Joi.object({
			rootElement: Joi.string().required()
		})
	}

	private getPath(documentType: string): string {
		this.requestLogger.debug(`inside ${this.constructor.name}.getPath()`)

		const xsdMap: Record<string, string> = {
			'01': '/xsd/2.1/maindoc/UBL-Invoice-2.1.xsd',
			'03': '/xsd/2.1/maindoc/UBL-Invoice-2.1.xsd',
			'07': '/xsd/2.1/maindoc/UBL-CreditNote-2.1.xsd'
		}

		const filePath = path.join(__dirname, '../../../', xsdMap[documentType])

		console.log(`File path for ${documentType}: ${filePath}`)

		return filePath
	}
}
