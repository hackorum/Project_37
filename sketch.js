var monkey, monkeyanimation;

var  banana, bananaimg;

var rock, rockimg, rockgroup;

var bg, bgimg;

var score=0;

var invisibleground;

var invisibleline;

function preload(){

  monkeyanimation=loadAnimation("Monkey_01.png", "Monkey_10.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png");

  bgimg=loadImage("jungle.jpg");

  bananaimg=loadImage("banana.png");

  rockimg=loadImage("stone.png");

  bananagroup=new Group();

  rockgroup=new Group();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = 0;

  monkey=createSprite(300, height-150);
  monkey.addAnimation("monkeywalking", monkeyanimation);
  monkey.scale=0.1;

  invisibleground=createSprite(200,380,400,40);
  invisibleground.visible=0;

  invisibleline=createSprite(width/2, height - 100, width, 100);
  invisibleline.visible=0;

  fill("white");
  textSize(50);
  textAlign(CENTER);
}

function draw() {
  background(0);

  image(bgimg, bg, 0, width+width/2, height);
  bg-=10;

  if(keyDown("space") && monkey.y > 730){
    monkey.velocityY=-20;
  }

  for(var i=0; i<bananagroup.length; i++){
  if(monkey.isTouching(bananagroup)){
    score=score+1;
    bananagroup.get(i).destroy();
   }
  }

  camera.position.x = width/2;
  camera.position.y = height/2;



  if(bg<-width/2){
   bg=0;
  }

  if(monkey.isTouching(rockgroup)){
    monkey.scale=0.1;
  }

  switch(score){
    case 10 : monkey.scale=0.2;
    break;
    case 20 : monkey.scale=0.3;
    break;
    case 30 : monkey.scale=0.4;
    break;
    case 40 : monkey.scale=0.5;
    break;
    case 50 : monkey.scale=0.6;
    break;
    default:break;
  }

  monkey.velocityY=monkey.velocityY+0.8;

  monkey.collide(invisibleline);

  bananas();

  rocks();

  drawSprites();

  text("Score: "+score, width - 200, 50);
}

function bananas(){
  if(frameCount%80===0){
    banana=createSprite(width,random(height-500,height -200));
    banana.addImage(bananaimg);
    banana.scale=0.05;
    banana.velocityX=-5;
    banana.lifetime=width/5;
    bananagroup.add(banana);
  }
}

function rocks(){
 if(frameCount%350===0){
   rock=createSprite(width,height-200);
   rock.addImage(rockimg);
   rock.scale=0.17;
   rock.velocityX=-5;
   rock.lifetime=width/5;
   rockgroup.add(rock);
 }
}
