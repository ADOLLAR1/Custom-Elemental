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


const redColor = [255,0,0];
const orangeColor = [255,127,0];
const yellowColor = [255,255,0];
const greenColor = [0,255,0];
const aquaColor = [0,255,255];
const blueColor = [0,127,255];
const indigoColor = [0,0,255];
const purpleColor = [127,0,255];
const magentaColor = [255,0,255];
const blackColor = [0,0,0];
const whiteColor = [255,255,255];
const brownColor = [127,63,0];
const grayColor = [127,127,127];
const dark_grayColor = [63,63,63];
const transparentColor = [0,0,0,0];
let rainbowColor = [255,255,255];

let t = 0;

function intToColor(i) {
    switch(i) {
        case 1:
            return redColor;
        case 2:
            return orangeColor;
        case 3:
            return yellowColor;
        case 4:
            return greenColor;
        case 5:
            return aquaColor;
        case 6:
            return blueColor;
        case 7:
            return indigoColor;
        case 8:
            return purpleColor;
        case 9:
            return magentaColor;
        case 10:
            return blackColor;
        case 11:
            return whiteColor;
        case 12:
            return brownColor;
        case 13:
            return grayColor;
        case 14:
            return dark_grayColor;
        case 15: 
            return transparentColor;
        case 16:
            return rainbowColor;
    }
}

function colorToInt(c) {
    switch(c) {
        case redColor:
            return 1;
        case orangeColor:
            return 2;
        case yellowColor:
            return 3;
        case greenColor:
            return 4;
        case aquaColor:
            return 5;
        case blueColor:
            return 6;
        case indigoColor:
            return 7;
        case purpleColor:
            return 8;
        case magentaColor:
            return 9;
        case blackColor:
            return 10;
        case whiteColor:
            return 11;
        case brownColor:
            return 12;
        case grayColor:
            return 13;
        case dark_grayColor:
            return 14;
        case transparentColor:
            return 15;
        case rainbowColor:
            return 16;
    }
}

function getTextColor(c) {
    switch(c) {
        case redColor:
            return blackColor;
        case orangeColor:
            return blackColor;
        case yellowColor:
            return blackColor;
        case greenColor:
            return blackColor;
        case aquaColor:
            return blackColor;
        case blueColor:
            return blackColor;
        case indigoColor:
            return whiteColor;
        case purpleColor:
            return blackColor;
        case magentaColor:
            return blackColor;
        case blackColor:
            return whiteColor;
        case whiteColor:
            return blackColor;
        case brownColor:
            return whiteColor;
        case grayColor:
            return blackColor;
        case dark_grayColor:
            return whiteColor;
        case transparentColor:
            return blackColor;
        case rainbowColor:
            return blackColor;
    }
}

function updateRainbow() {
    t=t+0.5;
    t=t%360;
    rainbowColor = hslToRgb(t/360, 1, 0.5);
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}