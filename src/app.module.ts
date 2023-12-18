import { Module } from '@nestjs/common'
import { XsdModule } from '../modules/xsd-loader/xsd-loader.module'
import { CoreModule } from './core/core.module'
import { XsdValidatorModule } from './features/validate/xsd-validator.module'

@Module({
	imports: [
		CoreModule,
		/**
		 * Features
		 */
		XsdValidatorModule,
		XsdModule
	]
})
export class AppModule {}
