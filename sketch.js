const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const MouseConstraint = Matter.MouseConstraint;
const Mouse = Matter.Mouse;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var mouseConstraint;
var sling1, sling2,sling3;
function preload() {
    sling1 = loadImage('sprites/sling1.png');
    sling2 = loadImage('sprites/sling2.png');
    sling3 = loadImage('sprites/sling3.png');
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
   //slingshot = new SlingShot(bird.body,{x:200, y:50});
    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();
    mouseConstraint = new MouseChain(bird.body,canvasmouse)
    
}

function draw(){
    
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
        text([mouseX,mouseY],mouseX,mouseY)
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    if(gameState ==="onSling"){
    Matter.Body.setPosition(bird.body,{x:200,y:50});
    }
    platform.display();
   
   //slingshot.display();    
   
   image(sling1,200,20);
   image(sling2,170,20);  
   mouseConstraint.display();
        
}

function mouseDragged(){
    
   // Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //var pointA = bird.body.position;
    console.log("in mOsuse Dragged");
    
}


function mouseReleased(){
console.log("In mouse released");
    mouseConstraint.fly();
    Matter.Body.applyForce(bird.body , bird.body.position, {x: 500 , y: 260})
    Matter.Body.setVelocity(bird.body, {x: random(10,20) , y: random(-10,-5)})
    console.log(bird.body);
            
    gameState = "launched";
}

function keyPressed(){
    if(bird.body.position.x>1200 || bird.body.position.y>400 || bird.body.position.x<0 || bird.body.position.y<0){
        bird.body.speed = 0;
    }

    if(keyCode === 32 && bird.body.speed < 1){
     console.log(bird.body.position);
      bird.trajectory = []  
      Matter.Body.setPosition(bird.body,{x:200,y:50});
      mouseConstraint.attach(bird.body); 
      gameState = "onSling";
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
   // console.log(hour);

    if(hour>=06 && hour<=19){
        
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    //console.log(backgroundImg);
}