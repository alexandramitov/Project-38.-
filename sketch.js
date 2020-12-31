
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0;
var survivalTime = 0;
PLAY = 0;
END = 1;
var gameState = 0;



function preload()
{
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  backgroundImg = loadImage("jungle.jpg");
 
}



function setup() 
{
  createCanvas(displayWidth - 100, displayHeight -150);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  camera.position.x = displayWidth/2;
  camera.position.y = monkey.y;
  
  ground= createSprite(displayWidth/2 - 20,displayHeight/2 - 20,900,10);
  ground.velocityX = -4;
  console.log(ground.x);

  

  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() 
{
  background(backgroundImg);
  backgroundImg.scale = 0.2;
  
  ground.x = ground.width/2;
  
  monkey.collide(ground);
  
  if (keyDown("space"))
  {
    monkey.velocityY = -10;
  }  
  monkey.velocityY = monkey.velocityY + 0.8;

  if(gameState === 1){
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();

    fill("black");
    textSize(50);
    text("GAME OVER", displayWidth/2, displayHeight/2 - 30);
  }


  if(monkey.isTouching(obstacleGroup))
  {
    gameState = 1;
  }
  
  if(monkey.isTouching(bananaGroup))
  {
    score = score + 2;
  }


  
  spawnFoods();
  spawnObstacles();
  
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " +score,400,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime,100,50);
  
  
  drawSprites();
  
  
}

function spawnFoods()
{
  if (frameCount % 80 === 0)
  {
    var banana = createSprite(400,30,10,10);
    banana.scale = 0.1;
    banana.y = Math.round(random(displayWidth/2 - 300,displayHeight/2 - 325)); 
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.lifetime = -1;
    bananaGroup.add(banana);
  }  
}  


function spawnObstacles()
{
  if (frameCount % 300 === 0)
  {
   var obstacle = createSprite(displayWidth/2 - 20, displayHeight/2 - 61,20,20);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -5;
   obstacle.scale = 0.2;
   obstacle.lifetime = 500;
   obstacleGroup.add(obstacle);
  }
}  
