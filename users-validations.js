db.createCollection('users', {
	validator: {
		$jsonSchema: {
			bsonType: "object", //each document is an object
			required: ["name", "age", "hobbies", "address", "networth"], //these fields are required
			properties: {
				name: {
					bsonType: "string",
					description: "must be a string and is required"
				},
				age: {
					bsonType: "int", //age must be an integer
					description: "must be an integer and is required"
				},
				hobbies: {
					bsonType: "array", //hobbies must be an array
					description: "must be a string and is required",
					items: {
						bsonType: "object",
						description: "must be a string and is required",
						required: ["title", "description"],
						properties: {
							title: {
								bsonType: "string",
								description: "must be a string and is required",
							},
							description: {
								bsonType: "string",
								description: "must be a string and is required",
							}
						}
					}
				},
				address: {
					bsonType: "object",
					description: "must be a string and is required",
					required: ["city", "street"],
					properties: {
						city: {
							bsonType: "string",
							description: "must be a string and is required",
						},
						street: {
							bsonType: "string",
							description: "must be a string and is required",
						}
					}
				},
				networth: {
					bsonType: "long",
					description: "must be a long and is required",
				}
			}
		}
	}
});