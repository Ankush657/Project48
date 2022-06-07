var bg,bgImg;
var gun, gunImg;
var bubble, bubbleImg;
var bullet, bulletImg
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var bubbleGroup;

var score = 0;
var life = 3;
var bullets = 20;

var gameState = "fight"

var lose, winning, explosionSound;


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  gunImg = loadImage("assets/gun.png")

  bubbleImg = loadImage("assets/bubble.png")

  bulletImg = loadImage("assets/bullet.jpg")

  bgImg = loadImage("assets/garden.png")

  lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.6
  
  gun = createSprite(displayWidth-1250, displayHeight-300, 50, 50);
  gun.addImage(gunImg)
  gun.scale = 0.2
  gun.debug = true
  gun.setCollider("rectangle",0,0,1000,600)

  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
  heart1.addImage("heart1",heart1Img)
  heart1.scale = 0.4
  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visible = false
  heart2.addImage("heart2",heart2Img)
  heart2.scale = 0.4
  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage("heart3",heart3Img)
  heart3.scale = 0.4
   
  bulletGroup = new Group()
  bubbleGroup = new Group()



}

function draw() {
  background(0); 


  if(gameState === "fight"){

    if(life===3){
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if(life===2){
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }
    if(life===1){
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }

  if(life===0){
    gameState = "lost"
    
  }


  if(score==100){
    gameState = "won"
    winning.play();
  }

  if(keyDown("UP_ARROW")||touches.length>0){
    gun.y = gun.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
    gun.y = gun.y+30
  }

  if(keyWentDown("space")){

    bullet = createSprite(displayWidth-1150,gun.y-35,20,10)
    bullet.addImage(bulletImg)
    bullet.scale = 0.2
    bullet.velocityX = 20
    bulletGroup.add(bullet)
    gun.depth = bullet.depth
    gun.depth = gun.depth+2
    bullets = bullets-1
  }

  if(bullets==0){
    gameState = "bullet"
    lose.play();  
  }

  if(bubbleGroup.isTouching(bulletGroup)){
    for(var i=0;i<bubbleGroup.length;i++){     
      
      if(bubbleGroup[i].isTouching(bulletGroup)){
        bubbleGroup[i].destroy()
        bulletGroup.destroyEach()
        explosionSound.play();
 
        score = score+2
      } 
    }
  }

  if(bubbleGroup.isTouching(gun)){
    lose.play();

    for(var i=0;i<bubbleGroup.length;i++){     

      if(bubbleGroup[i].isTouching(gun)){

      bubbleGroup[i].destroy()
      life=life-1
      } 
    }
  }

  enemy();
}




drawSprites();


  textSize(20)
  fill("white")
  text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
  text("Score = " + score,displayWidth-200,displayHeight/2-220)
  text("Lives = " + life,displayWidth-200,displayHeight/2-280)

  if(gameState == "lost"){
  
    textSize(100)
    fill("red")
    text("You Lost ",400,400)
    bubbleGroup.destroyEach();
    gun.destroy();
  }

  else if(gameState == "won"){
 
    textSize(100)
    fill("yellow")
    text("You Won ",400,400)
    bubbleGroup.destroyEach();
    gun.destroy();
  }

  else if(gameState == "bullet"){
 
    textSize(50)
    fill("yellow")
    text("You ran out of bullets!!!",470,410)
    bubbleGroup.destroyEach();
    gun.destroy();
    bulletGroup.destroyEach();

  }
}

function enemy(){

  if(frameCount%50===0){

    bubble = createSprite(random(1300,1400),random(100,600),40,40)
    bubble.addImage("Bubble",bubbleImg)
    bubble.scale = 0.2
    bubble.velocityX = -3
    bubble.debug= true
    bubble.setCollider("rectangle",0,0,500,500)
   
    bubble.lifetime = 500
    bubbleGroup.add(bubble)
  }
}
