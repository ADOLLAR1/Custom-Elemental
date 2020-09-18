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

let colors;
let utils;
let elements = [];
let combinations = [];
let element1;
let element2 = false;
let createGui;
let voteGui;

/*
    This is run once when the game starts.
    I use this function to get data from the server and to 
    setup other varibles and classes that will be used later.

    This function is called by p5.js
*/

function setup() {
    console.log("Custom Elemental\nCopyright (C) 2020 Alex Dollar\nGNU General Public Lisense\nChecl license.txt for more info");
    createCanvas(800, 800);
    colors = new colorTypes;
    createGui = new CreateGui;
    voteGui = new VoteGui
    UtilFunctions.createConnection();
    UtilFunctions.createElementsTable(function(table, table2) {elements = table; combinations = table2;});
}

/*
    This function is called once every frame.
    I use this function to draw things to the canvas using the p5.js library.
    All draw functions in classes are called from this function directly or indirectly.

    This function is called by p5.js
*/

function draw() {
    background(191);
    let j = 0
    for(i=0;i<elements.length; i++) { //Draw the elements to the canvas in a grid pattern
        elements[i].setPosition(createVector(Math.floor((j)/950),((j)*50)%950));
        elements[i].draw();
        if (elements[i].votes>=10&&elements[i].unlocked==1) {j+=1;}
    }
    if (createGui.visible) { //Draw the Create GUI only if visible
        createGui.draw();
    }
    if (voteGui.visible) { //Draw the Vote GUI only if visible
        voteGui.draw();
    }
}

/*
    This function is called every time a mouse button is presesed.
    I use this function to handle click events mainly do that things can be clickable.

    This function is called by p5.js
*/

function mousePressed() {
    //Vote GUI Click
    if (voteGui.visible) {
        if (UtilFunctions.isTouching(createVector(400,750), createVector(200,50), createVector(mouseX, mouseY))) { //-1
            UtilFunctions.vote(voteGui.element, false, function() {
                UtilFunctions.updateElementsTable(elements, function(newElements, newCombinaions) {
                    elements = newElements;
                    combinations = newCombinations;
                });
            });
            voteGui.visible = false;
            return;
        }
        if (UtilFunctions.isTouching(createVector(600,750), createVector(200,50), createVector(mouseX, mouseY))) { //+1
            UtilFunctions.vote(voteGui.element, true, function() {
                UtilFunctions.updateElementsTable(elements, function(newElements, newCombinations) {
                    elements = newElements;
                    combinations = newCombinations;
                });
            });
            voteGui.visible = false;
            return;
        }
        if (UtilFunctions.isTouching(createVector(400,700), createVector(400,50), createVector(mouseX, mouseY))) {
            voteGui.visible = false;
            return;
        }
        return;
    }
    //Create GUI Click
    if (createGui.visible) {
        if (UtilFunctions.isTouching(createVector(400,100), createVector(400,50), createVector(mouseX, mouseY))) {
            let newName = prompt("Enter the new element's name", "");
            createGui.name = newName;
            return;
        }
        for (let i = 0; i <= 13; i++) {
            if (UtilFunctions.isTouching(createVector(((i%8)*50)+400, (Math.floor(i/8)*50)+150), createVector(50,50), createVector(mouseX, mouseY))) {
                createGui.selected = i+1;
                return;
            }
        }
        if (UtilFunctions.isTouching(createVector(400,700), createVector(400,50), createVector(mouseX, mouseY))) {
            createGui.visible = false;
            return;
        }
        if (UtilFunctions.isTouching(createVector(400,750), createVector(400,50), createVector(mouseX, mouseY))) {
            UtilFunctions.createElement(createGui.name, createGui.selected, colors.colorToInt(colors.getTextColor(colors.intToColor(createGui.selected))), createGui.element1.id, createGui.element2.id, function() {
                UtilFunctions.updateElementsTable(elements, function(newElements, newCombinations) {
                    elements = newElements;
                    combinations = newCombinations;
                });
            });
            createGui.visible = false;
            return;
        }
        return;
    }
    //Element Click
    for(i=0;i<elements.length; i++) {
        if (elements[i].unlocked != 0) {
            if (UtilFunctions.isTouching(elements[i].position, elements[i].size, createVector(mouseX, mouseY))) {
                elements[i].setStroke(colors.black);
                if (element1 == null) {
                    element1 = elements[i];
                } else {
                    UtilFunctions.attemptCombine(element1, elements[i], combinations, elements, createGui, function(element) {
                        if (element != null) {
                            element.unlocked = 1;
                            alert("Created " + element.name + " with " + element1.name + " and " + elements[i].name + "!")
                        }
                    });
                    element1 = null;
                }
            } else {
                if (elements[i] == element1) {
                    elements[i].setStroke(colors.green);
                } else {
                    elements[i].setStroke(colors.transparent);
                }
            }
        }
    }
}