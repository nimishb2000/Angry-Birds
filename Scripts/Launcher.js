var disp, angle_deg, speed, height, angle, gravity_constant, new_x, new_y, range;
gravity_constant = 20;
var bird = document.getElementById('bird');
var slingshot = document.getElementById('slingshot');
bird.addEventListener('mousedown', mouseDown);
window.addEventListener('mouseup', mouseUp);
function mouseUp(){
    window.removeEventListener('mousemove', birdMove, true);
    launch();
}
function mouseDown(){
  window.addEventListener('mousemove', birdMove, true);
}
function birdMove(e){
    var x = e.clientX - 25;
    var y = e.clientY - 25;
    var offsetX = slingshot.offsetLeft
    var offsetY = slingshot.offsetTop;
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
    bird.style.left = new_x + 'px';
    bird.style.top = new_y + 'px';
    
    //Calculation for angle and displacement
    disp = Math.sqrt(Math.pow(offsetX - new_x, 2) + Math.pow(new_y - offsetY, 2));
    angle = Math.atan((new_y - offsetY)/(offsetX - new_x));
    angle_deg = angle * (180 / Math.PI);
}
function launch(){
    speed = Math.pow(disp, 2);
    var sin = Math.sin(angle);
    var sin_2 = Math.sin(angle * 2);
    height = (speed * Math.pow(sin, 2)) / (gravity_constant * 2);
    range = (speed * sin_2) / gravity_constant;
    console.log("height: ", height);
    console.log("range: ", range);
    
}