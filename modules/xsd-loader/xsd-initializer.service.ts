import { Injectable } from '@nestjs/common'
import * as Joi from 'joi'
import * as path from 'path'

@Injectable()
export class XsdInitializerService {
	private xsdMap: Map<string, Joi.Schema> = new Map()

	loadAllXsd(): void {
		const startTimeXsd = Date.now()

		this.xsdMap.set('01', this.loadXsd('UBL-Invoice-2.1.xsd'))

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
}
