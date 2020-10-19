var monkey , monkey_running;
var banana ,bananaImage,bananaEaten,bananasGroup, obstacle, obstacleImage, obstacleGroup;
var score;
var ground, groundImage;

var gameOver, gameOverImage, restart, restartImage;

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("ground1.png");
  
  gameOverImage=loadImage("gameover0.png");
  restartImage=loadImage("restart0.png");
 
}



function setup() {
  createCanvas(400,400);
  ground=createSprite(200,360,700,15);
  ground.addImage("ground", groundImage)
  
    
  monkey=createSprite(30,330,25,15);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  score=0;
  bananaEaten=0;
  
  bananasGroup=new Group();
  obstacleGroup=new Group();
  
   gameOver=createSprite(200, 100, 2 ,2);
    gameOver.addImage("gameOver", gameOverImage);
    gameOver.visible = false;
    restart=createSprite(200, 300, 2, 2);
    restart.addImage("restart", restartImage);
  restart.visible = false;
}

function draw() {
background("white");
  
  if(gameState===PLAY){
    
    ground.velocityX=-4;
    
   if(keyDown("space") && monkey.y>=308){
    monkey.velocityY=-16;
  }
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(bananasGroup.isTouching(monkey)){
    bananaEaten=bananaEaten+1;
    bananasGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
 
    monkey.velocityY = monkey.velocityY+0.8;
    score=score+(frameCount%20===0);
  
  spawnBananas();
  spawnObstacles();
}
  
  else if (gameState===END){
    gameOver.visible = true;
     restart.visible = true;
    bananasGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX=0;
    
    bananasGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
   
    
    monkey.velocityY=0;
    
if(mousePressedOver(restart)){
      reset();
  //gameOver.visible=false;
    //restart.visible=false;
}
    }
   
    monkey.collide(ground);
  
  drawSprites();
  
  textSize(20);
  text("Survival Time: "+score, 120,30);
  text("Bananas Eaten: "+bananaEaten, 110, 60);
  
  }

function reset(){
    gameState=PLAY;
    score=0;
    bananaEaten=0;
    obstacleGroup.destroyEach();
    bananasGroup.destroyEach();
    gameOver.visible=false;
    restart.visible=false;
}

function spawnBananas(){
  if(frameCount % 120===0){
    banana=createSprite(410, 233, 2 ,2);
    banana.addImage("banana", bananaImage);
    banana.velocityX=-4;
    banana.scale=0.1;
    bananasGroup.add(banana);
    banana.y=Math.round(random(233, 164));
  }
}

function spawnObstacles(){
  if(frameCount % 270===0){
    obstacle=createSprite(410, 330, 2, 2);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.velocityX=-4;
    obstacle.scale=0.1;
    obstacleGroup.add(obstacle);
  }
}
