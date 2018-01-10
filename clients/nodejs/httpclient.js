var https = require("https");

const TOKEN = "A_VALID_SCRIPTRION_TOKEN";
const URL = "api.scriptrapps.io";
const API = "/blog/queues/feed";

setInterval(
		 
	function() {
		
		var temperature = Math.round(Math.random() * 5) + 15;
		var pressure = Math.round(Math.random() * 20) + 80;
		var params = {
			temperature: "" + temperature,
			pressure: "" + pressure,
			coordinates: "24.9721527:55.1961022",
			time: new Date().toISOString()
		};
		
		post(params);
	}, 10000
);

function post(params) {
	
	var postData = null;
	var options = {
			  
		hostname: URL, 
		port: 443,
		path: API,
		headers: { 
			"Authorization": "Bearer " +  TOKEN
		},
		method: "POST"
	};
	
	postData = JSON.stringify(params);
	options.headers["Content-Type"] = "application/json";	
	options.headers["Content-Length"] = postData.length;
	var request = https.request(
		options, 
		function(response) {
			
			var bodyString = "";			
			response.setEncoding("utf8");
			response.on("data", function(chunk) {
				bodyString += chunk; 
			});
			
			response.on("end", function(chunk) {
				
				if (chunk) { 
					bodyString += chunk;
				}
				
				console.log(bodyString);	
			});
		});
	
	request.write(postData);
	request.end();
};
