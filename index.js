const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');
var firebase = require('firebase')

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
        let updates = {};
        updates['devices/device1'] = true;
        firebase.database().ref().update(updates);
        agent.add("Đã mở đèn");
    }

    function turnoffled(agent){
        let updates = {};
        updates['devices/device1'] = false;
        firebase.database().ref().update(updates);
        agent.add("Đã tắt đèn");
    }

    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", sayHello);
    intentMap.set("turnonled", turnonled);
    intentMap.set("turnoffled", turnoffled);
    agent.handleRequest(intentMap);

}