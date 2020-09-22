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
            this.element = new Element(0, "NULL", colors.transparent, colors.transparent, colors.transparent, false, 0);
        }
        let name = this.name;
        
        CreateGui.drawRect([400,0,400,800,colors.black,colors.transparent]);
        fill(colors.white);
        textAlign(CENTER);
        textSize(32);
        text("Create Element", 400,0,400,50);
        text("+", 400, 50, 400, 50);
        textSize(12);
        this.element1.setStroke(colors.transparent);
        this.element2.setStroke(colors.transparent);
        this.element1.drawAtPos(createVector(400,50));
        this.element2.drawAtPos(createVector(750,50));
        textSize(32);
        CreateGui.drawRect([400,100,400,50,colors.gray, colors.transparent]);
        if (name == "" || name == null) {
            stroke(colors.transparent);
            fill(colors.dark_gray);
            text("Name | Click to edit", 400, 100, 400, 50);
        } else {
            stroke(colors.transparent);
            fill(colors.black);
            text(name, 400,100,400,50)
        }

        for (let i = 0; i <= 13; i++) {
            if (this.selected == i+1) {
                CreateGui.drawRect([((i%8)*50)+400, (Math.floor(i/8)*50)+150, 50, 50, colors.intToColor(i+1), colors.white]);
            } else {
                CreateGui.drawRect([((i%8)*50)+400, (Math.floor(i/8)*50)+150, 50, 50, colors.intToColor(i+1), colors.transparent]);
            }
        }
        if (name == null) name = "";
        if (this.selected == null) this.selected = 13;
        let color = colors.intToColor(this.selected);
        let textColor = colors.getTextColor(color);
        this.element.name = name;
        this.element.color = color;
        this.element.textColor = textColor;
        this.element.drawAtPos(createVector(575, 375));

        CreateGui.drawRect([400,700,400,50, colors.red, colors.transparent]);
        textSize(32);
        fill(colors.black);
        textAlign(CENTER);
        text("CANCEL", 400,700,400,50);

        CreateGui.drawRect([400,750,400,50, colors.green, colors.transparent]);
        textSize(32);
        fill(colors.black);
        textAlign(CENTER);
        text("CREATE", 400,750,400,50);

    }

    static drawRect(array) {
        stroke(array[5]);
        fill(array[4]);
        rect(array[0], array[1], array[2], array[3], 5);
    }
    
}