import { RequestLogger } from '@arisale/infrastructure-setup'
import { BadRequestException, Injectable } from '@nestjs/common'
import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'
import { XsdValidationService } from '../../core/services/xsd-validation.service'
import { ValidateDto } from './validate.dto'

@Injectable()
export class XsdValidatorUseCase {
	constructor(private readonly requestLogger: RequestLogger, private readonly xsdValidationService: XsdValidationService) {}

	async execute({ invoiceTypeCode, xmlKey }: ValidateDto): Promise<void> {
		this.requestLogger.debug(`inside ${this.constructor.name}.execute()`)

		/**
		 * XmlKey -> Obtener el contenido del XML
		 */

		const xmlPath = path.join(__dirname, `../../../xml/20123456789-01-F001-1.xml`)

		// const xmlContent = fs.readFileSync(pathToXsd, 'utf8')

		// console.log('xmlContent', xmlContent)

		const xsdPath = path.join(__dirname, `../../../xsd/2.1/maindoc/UBL-Invoice-2.1.xsd`)

		// const xsdContent = fs.readFileSync(xsdPath, 'utf8')

		const [myXMLFile, mySchemaFile] = await Promise.all([
			fs.promises.readFile(xmlPath, 'utf8'),
			fs.promises.readFile(xsdPath, 'utf8')
			// fs.promises.readFile('./xml.xsd', 'utf8'),
		])

		// const validationResult = await validateXML({
		// 	xml: [{
		// 	  fileName: 'my-xml-file.xml',
		// 	  contents: myXMLFile,
		// 	}],
		// 	// All the schema files that are required to validate the documents.
		// 	// The main XSD should be first in the array, followed by its possible dependencies.
		// 	schema: [mySchemaFile],
		// 	// Optional: Files that the schema file depends on (xsd:import, xsd:include).
		// 	// xmllint-wasm won't make any network requests or other IO to retrieve depdencicy files,
		// 	// so these they must be loaded beforehand and passed in here.
		// 	preload: [{
		// 	  fileName: 'xml.xsd',
		// 	  contents: generalXmlXsdFile,
		// 	}],
		// 	// Optional: Initial memory capacity in Web Assembly memory pages (1 = 6.4KiB) - 256
		// 	// is minimum and default here (16MiB).
		// 	initialMemoryPages: 256,
		// 	// Optional: Maximum memory capacity, in Web Assembly memory pages. If not
		// 	// set, this will also default to 256 pages. Max is 65536 (4GiB).
		// 	// Use this to raise the memory limit if your XML to validate are large enough to
		// 	// cause out of memory errors.
		// 	// The following example would set the max memory to 2GiB.
		// 	maxMemoryPages: 2 * memoryPages.GiB,
		//   });

		//   if (validationResult.valid) {
		// 	console.log('There were no errors!')
		//   } else {
		// 	console.warn(validationResult.errors);
		//   }

		// const xsdValidationResponse = this.xsdValidationService.execute(xmlContent, invoiceTypeCode)
	}

	private async downloadXml(xmlKey: string): Promise<string> {
		this.requestLogger.debug(`inside ${this.constructor.name}.downloadXml()`)

		/**
		 * Validar la extensión de la URL
		 */

		if (!/\.xml$/.test(xmlKey)) {
			throw new BadRequestException(`No es un archivo XML.`)
		}

		try {
			const response = await axios.get(xmlKey)

			const xmlData = response.data

			const currentPath = xmlKey.split('/').pop()

			const tempPath = path.join(__dirname, `../../../xml/${xmlKey.replace('https://ari-dev-s3bucket.s3.us-east-1.amazonaws.com/', '')}`)

			/**
			 * Solo debo guardar desde el / del final de la URL
			 */

			fs.writeFileSync(tempPath, xmlData, 'utf-8')

			return xmlData
		} catch (error) {
			throw new BadRequestException(`No se pudo descargar el archivo.`)
		}
	}
}
