

var block_pos = 400;
var bird_pos = 8;
var bird_resolution = 0.02;

const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;
let start = false;

let ground;
var enemies=[];
const boxes = [];
//Levels
var level = [];
//level 1
level[0]=[
[1,1,2,1,2,1,1],
[1,2,1,2,1,2,1],
[1,1,1,1,1,1,1],
[1,0,1,0,1,0,1],
[1,2,1,2,1,2,1],
]
//level2
level[1] =[
[1,2,2,1,2,2,1],
[1,2,2,1,2,2,1],
[1,1,1,1,1,1,1],
[1,2,2,1,2,2,1],
[1,1,1,1,1,1,1],
]
//level 3
level[2] =[
[1,2,2,1,2,2,1,1],
[1,2,2,1,2,2,1,1],
[1,2,2,1,2,2,1,1],
[1,2,2,1,2,2,1,1],
[1,2,2,1,2,2,1,1],
[1,1,1,1,1,1,1,1],
]

//level 4

level[3] =[
[1,1,2,2,1,2,2,1,1],
[1,1,2,2,1,2,2,1,1],
[1,1,2,2,1,2,2,1,1],
[1,1,2,2,1,2,2,1,1],
[1,1,1,1,1,1,1,1,1],
]

let bird;
//matter.js
let world, engine;
var level_no =0;
let mConstraint;
/*https://i.ibb.co/J7CbDS5/584c68cc6e7d5809d2fa635c.png
https://i.ibb.co/2Y2b8yZ/584c69846e7d5809d2fa6366.png*/
let slingshot;
var score=0;
//images variable
let dotImg;
var stick ;
let boxImg;
var enemy_img;
let bkgImg;
var bg ;
var button,button1;
//preload function for loading images
function preload() {
  dotImg = loadImage('https://i.ibb.co/2Y2b8yZ/584c69846e7d5809d2fa6366.png');

  boxImg = loadImage('https://i.ibb.co/rx9GWFD/equals.png');

//  stick = loadImage('https://i.ibb.co/J7CbDS5/584c68cc6e7d5809d2fa635c.png');
enemy_img=loadImage("https://i.ibb.co/tPCKZzL/Angry-Birds-Pig-128x128.png");
bg =loadImage("https://i.ibb.co/M2nfjMG/background-angry-birds-classic-title-screen-by-nikitabirds-d63ystt-pre.png");

}
//target to be commpleted 
var target=100;
//time
var timer =60;
//setuo function 
function setup() {
//creating a canvas
  const canvas = createCanvas(windowWidth, windowHeight).position(0,0);
//creating matter.js engine
  engine = Engine.create();
start = true;
//matter js world
  world = engine.world;
alert("You have to score 100 for clear 1st level \n the target is increase by 50 as you clear the levels \n well there are only 2 levels")
// restart button
button = createButton("Restart").position(width/2-50,height/2-50).mouseClicked(restart).hide()
//next level
button1 = createButton("Next Level").position(width/2-50,height/2-50).mouseClicked(nextLevel).hide();
  ground = new Ground(width / 2, height - 10, width, 20);
//setting up level 0
levels(level_no)
  //bird  
  bird = new Bird(bird_pos, height-100, 25);
//slignshot for shooting bird

  slingshot = new SlingShot(80, height-100, bird.body);

// creating a mouse 
  const mouse = Mouse.create(canvas.elt);

  const options = {

    mouse: mouse,

  }


  

  mouse.pixelRatio = pixelDensity();

  mConstraint = MouseConstraint.create(engine, options);

  World.add(world, mConstraint);
setInterval(()=>{
 timer--   
},1000)
}

//
function restart() {

  
button.hide();

frameRate(9000);
//remove bird, enemies and boxes from canvas
    World.remove(world, bird.body);
for(let i in enemies){
    World.remove(world,enemies[i].body);
    }
    for(let i in boxes){
    World.remove(world,boxes[i].body)
    }
    bird = new Bird(bird_pos, height-100, 25);
score=0;
timer=60;
target=100;
level_no =0;
//clean the enemies and boxes   
enemies.splice(0,enemies.length)
boxes.splice(0,boxes.length)
//again setup levels
  levels(level_no);  
//attach slignshot to bird
setTimeout(()=>{
   slingshot.attach(bird.body)
},200);
}


function mouseReleased() {
//Shot the bird when mouse is released n after 2 sec the bird come 
if(start){
  setTimeout(() => {

    slingshot.fly();
 setTimeout(()=>{
 World.remove(world, bird.body);
    bird = new Bird(bird_pos, height-100, 25);
    slingshot.attach(bird.body)
 },6000)
  }, 100);
}
}


