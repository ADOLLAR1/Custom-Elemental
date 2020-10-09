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

class CreateGui {
    constructor() {
        let visible = false;
        let name = "";
        let element1;
        let element2;
        let selected = 13;
        let element;
        let flag = false;
    }

    draw() {
        if (this.element == null) {
            this.element = new Element(0, "NULL", transparentColor, transparentColor, transparentColor, false, 0);
        }
        let name = this.name;
        
        CreateGui.drawRect([400,0,400,800,blackColor,transparentColor]);
        fill(whiteColor);
        textAlign(CENTER);
        textSize(32);
        text("Create Element", 400,0,400,50);
        text("+", 400, 50, 400, 50);
        textSize(12);
        this.element1.setStroke(transparentColor);
        this.element2.setStroke(transparentColor);
        this.element1.drawAtPos(createVector(400,50));
        this.element2.drawAtPos(createVector(750,50));
        textSize(32);
        CreateGui.drawRect([400,100,400,50,grayColor, transparentColor]);
        if (name == "" || name == null) {
            stroke(transparentColor);
            fill(dark_grayColor);
            text("Name | Click to edit", 400, 100, 400, 50);
        } else {
            stroke(transparentColor);
            fill(blackColor);
            text(name, 400,100,400,50)
        }

        for (let i = 0; i <= 13; i++) {
            if (this.selected == i+1) {
                CreateGui.drawRect([((i%8)*50)+400, (Math.floor(i/8)*50)+150, 50, 50, intToColor(i+1), whiteColor]);
            } else {
                CreateGui.drawRect([((i%8)*50)+400, (Math.floor(i/8)*50)+150, 50, 50, intToColor(i+1), transparentColor]);
            }
        }
        CreateGui.drawRect([400,250,400,50,purpleColor, transparentColor]);
        stroke(transparentColor);
        fill(blackColor);
        text("Glow", 400,250,400,50)
        if (name == null) name = "";
        if (this.selected == null) this.selected = 13;
        let color = intToColor(this.selected);
        let textColor = getTextColor(color);
        this.element.offset = this.element.offset + 0.0025;
        this.element.name = name;
        this.element.color = color;
        this.element.textColor = textColor;
        this.element.drawAtPos(createVector(575, 375));

        CreateGui.drawRect([400,700,400,50, redColor, transparentColor]);
        textSize(32);
        fill(blackColor);
        textAlign(CENTER);
        text("CANCEL", 400,700,400,50);

        CreateGui.drawRect([400,750,400,50, greenColor, transparentColor]);
        textSize(32);
        fill(blackColor);
        textAlign(CENTER);
        text("CREATE", 400,750,400,50);

    }

    static drawRect(array) {
        stroke(array[5]);
        fill(array[4]);
        rect(array[0], array[1], array[2], array[3], 5);
    }
    
}