import { Module } from '@nestjs/common'
import { CoreModule } from './core/core.module'
import { XsdValidatorModule } from './features/validate/xsd-validator.module'

@Module({
	imports: [
		CoreModule,
		/**
		 * Features
		 */
		XsdValidatorModule
	]
})
export class AppModule {}
