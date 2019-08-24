"use strict";
function Bird_Launch(e){
    var bird = document.getElementById('bird');
    var new_x = e.clientX - 235;
    var new_y = e.clientY - 619;
    bird.style.left = new_x + 'px';
    bird.style.top = new_y + 'px';
}
function mouseDown(){
    window.addEventListener('mousemove', Bird_Launch, true);
}
function mouseUp(){
    window.removeEventListener('mousemove', Bird_Launch, true);
}
function gravity(){
    
}
document.getElementById('bird').addEventListener('mousedown', mouseDown);
window.addEventListener('mouseup', mouseUp);