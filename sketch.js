var bg,bgImg;
var player, shooterImg, shooter_shooting;
var gameState = "fight"
var score = 0 
var life = 3
var bullets = 70
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  bulletImg = loadImage ("assets/bullet.png")
heart1Img = loadImage ("assets/heart_1.png")
heart2Img = loadImage ("assets/heart_2.png")
heart3Img = loadImage ("assets/heart_3.png")
  bgImg = loadImage("assets/bg.jpeg")
explosionSound = loadSound ("assets/explosion.mp3")  
loseSound = loadSound ("assets/lose.mp3")
winSound = loadSound ("assets/win.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);

 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

heart1 = createSprite(displayWidth-150,40,20,20)
heart1.visible=false
heart1.addImage(heart1Img)
heart1.scale = 0.4


heart2 = createSprite(displayWidth-100,40,20,20)
heart2.visible=false
heart2.addImage(heart2Img)
heart2.scale = 0.4


heart3 = createSprite(displayWidth-50,40,20,20)
heart3.visible=false
heart3.addImage(heart3Img)
heart3.scale = 0.4

bulletGroup = new Group()
zombieGroup = new Group ()


}

function draw() {
  background(0); 

if (gameState=="fight"){
  if (life==3){
    heart1.visible=false
    heart2.visible=false
    heart3.visible=true
  }
  if (life==2){
    heart1.visible=false
    heart2.visible=true
    heart3.visible=false
  }
  if (life==1){
    heart1.visible=true
    heart2.visible=false
    heart3.visible=false
  }
  if(life==0){
    gameState = "lost"
    loseSound.play()
  }
  if (score==100){
    gameState = "won"
    winSound.play()
  }
   //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet=createSprite(player.x+100,player.y-30,20,10)
  bullet.addImage(bulletImg)
  bullet.velocityX=20
  bullet.scale = 0.3
  bulletGroup.add(bullet)
  player.depth=bullet.depth
  player.depth=player.depth+2
  player.addImage(shooter_shooting)
bullets=bullets-1
explosionSound.play()
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if (bullets==0){
  gameState="bullet"
  loseSound.play()
}
spawnZombie();

}
drawSprites();

}
function spawnZombie(){
  if(frameCount%200==0){
zombie=createSprite(width,Math.round(random(30,500)))
zombie.addImage(zombieImg)
zombie.scale=0.2
zombie.velocityX=-4
 

  }

  
}
