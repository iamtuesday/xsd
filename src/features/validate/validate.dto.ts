import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class ValidateDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	xmlKey: string

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ default: '01' })
	typeCode: string //Enum
}
