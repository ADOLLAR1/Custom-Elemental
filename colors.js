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

class colorTypes {
    
    constructor() {

        //DO NOT OVERWRITE THESE VALUES UNLESS IT IS BY HAND

        this.red = [255,0,0];
        this.orange = [255,127,0];
        this.yellow = [255,255,0];
        this.green = [0,255,0];
        this.aqua = [0,255,255];
        this.blue = [0,127,255];
        this.indigo = [0,0,255];
        this.purple = [127,0,255];
        this.magenta = [255,0,255];
        this.black = [0,0,0];
        this.white = [255,255,255];
        this.brown = [127,63,0];
        this.gray = [127,127,127];
        this.dark_gray = [63,63,63];
        this.transparent = [0,0,0,0];
    }

    intToColor(i) {
        switch(i) {
            case 1:
                return this.red;
            case 2:
                return this.orange;
            case 3:
                return this.yellow;
            case 4:
                return this.green;
            case 5:
                return this.aqua;
            case 6:
                return this.blue;
            case 7:
                return this.indigo;
            case 8:
                return this.purple;
            case 9:
                return this.magenta;
            case 10:
                return this.black;
            case 11:
                return this.white;
            case 12:
                return this.brown;
            case 13:
                return this.gray;
            case 14:
                return this.dark_gray;
            case 15: 
                return this.transparent;
        }
    }

    colorToInt(c) {
        switch(c) {
            case this.red:
                return 1;
            case this.orange:
                return 2;
            case this.yellow:
                return 3;
            case this.green:
                return 4;
            case this.aqua:
                return 5;
            case this.blue:
                return 6;
            case this.indigo:
                return 7;
            case this.purple:
                return 8;
            case this.magenta:
                return 9;
            case this.black:
                return 10;
            case this.white:
                return 11;
            case this.brown:
                return 12;
            case this.gray:
                return 13;
            case this.dark_gray:
                return 14;
            case this.transparent:
                return 15;
        }
    }

    getTextColor(c) {
        switch(c) {
            case this.red:
                return this.black;
            case this.orange:
                return this.black;
            case this.yellow:
                return this.black;
            case this.green:
                return this.black;
            case this.aqua:
                return this.black;
            case this.blue:
                return this.black;
            case this.indigo:
                return this.white;
            case this.purple:
                return this.black;
            case this.magenta:
                return this.black;
            case this.black:
                return this.white;
            case this.white:
                return this.black;
            case this.brown:
                return this.white;
            case this.gray:
                return this.black;
            case this.dark_gray:
                return this.white;
            case this.transparent:
                return this.black;
        }
    }

}