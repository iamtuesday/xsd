import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as Joi from 'joi'
import * as path from 'path'
import * as xml2js from 'xml2js'
import { invoiceSchema } from '../schemas/invoice.schema'

@Injectable()
export class XsdInitializerService {
	private xsdMap: Map<string, Joi.Schema> = new Map()

	async loadAllXsd(): Promise<void> {
		const startTimeXsd = Date.now()

		this.xsdMap.set('01', await this.loadXsd('/xsd/2.1/maindoc/UBL-Invoice-2.1.xsd'))
		// this.xsdMap.set('03', await this.loadXsd('/xsd/2.1/maindoc/UBL-Invoice-2.1.xsd'))
		// this.xsdMap.set('07', await this.loadXsd('/xsd/2.1/maindoc/UBL-CreditNote-2.1.xsd'))

		const elapsedTimeXsd = Date.now() - startTimeXsd

		console.log(`XSD loading took ${elapsedTimeXsd} milliseconds`)
	}

	async getXsd(documentType: string): Promise<Joi.Schema> {
		if (!this.xsdMap.has(documentType)) {
			const schema = await this.loadXsd(this.getPath(documentType))
			this.xsdMap.set(documentType, schema)
		}

		return this.xsdMap.get(documentType)
	}

	private async loadXsd(filePath: string): Promise<Joi.Schema> {
		return new Promise<Joi.Schema>((resolve, reject) => {
			const currentPath = path.join(__dirname, '../../../', filePath)

			/**
			 * Leer el archivo XSD, currentPath
			 */
			const xsdContent = fs.readFileSync(currentPath, 'utf-8')

			/**
			 * Convertir el contenido del XSD a JSON
			 */
			xml2js.parseString(xsdContent.toString(), { explicitArray: false, mergeAttrs: true }, (err, result) => {
				if (err) {
					console.error(err)
					reject(err)
				} else {
					/**
					 * Definir el esquema de validación
					 */

					// resolve(result as Joi.Schema)

					const schema = invoiceSchema

					resolve(schema)
				}
			})
		})
	}

	async getXsdValidationSchema(documentType: string): Promise<Joi.Schema> {
		if (!this.xsdMap.has(documentType)) {
			this.xsdMap.set(documentType, await this.loadXsd(`${documentType}.xsd`))
		}
		return this.xsdMap.get(documentType)
	}

	private getPath(documentType: string): string {
		const xsdMap: Record<string, string> = {
			'01': '/xsd/2.1/maindoc/UBL-Invoice-2.1.xsd',
			'03': '/xsd/2.1/maindoc/UBL-Invoice-2.1.xsd',
			'07': '/xsd/2.1/maindoc/UBL-CreditNote-2.1.xsd'
		}

		return path.join(__dirname, '../../', xsdMap[documentType])
	}

	xmlToJson(xml: any): any {
		// Create the return object
		let obj: any = {}

		if (xml.nodeType === 1) {
			// element
			// do attributes
			if (xml.attributes.length > 0) {
				obj['@attributes'] = {}
				for (let j = 0; j < xml.attributes.length; j++) {
					const attribute = xml.attributes.item(j)
					obj['@attributes'][attribute.nodeName] = attribute.nodeValue
				}
			}
		} else if (xml.nodeType === 3) {
			// text
			obj = xml.nodeValue
		}

		// do children
		if (xml.hasChildNodes()) {
			for (let i = 0; i < xml.childNodes.length; i++) {
				const item = xml.childNodes.item(i)
				const nodeName = item.nodeName
				if (typeof obj[nodeName] === 'undefined') {
					obj[nodeName] = this.xmlToJson(item)
				} else {
					if (typeof obj[nodeName].push === 'undefined') {
						const old = obj[nodeName]
						obj[nodeName] = []
						obj[nodeName].push(old)
					}
					obj[nodeName].push(this.xmlToJson(item))
				}
			}
		}
		return obj
	}
}
