//naming the objects
var jungle, jungleImage;
var monkey , monkey_running, monkey_collided;
var FoodGroup, obstacleGroup;
var banana ,bananaImage, obstacle, obstacleImage;
var Invisibleground;
var Score = 0;
var PLAY = 1;
var END = 0;
var gameState = 1;
  
function preload(){
//loading the Images
  jungleImage = loadImage("jungle.jpg");
   
  monkey_running =loadAnimation("Monkey_01.png","Monkey_02.png",
  "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png",
  "Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkey_collided = loadAnimation("Monkey_05.png");
  
}

function setup(){
  createCanvas(displayWidth,displayHeight);
//creating the background
  jungle = createSprite(displayWidth/2,10,displayWidth,displayHeight);
  jungle.addImage(jungleImage);
  jungle.scale = 2.3;
  jungle.x = jungle.width/2;

//creating the monkey
  monkey = createSprite(0,340,20,50);
  monkey.scale = 0.3;
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collided",monkey_collided);

//greating the Invisibleground
  Invisibleground = createSprite(200,450,900,7);
  Invisibleground.visible = false;

//naming the group
  FoodGroup = new Group();
  obstacleGroup = new Group(); 
  
} 

function draw(){
  camera.position.x = monkey.x;
  camera.position.y = monkey.y;
//setting the background black
    background("black"); 

//writing the function for the playState
   if(gameState == PLAY){ 
     
      //when the space is pressed and the monkey is on the ground only it should jump
      if( keyDown("space") && monkey.y >= 300){
         monkey.velocityY = -15;
       }
        //setting the gravity
        monkey.velocityY = monkey.velocityY + 0.5;
        //making the monkey touch the invisibleground
        monkey.collide(Invisibleground);

      //reseting the background
      if(jungle.x<0){
        jungle.x = jungle.width/2;
      }
  
     //giving the background a velocity X
     jungle.velocityX = -5;
     
     //destroying the bananas when it touches the monkey and increasing the score
      if(FoodGroup.isTouching(monkey)){
         FoodGroup.destroyEach();
         Score = Score+5;
      }

      //increasing the monkeys size in each case
      switch(Score){
        case 10: monkey.scale=0.32;
                break;
        case 20: monkey.scale=0.34;
                break;
        case 30: monkey.scale=0.36;
                break;
        case 40: monkey.scale=0.38;
                break;
        default: break;
    }
     
     //changing the gameState to end when the obstacle touches the monkey
      if(obstacleGroup.isTouching(monkey)){
         gameState = END;
      }
  }

  //functions for gameState end
  if(gameState === END){
     //destroying the foodgroup
     FoodGroup.destroyEach();
     //setting the velocity to zero
     obstacleGroup.setVelocityXEach(0);
     obstacleGroup.x = 0;
     Invisibleground.velocityX = 0;
     
     jungle.x = 0;
    monkey.velocityY = 0;
    //changing the animation
     monkey.changeAnimation("collided",monkey_collided);
  }
  
//if the  r key is pressed the game will reset  
  if(keyDown("r")){
     reset();
  }
  Spawnfood();
  SpawnObstacles();
  
  //debuging the monkey
  monkey.debug = true; 
  
  drawSprites();
  //displaying the survival time and score
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+ Score,300,20); 
  
  text("press r to restart when the game gets over to play gain",20,50);
}
//functions for reseting the program
function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  monkey.changeAnimation("moving",monkey_running);
  monkey.scale = 0.3;
  survivaTime = 0;
  Score = 0;
  
}

function Spawnfood(){
//creating the bananas after every 100 frames
  if(World.frameCount% 100 ==0 ){
    banana = createSprite(1250,Math.round(random(180,200)),20,20);
    banana.addImage(bananaImage);
  // increasing the game speed
    banana.velocityX = -(6 + Score/10);
    banana.scale = 0.3;
    banana.lifetime = -1;
    FoodGroup.add(banana);
  }
}
function SpawnObstacles(){
//creating the obstacles after every 200 frames
   if(World.frameCount% 200 ==0 ){
     obstacle = createSprite(1230,360,20,20);
      // increasing the game speed
     obstacle.velocityX = -(8+ Score/5);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.2;
     obstacle.lifetime = -1;
     obstacleGroup.add(obstacle);
   }
}
