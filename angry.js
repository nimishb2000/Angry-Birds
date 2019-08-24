let ground;
var enemies=[];
const boxes = [];
var level = [];
level[0]=[
[1,1,2,1,2,1,1],
[1,2,1,2,1,2,1],
[1,1,1,1,1,1,1],
[1,0,1,0,1,0,1],
[1,2,1,2,1,2,1],
]
level[1] =[
[1,2,2,1,2,2,1],
[1,2,2,1,2,2,1],
[1,1,1,1,1,1,1],
[1,2,2,1,2,2,1],
[1,1,1,1,1,1,1],
]


let bird;

let world, engine;

let mConstraint;

let slingshot;


let dotImg;
let boxImg;

var button;
function preload() {
  dotImg = loadImage('https://i.ibb.co/ZT6HZp7/dot.png');

  boxImg = loadImage('https://i.ibb.co/rx9GWFD/equals.png');

  //bkgImg = loadImage('https://i.ibb.co/1qBVgLB/sky-Background.png');
}



function setup(){
    const canvas = createCanvas(windowWidth, windowHeight).position(0,0);

      engine = Engine.create();
    
      world = engine.world;
    button = createButton("Restart").position(0,0).mouseClicked(restart)
      ground = new Ground(width / 2, height - 10, width, 20);
    levels(1)
      bird = new Bird(50, height/2, 15);
      slingshot = new SlingShot(100, height-100, bird.body);


      const mouse = Mouse.create(canvas.elt);
    
      const options = {
    
        mouse: mouse,
    
      
    

}
}