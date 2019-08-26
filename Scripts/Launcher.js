var count=1;
var speed, angle, new_x, new_y, offsetX, offsetY, i, j, bricks_left = 9, bird, slingshot, bricks;
window.onload = bird_launch;
function bird_launch(){
    if(count <= 12){
        bird = document.getElementById('bird'+count);
        slingshot = document.getElementById('slingshot');
        bricks = document.getElementById('brick1');
        bird.addEventListener('mousedown', mouseDown);
        window.addEventListener('mouseup', mouseUp);
    }
    else{
        alert("Game Over!");
    }
}
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
    speed = Math.sqrt(Math.pow(offsetX - new_x, 2) + Math.pow(new_y - offsetY, 2));
    angle = Math.atan((new_y - offsetY)/(offsetX - new_x));
    if(isNaN(speed)){
        return;
    }
    var cos = Math.cos(angle);
    parabola = setInterval(move, 5);
    var orig_y = bird.offsetTop;
    function move(){
        var x = bird.offsetLeft;
        x+=5;
        var y = (x * Math.tan(angle)) - (5 * (x * x)/(2 * Math.pow(speed * cos, 2)));
        bird.style.left = x + 'px';
        bird.style.top = (orig_y - y) + 'px';
        if(x>=1920 || bird.offsetTop >= 1080){
            clearInterval(parabola);
            create_bird();
        }
        check_collision();
    }
}
function check_collision(){
    if(bird.offsetLeft + 50 >= bricks.offsetLeft && bird.offsetLeft + 50 <= bricks.offsetLeft + 100){
        var destroy = 0;
        for(i=1; i<=9; i++){
            var id_brick = "brick"+i;
            var brick_check = document.getElementById(id_brick);
            var birdTop = bird.offsetTop;
            if(birdTop + 26.5 > brick_check.offsetTop && birdTop + 26.5 <= brick_check.offsetTop + 45){
                brick_check.style.display = 'none';
                clearInterval(parabola);
                remove_bird();
                setTimeout(create_bird, 500);
                destroy = 1;
                j = i;
                bricks_left--;
                break;
            }
        }
        if(bricks_left == 0){
            alert("You Won!");
        }
        if(destroy == 1){
            setTimeout(shift_bricks, 100);
        }
    }
}
function shift_bricks(){
    for(i=j+1; i<=9; i++){
        var brick_id = "brick"+i;
        var brick = document.getElementById(brick_id);
        var brick_top = brick.offsetTop;
        brick.style.top = (brick_top + 45) + 'px';
    }
}
function remove_bird(){
    bird.remove();
}
function create_bird(){
    count++;
    var bird_new = document.createElement('div');
    bird_new.id = 'bird'+count;
    console.log('bird'+count);
    var body = document.getElementById('background');
    body.appendChild(bird_new);
    bird_launch();
}