window.onload = addListeners;
function addListeners(){
    document.getElementById('bird').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);
}
function mouseUp(){
    window.removeEventListener('mousemove', divMove, true);
}
function mouseDown(e){
  window.addEventListener('mousemove', divMove, true);
}
function divMove(e){
    var div = document.getElementById('bird');
    div.style.position = 'absolute';
    div.style.top = (e.clientY - 175) + 'px';
    div.style.left = (e.clientX - 175) + 'px';
}