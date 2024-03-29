var count=1;    //For Bird Limit
var angle, new_x, new_y, offsetX, offsetY, i, j, bricks_left = 9, bird, slingshot, bricks, time_left = 60, x=0;
var margin = document.getElementById('brick1').offsetLeft;
window.onload = bird_launch;
function bird_launch(){
    if(count <= 12){        //12 is maximum number of birds
        bird = document.getElementById('bird'+count);
        slingshot = document.getElementById('slingshot');
        bird.addEventListener('mousedown', mouseDown);
    }
    else{
        location.assign('../HTML/Game Over.html');
    }
}
function mouseUp(){
    var audio = new Audio('../Sounds/Bird%20Launch.mp3');
    audio.play();
    window.removeEventListener('mousemove', birdMove, true);
    calculations();
}
function mouseDown(){
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mousemove', birdMove, true);
    if(x == 0){     //For starting the Timer
        x=1;
        timer();
    }
}
function birdMove(e){
    var x = e.clientX - 25;     //Gets Coordinate of mouse
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
    speed = Math.sqrt(Math.pow(offsetX - new_x, 2) + Math.pow(new_y - offsetY, 2));
    angle = Math.atan((new_y - offsetY)/(offsetX - new_x));
    if(isNaN(speed)){
        return;
    }
    var cos = Math.cos(angle);
    var orig_y = bird.offsetTop;        //Initial top margin
    var x = bird.offsetLeft;            //Initial left margin
    parabola = setInterval(move, 5);
    function move(){
        var y = (x * Math.tan(angle)) - (5 * (x * x)/(2 * Math.pow(speed * cos, 2)));   //Equation of projectile motion
        bird.style.left = x + 'px';
        bird.style.top = (orig_y - y) + 'px';
        if(x>=1920 || bird.offsetTop >= 1080){
            clearInterval(parabola);
            create_bird();
        }
        check_collision();
        x+=5;
    }
}
function check_collision(){
    if(bird.offsetLeft + 50 >= margin && bird.offsetLeft + 50 <= margin + 100){           //+100 for right
        var destroy = 0;
        for(i=1; i<=9; i++){
            var brick_check = document.getElementById("brick"+i);
            var birdTop = bird.offsetTop;
            if(birdTop + 26.5 > brick_check.offsetTop && birdTop + 26.5 <= brick_check.offsetTop + 45){         //+45 for bottom
                var audio = new Audio('../Sounds/Brick%20Break.mp3');
                audio.play();
                brick_check.style.display = 'none';
                clearInterval(parabola);
                bird.remove();
                setTimeout(create_bird, 1000);
                destroy = 1;
                j = i;
                bricks_left--;
                break;
            }
        }
        if(bricks_left == 0){
            location.assign('../HTML/You Win.html');
        }
        if(destroy == 1){
            setTimeout(shift_bricks, 100);
        }
    }
}
function shift_bricks(){
    for(i=j+1; i<=9; i++){
        var brick = document.getElementById("brick"+i);
        var brick_top = brick.offsetTop;
        brick.style.top = (brick_top + 45) + 'px';
    }
}
function create_bird(){
    count++;
    var audio = new Audio('../Sounds/Bird%20Load.mp3');
    audio.play();
    var bird_new = document.createElement('div');
    bird_new.id = 'bird'+count;
    var body = document.getElementById('background');
    body.appendChild(bird_new);
    reduce_bird(count);
    bird_launch();
}
function reduce_bird(y){
    var p = document.getElementById('limit');
    p.innerHTML = 'Birds Left: ' + (12-y);
}
function timer(){
    var p = document.getElementById('timer');
    var time = setInterval(function (){
        p.innerHTML = 'Time Left: ' + (time_left--) + 's';
        if(time_left == -1){
            clearInterval(time);
            location.assign('../HTML/Game Over.html');
        }
    }, 1000);
}