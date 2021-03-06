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

/*
    Define Constants
*/

const URL = "http://127.0.0.1:10000";

/*
    This function is used to check if a point is inside of a box
*/

    function isTouching(position, scale, position2) {
        if (
            position2.x <= position.x + scale.x &&
            position2.x >= position.x &&
            position2.y <= position.y + scale.y &&
            position2.y >= position.y
        ) {return true;} else {return false;}
    }

/*
    This function is used to get the element from an id contained in an element array
*/

    function getElementFromID(id, elements) {
        for (let i=0; i<elements.length; i++) {
            if (elements[i].id == id) return elements[i];
        }
        return null;
    }

/*
    This function is used to get the element array index from an element id in an element array
*/

    function getIndexFromID(id, elements) {
        for (let i=0; i<elements.length; i++) {
            if (elements[i].id == id) return i;
        }
        return null;
    }

/*
    This function is used to create an element array from the data stored in the database
    You must call createConnection() first
    This function has a callback so you can set your arrays to what this function returns and for any further code
*/

    function createElementsTable(callback) { //MAY CAUSE LAG
        console.log("SENDING GET REQUEST");
        let table = [];
        let http = new XMLHttpRequest();
        http.addEventListener("load", reqListener);
        http.open("GET", URL, true);
        http.send();

        function reqListener() {
            if (this.status != 200) {
                console.log("ERROR!");
                console.log(this.responseText);
                return;
            }
            console.log("RECIVED!")
            let object = JSON.parse(this.responseText);
            let Elements = object.Elements;
            Elements.forEach(function(v) {
                let element = new Element(v["ID"], v['Name'], intToColor(v["Color"]), intToColor(v["TextColor"]), transparentColor, v["Unlocked"], v["Votes"], v["Glow"]);
                table.push(element);
            });
            callback(table, object.Combinations);
        }
    }

/*
    This function attempts to combine two elements using a combination array
    If successful will call callback() with the element to unlock()
*/

    function attemptCombine(element1, element2, combinations, elements, createGui, callback) {
        let id1 = element1.id;
        let id2 = element2.id;
        let flag = false;
        let found = false;
        let ovr = false;
        let count = 0;
        combinations.forEach(function(v) {
            count++;
            if (v.ElementID1 == id1 && v.ElementID2 == id2) {
                found = true;
                let element = getElementFromID(v.ElementID3, elements);
                if (element.unlocked == 0) {
                    if (element.votes >= 10) {
                        callback(element);
                        return;
                    }else if(element.votes <= -5) {
                        ovr = true;
                    } else {;
                        voteGui.element = element;
                        voteGui.visible = true;
                        voteGui.element.updateInfo();
                    }
                }
            } else if (v.ElementID2 == id1 && v.ElementID1 == id2) {
                found = true;
                let element = getElementFromID(v.ElementID3, elements);
                if (element.unlocked == 0) {
                    if (element.votes >= 10) {
                        callback(element);
                        return;
                    }else if(element.votes <= -5) {
                        ovr = true;
                    } else {;
                        voteGui.element = element;
                        voteGui.visible = true;
                        voteGui.element.updateInfo();
                    }
                }
            } else {
                flag = true;
            }
        });
        if ((flag && !found) || ovr || count==0) {
            createGui.selected = 13;
            createGui.name = "";
            createGui.visible = true;
            createGui.element1 = element1;
            createGui.element2 = element2;
            if (createGui.element) {
                createGui.element.name = "";
                createGui.element.glow = 0;
                createGui.element.updateInfo();
            }
            if (ovr) createGui.flag = true; else createGui.flag = false;
        }
    }

/*
    This function is used to create an element server-side in the database
    Will call callback() for additional code to be run
*/

    function createGameElement(name, color, textColor, glow, id1, id2, flag, callback) {
        console.log("SENDING POST REQUEST");
        let http = new XMLHttpRequest();
        let data = {
            "type": "create",
            "name": name,
            "color": color,
            "textColor": textColor,
            "glow": glow,
            "id1": id1,
            "id2": id2
        }
        if (flag) data.type = "update";
        http.addEventListener("load", reqListener);
        http.open("POST", URL, true);
        http.send(JSON.stringify(data));
        function reqListener() {
            if (this.status != 200) {
                console.log("ERROR!");
                console.log(this.responseText);
                return;
            }
            console.log("RECIVED!");
            callback();
        }
    }

/*
    This function is used to vote for an element server-side in the database
    Will call callback for adsitional code to be run
*/ 

    function vote(element, flag, callback) {
        console.log("SENDING POST REQUEST");
        let http = new XMLHttpRequest();
        let data = {
            "type": "vote",
            "id": element.id,
            "flag": flag
        }
        http.addEventListener("load", reqListener);
        http.open("POST", URL, true);
        http.send(JSON.stringify(data));
        function reqListener() {
            if (this.status != 200) {
                console.log("ERROR!");
                console.log(this.responseText);
                return;
            }
            console.log("RECIVED!");
            callback();
        }
    }

/*
    This function uldates an element table with new data baised of an old element table
    This function also regenerates the combination table
*/

    function updateElementsTable(elements, callback) { //May cause lag
        console.log("SENDING GET REQUEST");
        let table = elements;
        let http = new XMLHttpRequest();
        http.addEventListener("load", reqListener);
        http.open("GET", URL, true);
        http.send();

        function reqListener() {
            console.log("RECIVED!")
            let object = JSON.parse(this.responseText);
            let Elements = object.Elements;
            Elements.forEach(function(v) {
                if (getElementFromID(v.ID, elements)) {
                    let index = getIndexFromID(v.ID, table);
                    if (table[index].unlocked == 0) {
                        table[index].unlocked = v.Unlocked;
                        table[index].votes = v.Votes;
                    }
                } else {
                    let element = new Element(v["ID"], v['Name'], intToColor(v["Color"]), intToColor(v["TextColor"]), transparentColor, v["Unlocked"], v["Votes"], v["Glow"]);
                    table.push(element);
                }
            });
            callback(table, object.Combinations);
        }
    }
    
/*
    Query Wikipedia
*/
    function queryWiki(title, callback) {
        console.log("Sending Wiki Request");
        let url = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=&origin=*&titles=" + title;
        let http = new XMLHttpRequest();
        http.addEventListener("load", reqListener);
        http.open("GET", url);
        http.send();

        function reqListener() {
            console.log("RECIVED!");
            let object = JSON.parse(this.responseText);
            let index = [];

            let subObject = object.query.pages;
            // build the index
            for (var x in subObject) {
                index.push(x);
                let text = subObject[x].extract;
                callback(text);
            }
            
            // sort the index
            index.sort(function (a, b) {    
                return a == b ? 0 : (a > b ? 1 : -1); 
            });

            let text = subObject[index[0]].extract;
            let title = subObject[index[0]].title;

            callback(text, title);
        }
    }

    function nothingImportant() {//Tell the server to brew some coffee
        console.log("SENDING BREW REQUEST!");
        let http = new XMLHttpRequest();
        http.open("POST", URL);
        let data = {
            "type": "brew"
        }
        http.send(JSON.stringify(data));
    }