import * as Joi from 'joi'

const ublVersionIDSchema = Joi.object({
	_: Joi.string().optional(),
	'xmlns:cbc': Joi.string().uri().required()
})

const accountingSupplierPartySchema = Joi.object({
	'xmlns:cac': Joi.string().uri().required(),
	'cac:Party': Joi.object({
		'cac:PartyIdentification': Joi.object({
			'cbc:ID': Joi.object({
				_: Joi.string().trim().required(),
				'xmlns:cbc': Joi.string().required(),
				schemeID: Joi.string().required()
			})
		}),
		'cac:PartyName': Joi.object({
			'cbc:Name': ublVersionIDSchema
		}),
		'cac:PartyLegalEntity': Joi.object({
			'cbc:RegistrationName': ublVersionIDSchema,
			'cac:RegistrationAddress': Joi.object({
				'cbc:ID': ublVersionIDSchema,
				'cbc:AddressTypeCode': Joi.object({
					_: Joi.string().trim().required(),
					'xmlns:cbc': Joi.string().required(),
					listAgencyName: Joi.string().required(),
					listName: Joi.string().required()
				}),
				'cbc:CityName': ublVersionIDSchema,
				'cbc:District': ublVersionIDSchema,
				'cac:AddressLine': Joi.object({
					'cbc:Line': ublVersionIDSchema
				}),
				'cac:Country': Joi.object({
					'cbc:IdentificationCode': ublVersionIDSchema
				})
			})
		})
	})
})

const accountingCustomerPartySchema = Joi.object({
	'xmlns:cac': Joi.string().uri().required(),
	'cac:Party': Joi.object({
		'cac:PartyIdentification': Joi.object({
			'cbc:ID': Joi.object({
				_: Joi.string().trim().required(),
				'xmlns:cbc': Joi.string().uri().required(),
				schemeID: Joi.string().required()
			})
		}),
		'cac:PartyLegalEntity': Joi.object({
			'cbc:RegistrationName': ublVersionIDSchema,
			'cac:RegistrationAddress': Joi.object({
				'cac:AddressLine': Joi.object({
					'cbc:Line': Joi.object({
						'xmlns:cbc': Joi.string().uri().required()
					})
				}),
				'cac:Country': Joi.object({
					'cbc:IdentificationCode': Joi.object({
						'xmlns:cbc': Joi.string().uri().required()
					})
				})
			})
		})
	})
})

const allowanceChargeSchema = Joi.array().items(
	Joi.object({
		'xmlns:cac': Joi.string().required(),
		'cbc:ChargeIndicator': ublVersionIDSchema,
		'cbc:AllowanceChargeReasonCode': ublVersionIDSchema,
		'cbc:Amount': Joi.object({
			_: Joi.string().trim().required(),
			'xmlns:cbc': Joi.string().required(),
			currencyID: Joi.string().required()
		})
	})
)

const taxTotalSchema = Joi.object({
	'xmlns:cac': Joi.string().required(),
	'cbc:TaxAmount': Joi.object({
		_: Joi.string().trim().required(),
		'xmlns:cbc': Joi.string().required(),
		currencyID: Joi.string().required()
	}),
	'cac:TaxSubtotal': Joi.object({
		'cbc:TaxableAmount': Joi.object({
			_: Joi.string().trim().required(),
			'xmlns:cbc': Joi.string().required(),
			currencyID: Joi.string().required()
		}),
		'cbc:TaxAmount': Joi.object({
			_: Joi.string().trim().required(),
			'xmlns:cbc': Joi.string().required(),
			currencyID: Joi.string().required()
		}),
		'cac:TaxCategory': Joi.object({
			'cbc:ID': Joi.object({
				_: Joi.string().trim().required(),
				'xmlns:cbc': Joi.string().required(),
				schemeAgencyName: Joi.string().required(),
				schemeName: Joi.string().required()
			}),
			'cac:TaxScheme': Joi.object({
				'cbc:ID': Joi.object({
					_: Joi.string().trim().required(),
					'xmlns:cbc': Joi.string().required(),
					schemeAgencyName: Joi.string().required(),
					schemeName: Joi.string().required()
				}),
				'cbc:Name': Joi.object({
					_: Joi.string().trim().required(),
					'xmlns:cbc': Joi.string().required()
				}),
				'cbc:TaxTypeCode': Joi.object({
					_: Joi.string().trim().required(),
					'xmlns:cbc': Joi.string().required()
				})
			})
		})
	})
})

