export class XsdValidationResponse {
	constructor(public readonly hasError: boolean, public readonly errorDetails: string | null) {}
}
