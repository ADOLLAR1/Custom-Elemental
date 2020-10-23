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

let music = [];
let easter_egg;
let paused;
let track;

/*
    Load music files here. Also create the music array here
*/
function musicPreInit() {
    paused = false;
    easter_egg = createAudio('Assets/music006.ogg');
    music = [
        createAudio('Assets/music001.ogg'),
        createAudio('Assets/music002.ogg'),
        createAudio('Assets/music003.ogg'),
        createAudio('Assets/music004.ogg'),
        createAudio('Assets/music005.ogg')
    ];
}

/*
    Bind Track Events here and play the first song
*/

function musicInit() {
    button.remove();
    music.forEach(track => {
        track.onended(onTrackEnd);
    });
    easter_egg.onended(onTrackEnd);
    if (Math.floor(Math.random()*100) == 0)
    {
        easter_egg.play();
        track = easter_egg;
    } else {
        let index = Math.floor(Math.random() * music.length);
        music[index].play();
        track = music[index];
    }
    pause.style('display:inline');
    next.style('display:inline');
}

/*
    Called from Draw()
    So far no uses
*/

function musicTick() {

}

/*
    When a track ends play another one.
*/

function onTrackEnd(_track) {
    if (paused) paused = false;
    track.stop();
    if (Math.floor(Math.random()*100) == 0)
    {
        easter_egg.play();
        track = easter_egg;
    } else {
        let index = Math.floor(Math.random() * music.length);
        music[index].play();
        track = music[index];
    }
}

/*
    pause
*/

function pauseSong() {
    if (paused) {
        track.play();
        paused = false;
    } else {
        track.pause();
        paused = true;
    }
}

/*
    new song
*/

function newSong() {
    if (paused) paused = false;
    track.stop();
    let index = Math.floor(Math.random() * music.length);
    music[index].play();
    track = music[index];
}

/*
    Test Function
*/

function newSongTEST() {
    if (paused) paused = false;
    track.stop();
    easter_egg.play();
    track = easter_egg;
}