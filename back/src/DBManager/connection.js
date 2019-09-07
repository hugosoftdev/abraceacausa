var MongoClient = require('mongodb').MongoClient;
export let connection;
export const startConnection = MongoClient.connect("mongodb://localhost:27017").then(con => connection = con);