const legalMonetaryTotalSchema = Joi.object({
	'xmlns:cac': Joi.string().uri().required(),
	'cbc:LineExtensionAmount': Joi.object({
		_: Joi.string().trim().required(),
		'xmlns:cbc': Joi.string().uri().required(),
		currencyID: Joi.string().required()
	}),
	'cbc:TaxInclusiveAmount': Joi.object({
		_: Joi.string().trim().required(),
		'xmlns:cbc': Joi.string().uri().required(),
		currencyID: Joi.string().required()
	}),
	'cbc:ChargeTotalAmount': Joi.object({
		_: Joi.string().trim().required(),
		'xmlns:cbc': Joi.string().uri().required(),
		currencyID: Joi.string().required()
	}),
	'cbc:PayableRoundingAmount': Joi.object({
		_: Joi.string().trim().required(),
		'xmlns:cbc': Joi.string().uri().required(),
		currencyID: Joi.string().required()
	}),
	'cbc:PayableAmount': Joi.object({
		_: Joi.string().trim().required(),
		'xmlns:cbc': Joi.string().uri().required(),
		currencyID: Joi.string().required()
	})
})

const invoiceLineSchema = Joi.array().items(
	Joi.object({
		'xmlns:cac': Joi.string().uri().required(),
		'cbc:ID': ublVersionIDSchema,
		'cbc:InvoicedQuantity': Joi.object({
			_: Joi.string().trim().required(),
			'xmlns:cbc': Joi.string().uri().required(),
			unitCode: Joi.string().required()
		}),
		'cbc:LineExtensionAmount': Joi.object({
			_: Joi.string().trim().required(),
			'xmlns:cbc': Joi.string().uri().required(),
			currencyID: Joi.string().required()
		}),
		'cbc:FreeOfChargeIndicator': ublVersionIDSchema,
		'cac:PricingReference': Joi.object({
			'cac:AlternativeConditionPrice': Joi.object({
				'cbc:PriceAmount': Joi.object({
					_: Joi.string().trim().required(),
					'xmlns:cbc': Joi.string().uri().required(),
					currencyID: Joi.string().required()
				}),
				'cbc:PriceTypeCode': Joi.object({
					_: Joi.string().trim().required(),
					'xmlns:cbc': Joi.string().uri().required(),
					listAgencyName: Joi.string(),
					listName: Joi.string(),
					listURI: Joi.string().uri()
				})
			})
		}),
		'cac:TaxTotal': Joi.object({
			'cbc:TaxAmount': Joi.object({
				_: Joi.string().trim().required(),
				'xmlns:cbc': Joi.string().uri().required(),
				currencyID: Joi.string().required()
			}),
			'cac:TaxSubtotal': Joi.object({
				'cbc:TaxableAmount': Joi.object({
					_: Joi.string().trim().required(),
					'xmlns:cbc': Joi.string().uri().required(),
					currencyID: Joi.string().required()
				}),
				'cbc:TaxAmount': Joi.object({
					_: Joi.string().trim().required(),
					'xmlns:cbc': Joi.string().uri().required(),
					currencyID: Joi.string().required()
				}),
				'cac:TaxCategory': Joi.object({
					'cbc:ID': Joi.object({
						_: Joi.string().trim().required(),
						'xmlns:cbc': Joi.string().uri().required(),
						schemeAgencyName: Joi.string(),
						schemeName: Joi.string()
					}),
					'cbc:Percent': ublVersionIDSchema,
					'cbc:TaxExemptionReasonCode': Joi.object({
						_: Joi.string().trim().required(),
						'xmlns:cbc': Joi.string().uri().required(),
						listAgencyName: Joi.string(),
						listName: Joi.string(),
						listURI: Joi.string().uri()
					}),
					'cac:TaxScheme': Joi.object({
						'cbc:ID': Joi.object({
							_: Joi.string().trim().required(),
							'xmlns:cbc': Joi.string().uri().required(),
							schemeAgencyName: Joi.string(),
							schemeName: Joi.string()
						}),
						'cbc:Name': ublVersionIDSchema,
						'cbc:TaxTypeCode': ublVersionIDSchema
					})
				})
			})
		}),
		'cac:Item': Joi.object({
			'cbc:Description': ublVersionIDSchema
		}),
		'cac:Price': Joi.object({
			'cbc:PriceAmount': Joi.object({
				_: Joi.string().trim().required(),
				'xmlns:cbc': Joi.string().uri().required(),
				currencyID: Joi.string().required()
			})
		})
	})
)

