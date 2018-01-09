var mqtt = require("mqtt");

const username = "SCRIPTRIO_QUEUING_USERNAME";
const password = "SCRIPTRIO_QUEUING_PASSWORD";
const topic = "SCRIPTRIO_QUEUING_INVOKE_ROUTING_KEY";

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
		var msg = {
			method: "blog/queues/processor",
			params:{
				data: + temperature + "," + pressure + "," + new Date().toISOString()
			}
		};
		client.publish(topic, JSON.stringify(msg));
	}, 10000);
