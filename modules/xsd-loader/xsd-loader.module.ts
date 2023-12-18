import { Module, OnModuleInit } from '@nestjs/common'
import { XsdLoaderService } from './xds-loader.service'
import { XsdInitializerService } from './xsd-initializer.service'

@Module({
	providers: [XsdLoaderService, XsdInitializerService],
	exports: [XsdLoaderService, XsdInitializerService]
})
export class XsdModule implements OnModuleInit {
	constructor(private readonly xsdInitializerService: XsdInitializerService) {}

	async onModuleInit() {
		this.xsdInitializerService.loadAllXsd()
	}
}
