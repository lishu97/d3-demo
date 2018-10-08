Mock.mock("http://localhost:8080",{
	'code|+1': 1,
	'message': 'success',
	'type|5':[{
		'name|+1': ["type1", "type2", "type3", "type4", "type5"],
		'value': '@natural(20, 100)'
	}]
})

