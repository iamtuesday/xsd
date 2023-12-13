import { Module, OnModuleInit } from '@nestjs/common'
import { XsdLoaderService } from './xds-loader.service'

@Module({
	providers: [XsdLoaderService],
	exports: [XsdLoaderService]
})
export class XsdModule implements OnModuleInit {
	constructor(private readonly xsdLoaderService: XsdLoaderService) {}

	async onModuleInit() {
		console.log('inside XsdModule.onModuleInit()')
		await this.xsdLoaderService.loadXsdSchemas()
	}
}
