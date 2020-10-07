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

class Element {
    constructor(id, name, color, textColor, strokeColor, unlocked, votes, glow) {
        this.size = createVector(50,50);
        this.id = id;
        this.name = name;
        this.color = color;
        this.textColor = textColor;
        this.strokeColor = strokeColor
        this.position = createVector(-200,-200);
        this.unlocked = unlocked;
        this.votes = votes;
        if (glow == null) glow = 0;
        this.glow = glow;
        this.offset = 0;
        this.glowImg = glowImg

        if (this.name === "Magma" || this.name === "Lava") {
            this.glow = 1;
            this.glowImg = lavaOverlay;
        }
    }

    updateInfo() {
        if (this.name === "Magma" || this.name === "Lava") {
            this.glow = 1;
            this.glowImg = lavaOverlay;
        } else {
            this.glowImg = glowImg;
        }
    }

    setStroke(c) {
        this.strokeColor = c;
        return;
    }

    setPosition(v) {
        this.position = v;
        return;
    }

    draw() {
        if (this.unlocked !=0 && this.votes >= 10) {
            stroke(this.strokeColor);
            strokeWeight(2);
            fill(this.color);
            rect(this.position.x, this.position.y, this.size.x, this.size.y, 5);
            if(this.glow != 0) {
                imageMode(CORNER);
                image(this.glowImg, this.position.x, this.position.y, this.size.x, this.size.y, noise(this.offset)*500, noise(this.offset + 10)*500, this.size.x, this.size.y)
                imageMode(CENTER);
            }
            fill(this.textColor);
            noStroke();
            textAlign(CENTER);
            textSize(14);
            text(this.name, this.position.x, this.position.y, this.size.x, this.size.y);
        }
    }
    drawAtPos(pos) {
        if (true) {
            stroke(this.strokeColor);
            strokeWeight(2);
            fill(this.color);
            rect(pos.x, pos.y, this.size.x, this.size.y, 5);
            if(this.glow != 0) {
                imageMode(CORNER);
                image(this.glowImg, pos.x, pos.y, this.size.x, this.size.y, noise(this.offset)*500, noise(this.offset + 10)*500, this.size.x, this.size.y)
                imageMode(CENTER);
            }
            fill(this.textColor);
            noStroke();
            textAlign(CENTER);
            textSize(14);
            text(this.name, pos.x, pos.y, this.size.x, this.size.y);
        }
    }
    drawAtPosWithSize(pos, size) {
        if (true) {
            stroke(this.strokeColor);
            strokeWeight(2);
            fill(this.color);
            rect(pos.x, pos.y, size.x, size.y, 5);
            if(this.glow != 0) {
                imageMode(CORNER);
                image(this.glowImg, pos.x, pos.y, size.x, size.y, noise(this.offset)*500, noise(this.offset + 10)*500, size.x, size.y)
                imageMode(CENTER);
            }
            fill(this.textColor);
            noStroke();
            textAlign(CENTER);
            textSize(14);
            text(this.name, pos.x, pos.y, size.x, size.y);
        }
    }
}