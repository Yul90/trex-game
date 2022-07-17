

var trex ,trex_running;
var cloud,cloudImg;
var obstacle1,obstacle1Img
var obstacle2,obstacle2Img
var obstacle3,obstacle3Img
var obstacle4,obstacle4Img
var obstacle5,obstacle5Img
var obstacle6,obstacle6Img
var PLAY = 1;
var END = 0;
var gameState = PLAY ;
var cloudGroup
var obstacleGroup
var score=0
var checkPoint
var die 
var jump
  


function preload(){
cloudImg=loadImage("cloud.png")
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
 trex_collided=loadAnimation("trex_collided.png")
floorImg=loadImage("ground2.png")
gameoverImg=loadImage("gameOver.png")
restartImg=loadImage("restart.png")
obstacle1Img=loadImage("obstacle1.png")
obstacle2Img=loadImage("obstacle2.png")
obstacle3Img=loadImage("obstacle3.png")
obstacle4Img=loadImage("obstacle4.png")
obstacle5Img=loadImage("obstacle5.png")
obstacle6Img=loadImage("obstacle6.png")
die = loadSound("die.mp3")
jump = loadSound("jump.mp3")
checkPoint = loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite

  trex = createSprite(40,100);
trex.addAnimation("trex",trex_running)
trex.addAnimation("collided",trex_collided)
trex.scale=0.45
//trex.debug = true


floor = createSprite(1,180,600,5);
floor.addImage("floor",floorImg)
//floor.debug = true

floor2 = createSprite(1,190,600,5)
floor2.visible = false
cloudGroup = createGroup()
obstacleGroup = createGroup()


gameover = createSprite(270,100,30,30)
gameover.addImage("gameover",gameoverImg)
gameover.scale = 0.5
gameover.visible = false

restart = createSprite(270,130,30,30)
restart.addImage("restart",restartImg)
restart.scale = 0.5
restart.visible = false
}


function draw(){
  
  
  background("white")

  text ("score " + score ,10,10)

  console.log(trex.y)

if(gameState===PLAY){
  floor.velocityX = -(5+3*score/1000);


score=score + Math.round(frameCount/60)
if(score>0 && score%250===0){
  checkPoint.play()
}


  if (keyDown("UP_ARROW") && trex.y>=160){

    trex.velocityY=-9
    jump.play()
   
  }
  trex.velocityY+=0.5;

  if (floor.x<0){
    floor.x=floor.width/2
  }

  GenerateObstacles()
  GenerateClouds()

if(obstacleGroup.isTouching(trex)){
  die.play()
  gameState = END
  //trex.velocityY=-12
  //jump.play()
}

}

else if(gameState===END){

floor.velocityX=0
trex.velocityY=0
cloudGroup.setVelocityXEach(0);
obstacleGroup.setVelocityXEach(0);

cloudGroup.setLifetimeEach(-1);
obstacleGroup.setLifetimeEach(-1);
trex.changeAnimation("collided",trex_collided)


gameover.visible = true

restart.visible = true
if(mousePressedOver(restart)){
reset()

}
}




  






  trex.collide(floor2)

  
  
 
  drawSprites()

}


function GenerateClouds(){
if(frameCount%50===0){
  cloud = createSprite(600,random(120,10),2,1)
  cloud.addImage(cloudImg)
  cloud.velocityX=-5
  cloud.scale=0.5
  cloud.depth=trex.depth
  trex.depth+=1
  cloud.lifetime=130
  cloudGroup.add(cloud)
}







}
function GenerateObstacles(){
if(frameCount%150===0){
obstacle = createSprite(600,160,1,3)
obstacle.scale=0.6
obstacle.velocityX = -(5+3*score/1000)
var rand=Math.round(random(1,6))
switch(rand){
  case 1: obstacle.addImage(obstacle1Img);
  break;
  case 2: obstacle.addImage(obstacle2Img);
  break;
  case 3: obstacle.addImage(obstacle3Img);
  break;
  case 4: obstacle.addImage(obstacle4Img);
  break;
  case 5: obstacle.addImage(obstacle5Img);
  break;
  case 6: obstacle.addImage(obstacle6Img);
  break;
  default:break
  
}
obstacle.lifetime=130
obstacleGroup.add(obstacle)
}








}

function reset(){
gameState=PLAY
obstacleGroup.destroyEach()
cloudGroup.destroyEach()
gameover.visible=false
restart.visible=false
score=0
trex.changeAnimation("trex",trex_running)


}