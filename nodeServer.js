/*
    Custom Elemental
    Copyright (C) 2020  Alex Dollar

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const mysql = require("mysql");
const http = require("http");
const fs = require("fs");
const {Readable} = require("stream");

const votes = 0;

let port = 10000; //Set the listening port here

console.log("Custom Elemental\nCopyright (C) 2020 Alex Dollar\nGNU General Public Lisense\n");

console.log("Starting on port: " + port);

let connection = mysql.createConnection({ //Create the MySQL connection using the provided login data
    host: "localhost",
    user: "user",
    password: "password"
});

console.log("Created Connection!");
let server = http.createServer(function (req, res) { //Listen for HTTP requests
    if (req.method === "GET") {//Get Request
        console.log("Recived GET Request");
        let data = {"Elements": [], "Combinations": []}; //Define vars
        /*
            Query database
        */
        connection.query("USE ElementsGame;", function(err, result, fields) {if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }});
        connection.query("SELECT * FROM Elements;", function(err, result, fields) {
            if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }
            Object.keys(result).forEach(function(key) {
                let row = result[key];
                data.Elements.push(row);
            });
            connection.query("SELECT * FROM Combinations;", function(err, result, fields) {
                if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }
                Object.keys(result).forEach(function(key) { //Collect data in a JS object
                    let row = result[key];
                    data.Combinations.push(row);
                    
                });
                res.writeHead(200, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"});
                Readable.from([JSON.stringify(data)]).pipe(res); //Send back the JS object in JSON string format
            });
        });
    }
    if (req.method === "POST") {//Post request
        console.log("Recived POST Request");
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString() //Build data
        });
        req.on('end', () => {
            let data = JSON.parse(body);
            if (data.type === "create") { //create element
                connection.query("USE ElementsGame;", function(err, result, fields) {if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }});
                let count=0;
                let count2 = 0;
                connection.query("SELECT COUNT(Name) AS Count FROM Elements WHERE Name='" + data.name + "';", function(err, result, fields){
                    if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }
                    count = result[0].Count;
                    connection.query("SELECT COUNT(ID) AS Count FROM Combinations WHERE ElementID1='" + data.id1 + "' AND ElementID2='" + data.id2 + "' OR ElementID2='" + data.id1 + "' AND ElementID1='" + data.id2 + "';", function(err, result, fields){
                        if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }
                        count2 = result[0].Count;
                        if (count == 0 && count2 == 0) {
                            console.log("Creating");
                            connection.query("INSERT INTO Elements (Name, Color, TextColor, Votes, Glow) VALUES('" + data.name + "', '" + data.color + "', '" + data.textColor + "', " + votes + ", " + data.glow + ");", function(err, result, fields) {if (err) throw err;});
                            connection.query("SELECT * FROM Elements WHERE Name='" + data.name + "';", function(err, result, fields) {
                                if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }
                                let id = result[0].ID;
                                connection.query("INSERT INTO Combinations (ElementID1, ElementID2, ElementID3) VALUES(" + data.id1 + ", " + data.id2 + ", " + id + ");", function(err, result, fields) {if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }});
                                res.writeHead(200, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"});
                                Readable.from(["OK"]).pipe(res);
                            });
                        } else {
                            res.writeHead(409, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"});
                            Readable.from(["Name already exists!"]).pipe(res);
                        }
                    });
                });
            } else if(data.type === "vote") {//Vote for element
                connection.query("USE ElementsGame;", function(err, result, fields) {if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }});
                let votes = 0;
                connection.query("SELECT Votes FROM Elements WHERE ID=" + data.id + ";", function(err, result, fields) {
                    if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }
                    votes = result[0].Votes;
                    if (votes < 10) {
                        if (data.flag) {
                            votes += 1;
                        } else {
                            votes -= 1;
                        }
                        connection.query("UPDATE Elements SET Votes=" + votes + " WHERE ID=" + data.id + ";", function(err, results, fields) {if (err) throw err;});
                        res.writeHead(200, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"});
                        Readable.from(["OK"]).pipe(res);
                    }
                });

            } else if(data.type === "update") {//Recreate Element
                connection.query("USE ElementsGame;", function(err, result, fields) {if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }});
                let count=0;
                connection.query("SELECT COUNT(Name) AS Count FROM Elements WHERE Name='" + data.name + "';", function(err, result, fields){
                    if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }
                    count = result[0].Count;
                });
                if (count == 0) {
                    let id;
                    let combId;
                    connection.query("SELECT ElementID3,ID FROM Combinations Where (ElementID1=" + data.id1 + " AND ElementID2=" + data.id2 + ") OR (ElementID1=" + data.id2 + " AND ElementID2=" + data.id1 + ") ;", function(err, result, fields){
                        if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }
                        id = result[0].ElementID3;
                        combId = result[0].ID;
                        connection.query("UPDATE Elements SET Name='" + data.name + "', Color='" + data.color + "', TextColor='" + data.textColor + "', Glow=" + data.glow + ", Votes=" + votes + ", Timestamp=CURRENT_TIMESTAMP WHERE ID=" + id + ";", function(err, result, fields){
                            if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }
                            connection.query("UPDATE Combinations SET ElementID1=" + data.id1 + ", ElementID2=" + data.id2 + ", ElementID3=" + id + " WHERE ID=" + combId + ";", function(err, result, fields){
                                if (err) { res.writeHead(500, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }
                                res.writeHead(200, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"});
                                Readable.from(["OK"]).pipe(res);
                            });
                        });
                    });
                } else {
                    res.writeHead(409, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"});
                    Readable.from(["Name already exists!"]).pipe(res);
                }
            } else if (data.type === "brew") {//Don't brew coffee here
                console.log("RECIVED BREW REQUEST");
                res.writeHead(418, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"});
                Readable.from(["I'm a teapot! The requested entity body is short and stout. Tip me over and pour me out."]).pipe(res);
            } else {//No type found
                res.writeHead(400, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"});
                Readable.from(["NO TYPE FOUND! Please make sure there is a type in the JSON object!"]).pipe(res);
            }
        });
    }
    if (req.method === "BREW") {//What did I tell you about brewing coffee here
        console.log("RECIVED BREW REQUEST");
        res.writeHead(418, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"});
        Readable.from(["I'm a teapot! The requested entity body is short and stout. Tip me over and pour me out."]).pipe(res);
    }
}).listen(port);