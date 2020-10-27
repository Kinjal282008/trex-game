var trex,trexIMG,PLAY,END,gameState,invisibleGround,ground,groundImg;
var cloudImg,cloudGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,trexCollided;
var obstacleGroup,score,trex2;
var gameOver,restart,restartImg,gameOverImg;
var chekPointSound,dieSound,jumpSound;
function preload() {
trexImg=loadAnimation ("trex1.png","trex3.png","trex4.png");
groundImg=loadImage ("ground2.png");
cloudImg=loadImage("cloud.png");
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
trexCollided=loadImage("trex_collided.png");
gameOverImg=loadImage("gameOver.png");
restartImg=loadImage("restart.png");
checkPointSound=loadSound("checkPoint.mp3");
dieSound=loadSound("die.mp3");
jumpSound=loadSound("jump.mp3");
}

function setup() {
  createCanvas(1000, 250);
  
  trex= createSprite(40,230,20,20);
  trex.addAnimation("trexA",trexImg);
  trex.scale=0.4;
  
  ground = createSprite(500,230,1000,5);
  ground.addImage (groundImg);
  ground.x=ground.width/2;
  ground.scale = 1
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  invisibleGround= createSprite(500,245,1000,5)
  invisibleGround.visible= false
  
  gameOver=createSprite(300,120);
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.4;
  gameOver.visible=false
  
  restart=createSprite(300,150);
  restart.addImage(restartImg)
  restart.scale=0.4;
  restart.visible=false
  
  trex2=createSprite(40,224,20,20);
  trex2.addImage(trexCollided);
  trex2.scale=0.4;
  trex2.visible=false;
  
  PLAY=0;
  END=1;
  gameState=PLAY;
  score=0;
}

function draw() {
  background(180);
  drawSprites();
  
  if (gameState===PLAY) {
    
    gameOver.visible=false;
    restart.visible=false;
    trex2.visible=false;
    
    ground.velocityX=-(6+3*score/100);
    
  cloud1();
  spwanObstacle();
    
    score=score+Math.round(getFrameRate()/60);
    
    textSize(18);
    text("score"+score,100,100)
    
   if (ground.x<0) {
     ground.x=ground.width/2;
   }
    
    ground.velocityX = -4;
    
    if (keyDown("space")&&trex.y>200) {
      trex.velocityY= -12;
      jumpSound.play();
    }
    
    trex.velocityY=trex.velocityY+0.8
    
    trex.collide(invisibleGround)
    
    if(obstacleGroup.isTouching(trex)){
       dieSound.play();
      gameState=END
       }
     
    if(score>0&&score%100===0){
      checkPointSound.play();
    }
  }else if(gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  trex.velocityY=0;
  ground.velocityX=0;
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  cloudGroup.setLifetimeEach(-1);
  cloudGroup.setVelocityXEach(0);
  trex.visible=false
  trex2.visible=true 
  if(mousePressedOver(restart)){
    reset();
    trex2.visible=false;
    trex.visible=true;                
  }
  }
}
function cloud1(){
  if(frameCount%60===0){
  var cloud = createSprite(1000,10,30,30);
  cloud.y=Math.round(random(110,150))
  cloud.addImage(cloudImg)
  cloud.velocityX=-3
  cloud.scale=0.6
  cloud.lifetime=333
  cloud.depth=trex.depth
  trex.depth=trex.depth+1
  cloudGroup.add(cloud)
  }
  }
function spwanObstacle(){
    if(frameCount%60===0){
      var obstacle = createSprite(1000,225,10,10);
      obstacle.scale = 0.4
      obstacle.lifetime=333
      obstacle.velocityX=-(6+3*score/100);
      var obs = Math.round(random(1,6));
      // obstacle.setAnimation("obstacle"+obs)
      switch(obs){
        case 1: obstacle.addImage(obstacle1);
          break;
          
          case 2: obstacle.addImage(obstacle2);
          break;
          
          case 3: obstacle.addImage(obstacle3);
          break;
          
          case 4: obstacle.addImage(obstacle4);
          break;
          
          case 5: obstacle.addImage(obstacle5);
          break;
          
          case 6: obstacle.addImage(obstacle6);
          break;
          
          default:  obstacle.addImage(obstacle1)
      }
      obstacle.debug=true
      obstacleGroup.add(obstacle)
      obstacleGroup.setColliderEach("rectangle",10,10,100,20)
    }
  }
function reset(){
  gameState=PLAY
  obstacleGroup.destroyEach()
  cloudGroup.destroyEach()
  score=0
  trex.visibile=true
}