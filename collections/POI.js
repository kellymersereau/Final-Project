POI = new Mongo.Collection('POI');

POISchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	category: {
		type: String,
		label: "Category"
	},
	lat: {
		type: Number
	},
	lng: {
		type: Number
	},
	address:{
		type: String
	},
	// attachedQuestions:{
	// 	type: [TriviaQuestions]
	// }
});

POI.attachSchema(POISchema);