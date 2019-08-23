

var myGamePiece;
var grav;
function startGame() {
    myGamePiece = new component(20, 20, "black",50,100);
    myGameArea.start();
    grav=document.getElementById("gr").value;
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = screen.width;
        this.canvas.height = screen.height/2.2;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,
        
 document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);        
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
     
    this.gravity = 0.001*document.getElementById("gr").value;
    this.angle=(document.getElementById("ang").value*(Math.PI)/180);
    this.gravitySpeed = 0;
    this.time=1;
    this.velocity=document.getElementById("vel").value*0.1;
    this.speedX=this.velocity*Math.cos(this.angle);
    
    this.speedY=this.velocity*Math.sin(this.angle)*-1;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        //console.log(this.gravity);
        this.x += this.speedX;
        this.y += this.speedY*this.time+(0.5)*this.gravitySpeed*(this.time)*(this.time); 
        this.time+=0.01;
           
    }
}
/*

gravity = 5; Angle = (45*(Math.PI)/180); velocity = 10; velocityx = velocity*Math.cos(Angle); velocityy = velocity*Math.sin(Angle)*-1; time = 0; distance = velocityx*time; inc = 0.5; x = 0; y = 300; radius = 10;
*/
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}