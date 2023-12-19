import * as Joi from 'joi'
// const importSchema = Joi.object({
// 	namespace: Joi.string().required(),
// 	schemaLocation: Joi.string().required()
// })

// const elementSchema = Joi.object({
// 	name: Joi.string().required(),
// 	type: Joi.string().required(),
// 	'xsd:annotation': Joi.object({
// 		'xsd:documentation': Joi.string().required()
// 	})
// })

// const documentationSchema = Joi.alternatives().try(
// 	Joi.string(),
// 	Joi.object({
// 		'ccts:Component': Joi.object({
// 			'ccts:ComponentType': Joi.string().required(),
// 			'ccts:DictionaryEntryName': Joi.string().required(),
// 			'ccts:Definition': Joi.string().required(),
// 			'ccts:Cardinality': Joi.string().required(),
// 			'ccts:Joi.objectClass': Joi.string().required(),
// 			'ccts:PropertyTerm': Joi.string().optional(), //Optional
// 			'ccts:RepresentationTerm': Joi.string().required(),
// 			'ccts:DataType': Joi.string().required(),
// 			'ccts:Examples': Joi.string().optional() //Optional
// 		}).required()
// 	}).required()
// )

// const elementWithRefSchema = Joi.object({
// 	ref: Joi.string().required(),
// 	minOccurs: Joi.string(),
// 	maxOccurs: Joi.string(),
// 	'xsd:annotation': Joi.object({
// 		'xsd:documentation': documentationSchema.required()
// 	})
// })

// const complexTypeSchema = Joi.object({
// 	name: Joi.string().required(),
// 	'xsd:annotation': Joi.object({
// 		'xsd:documentation': Joi.object({
// 			'ccts:Component': Joi.object({
// 				'ccts:ComponentType': Joi.string().required(),
// 				'ccts:DictionaryEntryName': Joi.string().required(),
// 				'ccts:Definition': Joi.string().required(),
// 				'ccts:Joi.objectClass': Joi.string().required()
// 			})
// 		})
// 	}),
// 	'xsd:sequence': Joi.object({
// 		'xsd:element': Joi.array().items(elementWithRefSchema).required()
// 	})
// })

// export const _invoiceSchema = Joi.object({
// 	'xsd:schema': Joi.object({
// 		xmlns: Joi.string().required(),
// 		'xmlns:cac': Joi.string().required(),
// 		'xmlns:cbc': Joi.string().required(),
// 		'xmlns:ext': Joi.string().required(),
// 		'xmlns:xsd': Joi.string().required(),
// 		'xmlns:ccts': Joi.string().required(),
// 		targetNamespace: Joi.string().required(),
// 		elementFormDefault: Joi.string().required(),
// 		attributeFormDefault: Joi.string().required(),
// 		version: Joi.string().required(),
// 		'xsd:import': Joi.array().items(importSchema).required(),
// 		'xsd:element': elementSchema.required(),
// 		'xsd:complexType': complexTypeSchema.required()
// 	})
// })

const accountingSupplierPartySchema = Joi.object({
	'cac:AccountingSupplierParty': Joi.object({
		'xmlns:cac': Joi.optional(),
		'cac:Party': Joi.object({
			'cac:PartyIdentification': Joi.object({
				'cbc:ID': Joi.object({
					_: Joi.string().trim().required(),
					'xmlns:cbc': Joi.string().required(),
					schemeID: Joi.string().required()
				})
			}),
			'cac:PartyName': Joi.object({
				'cbc:Name': Joi.object({
					_: Joi.string().trim().required(),
					'xmlns:cbc': Joi.string().required()
				})
			}),
			'cac:PartyLegalEntity': Joi.object({
				'cbc:RegistrationName': Joi.object({
					_: Joi.string().trim().required(),
					'xmlns:cbc': Joi.string().required()
				}),
				'cac:RegistrationAddress': Joi.object({
					'cbc:ID': Joi.object({
						_: Joi.string().trim().required(),
						'xmlns:cbc': Joi.string().required()
					}),
					'cbc:AddressTypeCode': Joi.object({
						_: Joi.string().trim().required(),
						'xmlns:cbc': Joi.string().required(),
						listAgencyName: Joi.string().required(),
						listName: Joi.string().required()
					}),
					'cbc:CityName': Joi.object({
						_: Joi.string().trim().required(),
						'xmlns:cbc': Joi.string().uri().required()
					}),
					'cbc:District': Joi.object({
						_: Joi.string().trim().required(),
						'xmlns:cbc': Joi.string().uri().required()
					}),
					'cac:AddressLine': Joi.object({
						'cbc:Line': Joi.object({
							_: Joi.string().trim().required(),
							'xmlns:cbc': Joi.string().uri().required()
						})
					}),
					'cac:Country': Joi.object({
						'cbc:IdentificationCode': Joi.object({
							_: Joi.string().trim().required(),
							'xmlns:cbc': Joi.string().uri().required()
						})
					})
				})
			})
		})
	})
})

