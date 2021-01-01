var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var survivalTime = 0, score = 0;
var ground;
var gameState = 1;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  ground = createSprite(300,500,1000,10);
  ground.velocityX = -8;
  
  monkey = createSprite(100,450,10,10);
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.1;
}


function draw() {
  background("white");
  
  if(gameState === 1) {
    survivalTime = Math.round(frameCount/frameRate());

    text("Survival time: " + survivalTime,300,300);
    text("score: " + score, 200,300);
    
    if(keyDown("space") && monkey.y >= 460) {
        monkey.velocityY = -15;
      }
    monkey.velocityY += 0.8;

    monkey.collide(ground);

    //console.log(monkey.y);  

    if (frameCount % 300 === 0) {
      drawObstacle();
    }
    if (frameCount % 80 === 0) {
      drawBanana();
    }
    
    if(monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score ++;
    }
    
    if(monkey.isTouching(obstacleGroup)) {
      gameState = 0;
    }
  }
  if(gameState === 0) {
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      monkey.velocityY = 0;
      
      obstacle.lifetime = -1;
      banana.lifetime = -1;
      
      text("Survival time: " + survivalTime,300,300);
      text("score: " + score, 200,300);
  }
  ground.x = ground.width/2
  
  drawSprites();
}

function drawBanana() {
  var rand = Math.round(random(350,450));
  banana = createSprite(670,rand,10,10);
  banana.addImage(bananaImage);
  banana.velocityX = -6;
  banana.scale = 0.1;
  banana.lifetime = 150;
  banana.debug = true;
  banana.setCollider("rectangle",0,0,550,230);
  bananaGroup.add(banana);
}

function drawObstacle() {
  obstacle = createSprite(650,470,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -6;
  obstacle.scale = 0.2;
  obstacle.lifetime = 150;
  obstacle.debug = true;
  obstacle.setCollider("circle",0,0,200);
  obstacleGroup.add(obstacle);
}