const ublExtensionSchema = Joi.object({
	'xmlns:ext': Joi.string().uri().required(),
	'ext:UBLExtension': Joi.object({
		'ext:ExtensionContent': Joi.object({
			'ds:Signature': Joi.object({
				'xmlns:ds': Joi.string().uri().required(),
				Id: Joi.string().required(),
				'ds:SignedInfo': Joi.object({
					'ds:CanonicalizationMethod': Joi.object({
						Algorithm: Joi.string().uri().required()
					}),
					'ds:SignatureMethod': Joi.object({
						Algorithm: Joi.string().uri().required()
					}),
					'ds:Reference': Joi.object({
						URI: Joi.optional(),
						'ds:Transforms': Joi.object({
							'ds:Transform': Joi.array().items(
								Joi.object({
									Algorithm: Joi.string().uri().required()
								})
							)
						}),
						'ds:DigestMethod': Joi.object({
							Algorithm: Joi.string().uri().required()
						}),
						'ds:DigestValue': Joi.string().required()
					})
				}),
				'ds:SignatureValue': Joi.string().required(),
				'ds:KeyInfo': Joi.object({
					'ds:X509Data': Joi.object({
						'ds:X509Certificate': Joi.string().required(),
						'ds:X509SubjectName': Joi.string().required()
					})
				})
			})
		})
	})
})

const ublProfileIDSchema = Joi.object({
	_: Joi.string().optional(),
	'xmlns:cbc': Joi.string().uri().required(),
	schemeAgencyName: Joi.string().required(),
	schemeName: Joi.string().required(),
	schemeURI: Joi.string().required()
})

const ublInvoiceTypeCodeSchema = Joi.object({
	_: Joi.string().optional(),
	'xmlns:cbc': Joi.string().uri().required(),
	listAgencyName: Joi.string().required(),
	listID: Joi.string().required(),
	listName: Joi.string().required(),
	listURI: Joi.string().required()
})

const ublNoteSchema = Joi.object({
	_: Joi.string().optional(),
	'xmlns:cbc': Joi.string().uri().required(),
	languageLocaleID: Joi.string().required()
})

const ublSignatureSchema = Joi.object({
	'xmlns:cac': Joi.string().uri().required(),
	'cbc:ID': ublVersionIDSchema,
	'cac:SignatoryParty': Joi.object({
		'cac:PartyIdentification': Joi.object({
			'cbc:ID': ublVersionIDSchema
		}),
		'cac:PartyName': Joi.object({
			'cbc:Name': ublVersionIDSchema
		})
	}),
	'cac:DigitalSignatureAttachment': Joi.object({
		'cac:ExternalReference': Joi.object({
			'cbc:URI': ublVersionIDSchema
		})
	})
})

export const invoiceSchema = Joi.object({
	Invoice: Joi.object({
		xmlns: Joi.string().uri().required(),
		'ext:UBLExtensions': ublExtensionSchema,
		'cbc:UBLVersionID': ublVersionIDSchema,
		'cbc:CustomizationID': ublVersionIDSchema,
		'cbc:ProfileID': ublProfileIDSchema,
		'cbc:ID': ublVersionIDSchema,
		'cbc:IssueDate': ublVersionIDSchema,
		'cbc:IssueTime': ublVersionIDSchema,
		'cbc:InvoiceTypeCode': ublInvoiceTypeCodeSchema,
		'cbc:Note': ublNoteSchema,
		'cbc:DocumentCurrencyCode': ublVersionIDSchema,
		'cac:Signature': ublSignatureSchema,
		'cac:AccountingSupplierParty': accountingSupplierPartySchema,
		'cac:AccountingCustomerParty': accountingCustomerPartySchema,
		'cac:AllowanceCharge': allowanceChargeSchema,
		'cac:TaxTotal': taxTotalSchema,
		'cac:LegalMonetaryTotal': legalMonetaryTotalSchema,
		'cac:InvoiceLine': invoiceLineSchema
	})
})
