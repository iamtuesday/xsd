import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class ValidateDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ default: 'https://ari-dev-s3bucket.s3.us-east-1.amazonaws.com/20325288991/ebilling/ticket/20325288991-03-B002-00000015.xml' })
	xmlKey: string

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ default: '01' })
	invoiceTypeCode: string //Enum
}
