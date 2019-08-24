document.getElementById('bird').addEventListener('mousedown', mouseDown);
window.addEventListener('mouseup', mouseUp);
function mouseUp(){
    window.removeEventListener('mousemove', divMove, true);
}
function mouseDown(){
  window.addEventListener('mousemove', divMove, true);
}
function getX(elmnt){
    for(var x=0; elmnt != null; x += elmnt.offsetLeft, elmnt = elmnt.offsetParent);
    return x;
}
function getY(elmnt){
    for (var y=0; elmnt != null; y += elmnt.offsetTop, elmnt = elmnt.offsetParent);
    return y;
}
function divMove(e){
    var new_x, new_y;
    var bird = document.getElementById('bird');
    var slingshot = document.getElementById('slingshot');
    var x = e.clientX - 25;
    var y = e.clientY - 25;
    var offsetX = getX(slingshot);
    var offsetY = getY(slingshot);
    if(x > offsetX){
        new_x = offsetX;
    }
    else if(offsetX - x < 125){
        new_x = x;
    }
    else{
        new_x = offsetX - 125;
    }
    if(y < offsetY){
        new_y = offsetY;
    }
    else if(y - offsetY < 50){
        new_y = y;
    }
    else{
        new_y = offsetY + 50;
    }
    console.log(offsetX, offsetY);
    bird.style.left = new_x + 'px';
    bird.style.top = new_y + 'px';
}