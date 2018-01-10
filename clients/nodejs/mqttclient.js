var mqtt = require("mqtt");

const username = "UzIyQTgwRjc2NkBzY3JpcHRy:UzIyQTgwRjc2NjpxdWV1ZV9kZXZpY2VAc2NyaXB0cg==";
const password = "UzIyQTgwRjc2NjpxdWV1ZV9kZXZpY2U6RDZGREJBNDkyQUZCMDQ5M0ZFOEMxRDRCN0EwRUNCMjE=";
const topic = "UzIyQTgwRjc2Ng==/blog_queuing/invoke";

var client = mqtt.connect("mqtts://mqtt.scriptr.io:8883", {
	
	clientId : "scriptr_mqtt_client",
	username : username,
	password : password
});

client.on(
		"connect",
		function() {
			console.log("Connected");
		});

client.on("message", function(topic, message) {
	// message is Buffer
	console.log(message.toString());
});

client.on("close", function(e) {
	console.log(e);
});

client.on("error", function(e) {
	console.log(e);
});

setInterval(
		 
	function() {
		
		var temperature = Math.round(Math.random() * 5) + 15;
		var pressure = Math.round(Math.random() * 20) + 80;
		var coordinates = "24.9721527:55.1961022";
		var msg = {
			method: "blog/queues/processor",
			params:{
				data: + temperature + "," + pressure + "," + coordinates + "," + new Date().toISOString()
			}
		};
		client.publish(topic, JSON.stringify(msg));
	}, 10000);
