# MongoDB_Practice

mongoDB notes



Documents/collections

Schema less

	Each docs name has different schema

Flexible Schema

	some docs name has different name

Strict Schema

	all docs name are the same


Data types

	text
	boolean
	number
		NumberInt
		NumberLong
		NumberDecimal
	ObjectId (mongoDB automatically create)
	ISODate
	Embedded Doc (values can be above)
	array (values can be above)


Relationships

Embedded

	one to many
	example:
		comments: [
				{text: “”Great post},
				{text: “Nice”}
			]

Reference

	example:
		comments: [
			“post_id1”, “post_id2”
			]



COMANDS:

	db.collection.findOne()
	db.collection.find()

	db.collection.insert()
	db.collection.insertMany()

	db.collection.updateOne()
	db.collection.update()


> db.sales.findOne()
{
	"_id" : ObjectId("6396f11627dd6878031ada46"),
	"saleDate" : ISODate("2022-12-12T09:15:02.348Z"),
	"items" : [
		{
			"name" : "printerpaper",
			"price" : 40,
			"quantity" : 2
		},
		{
			"name" : "notepad",
			"price" : 35,
			"quantity" : 5
		}
	],
	"storeLocation" : "Denver",
	"customer" : ObjectId("6396f09327dd6878031ada45"),
	"couponUsed" : true,
	"purchasedMethod" : "online",
	"timestamp" : Timestamp(1670836502, 1),
	"longNumber" : NumberLong("123456789123456789")
}


Customer row objectID is from customer collection/tables, relational tables/collections


UPDATE BAsED ON ID ITEMS

db.sales.updateOne({_id: ObjectId("6396f11627dd6878031ada46")},
				{$set: {items: [
					{
						item: ObjectId("6396f23827dd6878031ada49"), quantity: 2
					},
					{
						item: ObjectId("6396f23827dd6878031ada4a"), quantity: 5
					}]
				}
			})



> db.sales.findOne()
{
	"_id" : ObjectId("6396f11627dd6878031ada46"),
	"saleDate" : ISODate("2022-12-12T09:15:02.348Z"),
	"items" : [
		{
			"item" : ObjectId("6396f23827dd6878031ada49"),
			"quantity" : 2
		},
		{
			"item" : ObjectId("6396f23827dd6878031ada4a"),
			"quantity" : 5
		}
	],
	"storeLocation" : "Denver",
	"customer" : ObjectId("6396f09327dd6878031ada45"),
	"couponUsed" : true,
	"purchasedMethod" : "online",
	"timestamp" : Timestamp(1670836502, 1),
	"longNumber" : NumberLong("123456789123456789")
}

EXAMPLE MONGODB

Authors table

db.authors.find().pretty()
{
	"_id" : ObjectId("6396f5b727dd6878031ada4b"),
	"name" : "Mark",
	"surname" : "Zuckerberg",
	"age" : 29,
	"address" : {
		"city" : "SF",
		"street" : "Tree"
	}
}
{
	"_id" : ObjectId("6396f5b727dd6878031ada4c"),
	"name" : "Bill",
	"surname" : "Gates",
	"age" : 60,
	"address" : {
		"city" : "SF",
		"street" : "Rock"
	}
}




INSERT AUTHORS ID TO BOOK TABLE AUTHORLIST

db.books.insertOne({title: "This is book one", price: 40, authorsList:
	[
		ObjectId("6396f5b727dd6878031ada4b"),
		ObjectId("6396f5b727dd6878031ada4c")
	]
})




Books table

> db.books.find().pretty()
{
	"_id" : ObjectId("6396f61e27dd6878031ada4d"),
	"title" : "This is book one",
	"price" : 40,
	"authorsList" : [
		ObjectId("6396f5b727dd6878031ada4b"),
		ObjectId("6396f5b727dd6878031ada4c")
	]
}


JOINT TABLE WITH aggregate()

COMMAND

db.books.aggregate([{$lookup: {from: "authors", localField: "authorsList", foreignField: "_id", as: "authorsList"}}]).pretty()


RESULT

{
	"_id" : ObjectId("6396f61e27dd6878031ada4d"),
	"title" : "This is book one",
	"price" : 40,
	"authorsList" : [
		{
			"_id" : ObjectId("6396f5b727dd6878031ada4b"),
			"name" : "Mark",
			"surname" : "Zuckerberg",
			"age" : 29,
			"address" : {
				"city" : "SF",
				"street" : "Tree"
			}
		},
		{
			"_id" : ObjectId("6396f5b727dd6878031ada4c"),
			"name" : "Bill",
			"surname" : "Gates",
			"age" : 60,
			"address" : {
				"city" : "SF",
				"street" : "Rock"
			}
		}
	]
}





Schema Validations

Write actions -> Collection -> Validation Schema -> Accepted
									|
								Rejected


{
	"name": "Jeff Bezos",
	"age": Number("42"),
	"hobbies": [
		{
			"title": "Business",
			"description": "Creating businesses"
		},
		{
			"title": "Coding",
			"description": "Creating Websites and services"
		}
	],
	"address": {
		"city": "SF",
		"street": "Rock"
	},
	"networth": NumberLong("182000000000")
}