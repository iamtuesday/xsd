import { Injectable } from '@nestjs/common'
import * as Joi from 'joi'
import * as path from 'path'

@Injectable()
export class XsdInitializerService {
	private xsdMap: Map<string, Joi.Schema> = new Map()

	loadAllXsd(): void {
		const startTimeXsd = Date.now()

		this.xsdMap.set('01', this.loadXsd('UBL-Invoice-2.1.xsd'))
		this.xsdMap.set('03', this.loadXsd('UBL-Invoice-2.1.xsd'))
		this.xsdMap.set('07', this.loadXsd('UBL-CreditNote-2.1.xsd'))

		const elapsedTimeXsd = Date.now() - startTimeXsd
		console.log(`Lectura de XSD demoró '${elapsedTimeXsd}' milisegundos en responder.`)
	}

	getXsd(documentType: string): Joi.Schema {
		if (!this.xsdMap.has(documentType)) {
			const schema = this.loadXsd(this.getPath(documentType))
			this.xsdMap.set(documentType, schema)
		}

		return this.xsdMap.get(documentType)
	}

	private loadXsd(fileName: string): Joi.Schema {
		// Load XSD and create a Joi schema based on your validation needs
		// You may need to adapt this part depending on your validation requirements
		return Joi.object({})
	}

	getXsdValidationSchema(documentType: string): Joi.Schema {
		if (!this.xsdMap.has(documentType)) {
			this.xsdMap.set(documentType, this.loadXsd(`${documentType}.xsd`))
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
