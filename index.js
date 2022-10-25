const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');
const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyCv49tXi0UC27uLzyUnqTV9c1bOWVWHrVE",
    authDomain: "controldevices-f56de.firebaseapp.com",
    projectId: "controldevices-f56de",
    storageBucket: "controldevices-f56de.appspot.com",
    messagingSenderId: "66509810211",
    appId: "1:66509810211:web:264cf827d071b72ba19f96",
    measurementId: "G-RLQBYK07SG"
};

firebase.initializeApp(firebaseConfig) 
let database = firebase.database()

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000

app.post('/dialogflow-fulfillment', (request, response) => {
    dialogflowFulfillment(request, response)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

const dialogflowFulfillment = (request, response) => {
    const agent = new WebhookClient({request, response})

    function sayHello(agent){
        agent.add("Hello, Sang")
    }

    function turnonled(agent){
       
        database.ref('devices/device1').set(true);
        agent.add("the light already turn on");
    }

    function turnoffled(agent){
        database.ref('devices/device1').set(false);
        agent.add("the light already turn off");
    }

    function turnonfan(agent){
       
        database.ref('devices/device2').set(true);
        agent.add("the fan already turn on");
    }

    function turnofffan(agent){
        database.ref('devices/device2').set(false);
        agent.add("the fan already turn off");
    }

    function turnondoor(agent){
       
        database.ref('devices/device3').set(true);
        agent.add("the door already turn on");
    }

    function turnoffdoor(agent){
        database.ref('devices/device3').set(false);
        agent.add("the door already turn off");
    }

    function getDHT(agent){
        //database.ref('devices/device4').set(false);
        let data = "dht";
        database.ref('devices/device4').once('value')
        .then(function(snapshot) {
            data = snapshot.val() 
            agent.add(data);
        })
       
    }

    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", sayHello);

    intentMap.set("turnonled", turnonled);
    intentMap.set("turnoffled", turnoffled);

    intentMap.set("turnonfan", turnonfan);
    intentMap.set("turnofffan", turnofffan);

    intentMap.set("turnondoor", turnondoor);
    intentMap.set("turnoffdoor", turnoffdoor);

    intentMap.set("dht", getDHT);

    agent.handleRequest(intentMap);

}