const accountingCustomerPartySchema = Joi.object({
	'cac:AccountingCustomerParty': Joi.object({
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
				'cbc:RegistrationName': Joi.object({
					_: Joi.string().trim().required(),
					'xmlns:cbc': Joi.string().uri().required()
				}),
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
})

const allowanceChargeSchema = Joi.array().items(
	Joi.object({
		'xmlns:cac': Joi.string().required(),
		'cbc:ChargeIndicator': Joi.object({
			_: Joi.string().trim().required(),
			'xmlns:cbc': Joi.string().required()
		}),
		'cbc:AllowanceChargeReasonCode': Joi.object({
			_: Joi.string().trim().required(),
			'xmlns:cbc': Joi.string().required()
		}),
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
		'cbc:ID': Joi.object({
			_: Joi.string().trim().required(),
			'xmlns:cbc': Joi.string().uri().required()
		}),
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
		'cbc:FreeOfChargeIndicator': Joi.object({
			_: Joi.string().trim().required(),
			'xmlns:cbc': Joi.string().uri().required()
		}),
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
					'cbc:Percent': Joi.object({
						_: Joi.string().trim().required(),
						'xmlns:cbc': Joi.string().uri().required()
					}),
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
						'cbc:Name': Joi.object({
							_: Joi.string().trim().required(),
							'xmlns:cbc': Joi.string().uri().required()
						}),
						'cbc:TaxTypeCode': Joi.object({
							_: Joi.string().trim().required(),
							'xmlns:cbc': Joi.string().uri().required()
						})
					})
				})
			})
		}),
		'cac:Item': Joi.object({
			'cbc:Description': Joi.object({
				_: Joi.string().trim().required(),
				'xmlns:cbc': Joi.string().uri().required()
			})
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

export const invoiceSchema = Joi.object({
	Invoice: Joi.object({
		xmlns: Joi.string().uri().required(),
		'ext:UBLExtensions': ublExtensionSchema,
		'cbc:UBLVersionID': Joi.object({
			_: Joi.string().optional(),
			'xmlns:cbc': Joi.string().uri().required()
		}),
		'cbc:CustomizationID': Joi.object({
			_: Joi.string().optional(),
			'xmlns:cbc': Joi.string().uri().required()
		}),
		'cbc:ProfileID': Joi.object({
			_: Joi.string().optional(),
			'xmlns:cbc': Joi.string().uri().required(),
			schemeAgencyName: Joi.string().required(),
			schemeName: Joi.string().required(),
			schemeURI: Joi.string().required()
		}),
		'cbc:ID': Joi.object({
			_: Joi.string().optional(),
			'xmlns:cbc': Joi.string().uri().required()
		}),
		'cbc:IssueDate': Joi.object({
			_: Joi.string().optional(),
			'xmlns:cbc': Joi.string().uri().required()
		}),
		'cbc:IssueTime': Joi.object({
			_: Joi.string().optional(),
			'xmlns:cbc': Joi.string().uri().required()
		}),
		'cbc:InvoiceTypeCode': Joi.object({
			_: Joi.string().optional(),
			'xmlns:cbc': Joi.string().uri().required(),
			listAgencyName: Joi.string().required(),
			listID: Joi.string().required(),
			listName: Joi.string().required(),
			listURI: Joi.string().required()
		}),
		'cbc:Note': Joi.object({
			_: Joi.string().optional(),
			'xmlns:cbc': Joi.string().uri().required(),
			languageLocaleID: Joi.string().required()
		}),
		'cbc:DocumentCurrencyCode': Joi.object({
			_: Joi.string().optional(),
			'xmlns:cbc': Joi.string().uri().required()
		}),
		'cac:Signature': Joi.object({
			'xmlns:cac': Joi.string().uri().required(),
			'cbc:ID': Joi.object({
				_: Joi.string().optional(),
				'xmlns:cbc': Joi.string().uri().required()
			}),
			'cac:SignatoryParty': Joi.object({
				'cac:PartyIdentification': Joi.object({
					'cbc:ID': Joi.object({
						_: Joi.string().optional(),
						'xmlns:cbc': Joi.string().uri().required()
					})
				}),
				'cac:PartyName': Joi.object({
					'cbc:Name': Joi.object({
						_: Joi.string().optional(),
						'xmlns:cbc': Joi.string().uri().required()
					})
				})
			}),
			'cac:DigitalSignatureAttachment': Joi.object({
				'cac:ExternalReference': Joi.object({
					'cbc:URI': Joi.object({
						_: Joi.string().optional(),
						'xmlns:cbc': Joi.string().uri().required()
					})
				})
			})
		}),
		'cac:AccountingSupplierParty': accountingSupplierPartySchema,
		'cac:AccountingCustomerParty': accountingCustomerPartySchema,
		'cac:AllowanceCharge': allowanceChargeSchema,
		'cac:TaxTotal': taxTotalSchema,
		'cac:LegalMonetaryTotal': legalMonetaryTotalSchema,
		'cac:InvoiceLine': invoiceLineSchema
	})
})