function draw() {

  background(0);
image(bg,-50,-50,width+100,height+100)
textAlign(CENTER);
//time,scores and level
textSize(20)
var lev = level_no +1;
text("Time : "+timer,50,20);
text("Score : "+score,width/2,20)
text("Level : "+lev,width-50,20)
//update the matter engine
  Matter.Engine.update(engine);
//ground
  ground.show();
//boxes
  for (let box of boxes) {

    box.show();

  }
//enemies
for(let e of enemies){
    e.show();
}
//slignshot
  slingshot.show();
//angry bird
  bird.show();
//if bird hits the Enemy  
for(let e in enemies){
   if(enemies[e].pos.x>block_pos +200){
       enemies.splice(e,1)
       score+=10;
   }
}
for(let e in boxes){
   if(boxes[e].pos.x>block_pos +200){
       boxes.splice(e,1)
       score+=10;
   }
}

if(score>=target){
  setTimeout(()=>{ 
    frameRate(0);
    background(200);
  
    textAlign (CENTER)
    textSize (20)
    fill("blue")
    text("Level "+lev+" Completed!!",width/2,height/2+100);
button1.show();
},100);
}
if(timer ==0&&score<target){
    frameRate(0);
    background(200);
    button.show();
    textAlign(CENTER);
    textSize(20);99
    fill("lightgreen")
    text("Score : "+score,width/2,height/2);
    textSize(50);
    fill("lightblue")
    text("You Failed",width/2,height/2+50)
}

}



class SlingShot {

  constructor(x, y, body) {


    const options = {

      pointA: {

        x: x,

        y: y

      },

      bodyB: body,

      stiffness: 0.02,

      length: 25

    }

    this.sling = Constraint.create(options);

    World.add(world, this.sling);

  }


  fly() {

    

    this.sling.bodyB = null;

  }


  show() {

    if (this.sling.bodyB) {

      stroke(0);

      strokeWeight(2);

      const posA = this.sling.pointA;

      const posB = this.sling.bodyB.position;
   
      line(posA.x, posA.y, posB.x, posB.y);
//   image(stick,posA.x,posA.y,50,100)
    }

  }

  

  attach(body) {

    this.sling.bodyB = body; 

  }



}



class Box {

  

  constructor(x, y, w, h) {

    const options = {

      restitution: 0.9

    } 

    this.body = Matter.Bodies.rectangle(x, y, w, h, options);

    Matter.World.add(world, this.body);

    this.w = w;

    this.h = h;
this.pos=createVector(0,0);
  }

  

  show() {

    this.pos = this.body.position;

    const angle = this.body.angle;

    push();

    translate(this.pos.x, this.pos.y);

    rotate(angle);

    fill(255);

    rectMode(CENTER);

    imageMode(CENTER);

    image(boxImg, 0, 0, this.w, this.h);

    pop(); 

  }

  

}
class Bird {


  constructor(x, y, r) {

    const options = {

      restitution: bird_resolution

    }

    this.body = Matter.Bodies.circle(x, y, r, options);

    Matter.Body.setMass(this.body, this.body.mass);

    Matter.World.add(world, this.body);

    this.r = r;

  }


  show() {

    const pos = this.body.position;

    const angle = this.body.angle;

    push();

    translate(pos.x, pos.y);

    rotate(angle);

    imageMode(CENTER);

    image(dotImg, 0, 0, this.r , this.r );

    pop();


  }

}

class Ground extends Box{


  constructor(x, y, w, h) {

    super(x, y, w, h);

    this.body.isStatic = true;

  }


  show() {

    const pos = this.body.position;

    const angle = this.body.angle;

    push();

    translate(pos.x, pos.y);

    rotate(angle);

    noStroke();

    fill(255);

    rectMode(CENTER);

    rect(0, 0, this.w, this.h);

    pop();

  }


}
class Enemy{

  

  constructor(x, y, w, h) {

    const options = {

      restitution: 0.5

    } 

    this.body = Matter.Bodies.rectangle(x, y, w, h, options);

    Matter.World.add(world, this.body);

    this.w = w;

    this.h = h;
   this.pos =createVector(0,0);
   
  }

  

  show() {

    this.pos = this.body.position;

    const angle = this.body.angle;

    push();

    translate(this.pos.x, this.pos.y);

    rotate(angle);

   // fill("lightgreen");

   // ellipseMode(CENTER);

    imageMode(CENTER);

    image(enemy_img , 0, 0, this.w, this.h);

    pop(); 

  }

  

}



function levels(n){
    var maps = level[n];
  for (let i = 0; i < maps.length; i++) {
for (let j = 0; j < maps[i].length; j++) {
 if(maps[i][j]==1){
    boxes.push(new Box(j*20+block_pos, i*20+height-i*20*3, 20, 20));
}
else if(maps[i][j]==2){
    enemies.push(new Enemy(j*20+block_pos, i*20+height-i*20*3, 20, 20));
}
  }
}
}

function nextLevel(){
button1.hide();

if(level_no<3){
  frameRate(9000)  

    World.remove(world, bird.body);
for(let i in enemies){
    World.remove(world,enemies[i].body);
    }
    for(let i in boxes){
    World.remove(world,boxes[i].body)
    }
    bird = new Bird(bird_pos, height-100, 25);
target+=50;
   score=0;
level_no+=1;
timer=60;
enemies.splice(0,enemies.length)
boxes.splice(0,boxes.length)
  levels(level_no)  
setTimeout(()=>{
   slingshot.attach(bird.body)
},200);
}
else{
    alert("Congratulations\nYou've completed all the levels");
    button.show()
}
}