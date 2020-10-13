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

class VoteGui {
    constructor() {
        let visible = false;
        let element;
    }

    draw() {//Draw the GUI
        if (this.element == null) {
            this.element = new Element(0, "NULL", transparentColor, transparentColor, transparentColor, false, 0);
        }
        let name = this.name;
        
        VoteGui.drawRect([400,0,400,800,blackColor,transparentColor]);
        fill(whiteColor);
        textAlign(CENTER);
        textSize(32);
        text("Vote", 400,0,400,50);
        textSize(16);
        text("Votes: " + this.element.votes, 400,100,400,50);
        textSize(32);
        this.element.drawAtPos(createVector(575, 375));

        CreateGui.drawRect([400,700,400,50, redColor, transparentColor]);
        textSize(32);
        fill(blackColor);
        textAlign(CENTER);
        text("CANCEL", 400,700,400,50);

        VoteGui.drawRect([400,750,200,50, redColor, transparentColor]);
        textSize(32);
        fill(blackColor);
        textAlign(CENTER);
        text("-1", 400,750,200,50);

        VoteGui.drawRect([600,750,200,50, greenColor, transparentColor]);
        textSize(32);
        fill(blackColor);
        textAlign(CENTER);
        text("+1", 600,750,200,50);

    }

    static drawRect(array) {//Helper method
        stroke(array[5]);
        fill(array[4]);
        rect(array[0], array[1], array[2], array[3], 5);
    }
    
}