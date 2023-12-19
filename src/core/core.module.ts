import { Global, Module, OnModuleInit } from '@nestjs/common'
import { XsdInitializerService } from './services/xsd-initializer.service'
import { XsdValidationService } from './services/xsd-validation.service'

@Global()
@Module({
	imports: [],
	providers: [XsdValidationService, XsdInitializerService],
	exports: [XsdValidationService, XsdInitializerService]
})
export class CoreModule implements OnModuleInit {
	constructor(private readonly xsdInitializerService: XsdInitializerService) {}

	async onModuleInit(): Promise<void> {
		await this.xsdInitializerService.loadAllXsd()
	}
}
