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
