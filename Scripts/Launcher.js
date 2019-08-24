"use strict";
document.getElementById('bird').addEventListener('mousedown', mouseDown);
window.addEventListener('mouseup', mouseUp);
function mouseDown(){
    window.addEventListener('mousemove', divMove, true);
}
function mouseUp(){
    window.removeEventListener('mousemove', divMove, true);
}
function divMove(e){
    var bird = document.getElementById('bird');
    var new_x = e.clientX - 25;
    var new_y = e.clientY - 25;
    bird.style.marginLeft = new_x + 'px';
    bird.style.marginTop = new_y + 'px';
}
function gravity(){
    
}