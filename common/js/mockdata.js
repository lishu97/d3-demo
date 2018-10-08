Mock.mock("http://127.0.0.1:8080",{
	'code|+1': 1,
	'message': 'success',
	'result': function() {
		var length = Math.floor(5 * Math.random()) + 5
		var a = []
		for(var i = 0; i <= length; i ++) {
			a.push(Math.floor(Math.random() * 100))
		}
		return a
	},
	'center': function() {
		var length = Math.floor(5 * Math.random() + 7)
		var center = []
		for(var i = 0; i <= length; i++) {
			center.push([i, Math.random().toFixed(2)])
		}
		return center
	}
})

