var disp, speed, height, angle, new_x, new_y, range, offsetX, offsetY;
var bird = document.getElementById('bird');
var slingshot = document.getElementById('slingshot');
var blocks = document.getElementById('blocks');
bird.addEventListener('mousedown', mouseDown);
window.addEventListener('mouseup', mouseUp);
function mouseUp(){
    window.removeEventListener('mousemove', birdMove, true);
    calculations();
}
function mouseDown(){
  window.addEventListener('mousemove', birdMove, true);
}
function birdMove(e){
    var x = e.clientX - 25;
    var y = e.clientY - 25;
    offsetX = slingshot.offsetLeft;
    offsetY = slingshot.offsetTop;
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
}
function calculations(){
    disp = Math.sqrt(Math.pow(offsetX - new_x, 2) + Math.pow(new_y - offsetY, 2));
    angle = Math.atan((new_y - offsetY)/(offsetX - new_x));
    speed = disp;
    var sin = Math.sin(angle);
    var sin_2 = Math.sin(2 * angle);
    if(bird.style.top === "575px"){
        range = speed * Math.sqrt(20);
    }
    else{
        range = (Math.pow(speed, 2) * sin_2)/5;
    }
    height = (Math.pow(speed * sin, 2))/10;
    var y1, y2;
    y1 = y2 = bird.offsetTop;
    console.log(y1);
    console.log(height);
    parabola = setInterval(move, 5);
    function move(){
        var x = bird.offsetLeft;
        var y = bird.offsetTop;
        x+=4;
        var limit = blocks.offsetLeft;
        if(angle*(180/Math.PI) == 90){
            x-=4;
        }
        else if(x + 49 >= limit){
            clearInterval(parabola);
        }
        else{
            bird.style.left = x + 'px';
        }
        if(angle == 0){
            y += 1;
            bird.style.top = y + 'px';
        }
        else{
            if(y1 > height){
                y1 -= 3;
                bird.style.top = y1 + 'px';
                y2 = y1;
            }
            else{
                y2 += 3;
                bird.style.top = y2 + 'px';
            }
        }
    }
}