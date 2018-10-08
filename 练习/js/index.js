var dataset = []
$.ajax({
	type:"get",
	url:"http://localhost:8080",
	async:false,
	dataType: "JSON"
}).then(function(data){
	console.log(data)
	//dataset
	dataset = data.type
	//圆点半径、svg大小、位置属性配置
	var radiu = 3
	var svgConfig = {
		height: 400,
		width: 800,
		top: 50,
		bottom: 50,
		left: 50,
		right: 50
	}
	//获取SVG
	var svg = d3.select("svg")
		.attr("height", svgConfig.height)
		.attr("width", svgConfig.width)
	var maxValue = d3.max(dataset, function(d) {
		return d.value
	})
	//X轴比例尺
	var xScale = d3.scale.ordinal()
		.domain(d3.range(dataset.length))
		.rangeRoundBands([0, svgConfig.width - svgConfig.left - svgConfig.right])
	//Y轴比例尺
	var yScale = d3.scale.linear()
		.domain([0, maxValue])
		.range([(svgConfig.height - svgConfig.top - svgConfig.bottom) * 1.2, 0])
	
	/*添加X轴*/
	var defColor = "rgb(99, 114, 210)"
	var xAxis = svg.append('g')
		.attr("class", "axis xAxis")
		.attr(
			"transform",
			"translate(" + svgConfig.left + "," + (svgConfig.height - svgConfig.bottom) + ")"
		)
	//添加x轴线
	var line = xAxis.append('path')
		.attr("d", "M0,0 L" + (svgConfig.width - svgConfig.left - svgConfig.right) + ",0")
		.style({
			"stroke": defColor,
			"stroke-width": "3px",
			'shape-rendering': 'optimizeSpeed'
		})
	//横坐标
	var xCoordinate = xAxis.selectAll(".xCoordinate")
		.data(dataset)
		.enter()
		.append("g")
		.attr("class", "xCoordinate")
		.attr(
			"transform",
			function(d, i) {
				return "translate(" 
					+ (svgConfig.width - svgConfig.left - svgConfig.right) / (dataset.length - 1) * i
					+ ",20)"
			}
		)
	//添加x轴文字
	var content = xCoordinate
		.append("text")
		.attr({
			'font-weight': '900',
			'font-family': 'Miscrosoft Yahei',
			'text-anchor': 'middle',
			'fill': defColor
		})
		.text(function(d) {
			return d.name
		})
	//添加短横线
	var dataset2 = [0, 1, 2, 3, 4, 5]
	var shortLine = xCoordinate.selectAll("path")
		.data(dataset2)
		.enter()
		.append("path")
		.attr('d', function(d) {
			return "M-4,-" + ((svgConfig.height - svgConfig.top - svgConfig.bottom) / dataset2.length * d + 70) + " H8"
		})
		.attr({
			'stroke': defColor
		})
	//定义区域生成器
	var areaPath = d3.svg.area()
		.x(function(d) {
		  return d.x
		})
		.y0(function(d) {
		  return d.y0
		})
		.y1(function(d) {
		  return d.y1
		})
	//添加三角区域
	svg.selectAll(".area")
		.data(dataset)
		.enter()
		.append("path")
		.attr("class", "area")
		.attr(
			"d", 
			function(d, i)  {
				var data = [{
				  x: svgConfig.left,
				  y0: svgConfig.height - svgConfig.bottom,
				  y1: svgConfig.height - svgConfig.bottom
				}, {
				  x: ((svgConfig.width - svgConfig.left - svgConfig.right) 
					/ (dataset.length - 1) * i 
					+ svgConfig.left + radiu),
				  y0: svgConfig.height - svgConfig.bottom,
				  y1: (yScale(d.value) + svgConfig.top)
				}, {
				  x: svgConfig.width - svgConfig.right,
				  y0: svgConfig.height - svgConfig.bottom,
				  y1: svgConfig.height - svgConfig.bottom
				}]
				return areaPath(data)
			}
		)
	//添加颜色渐变
	var jqArea = $(".area")
	for(var i = 0, len = jqArea.length; i < len; i++){
		$(jqArea[i]).attr("fill","url(#grad" + (i + 1) + ")")
	}
	
	// 添加圆点、百分值
	var view = svg.selectAll(".view")
		.data(dataset)
		.enter()
		.append("g")
		.attr("class", "view")
		.attr(
			'transform',
			function(d, i)  {
				return 'translate(' 
				+ ((svgConfig.width - svgConfig.left - svgConfig.right) 
					/ (dataset.length - 1) * i 
					+ svgConfig.left + radiu) 
				+ ',0)'
			}
		)
	//添加点
	var center = view.append("circle")
		.attr(
			'transform',
			function(d, i) {
				return 'translate(0,' 
				+ (yScale(d.value) + svgConfig.top) + ')'
			}
		)
		.attr({
			'r': radiu,
			'fill': defColor
		})
	//添加百分值
	var percent = view.append("text")
		.attr(
			'transform',
			function(d, i) {
				return 'translate(0,' 
				+ (yScale(d.value) + svgConfig.top - 10) + ')'
			}
		)
		.attr({
			'font-weight': '900',
			'font-family': 'Miscrosoft Yahei',
			'text-anchor': 'middle',
			'fill': defColor
		})
		.text(function(d) {
			return d.value
		})
})