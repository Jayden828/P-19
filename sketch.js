var planeImg, skyImg, crashImg, birdImg, coinImg;
var sky, plane, coin, bird, edges;
var birdGroup, coinGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;
var score = 0;


function preload(){
    planeImg = loadImage("assets/Plane.png");
    skyImg = loadImage("assets/Sky.png");
    crashImg = loadImage("assets/Crash.png");
    coinImg = loadImage("assets/Coin.png");
    birdImg = loadImage("assets/Bird.png");
    birdGroup = new Group();
    coinGroup = new Group();
}

function setup() {
    createCanvas(800,400);
    sky = createSprite(300,200,10,10)
    sky.addImage(skyImg);
    sky.velocityX = -4;
    plane = createSprite(1,200,10,10);
    plane.addImage(planeImg);

    edges = createEdgeSprites();

  
}

function draw() {
   background(0)
    if(gameState===PLAY){ 


    plane.collide(edges);

    if(sky.x < 200){
        sky.x = 600;
    }
    plane.y = World.mouseY

    
    createBird();
    createCoin();

    if(coinGroup.isTouching(plane)){
        score = score + 5;
        coinGroup.destroyEach();
    }

    if(birdGroup.isTouching(plane)){
        gameState = END;
        plane.changeImage("crashImg");
        coinGroup.destroyEach;
        birdGroup.destroyEach;
        score = 0;
        sky.velocityX=0

        textSize(40);
        fill(255);
        text("Game Over",400,200);
     

    }
   }

    drawSprites();
    textSize(20);
    fill(0);
    text("Points: "+ score,50,290);
}

function createBird(){
    if(frameCount % 400 == 0){
    bird = createSprite(770,Math.round(random(100,500)), 10, 10);
    bird.addImage(birdImg);
    bird.velocityX = -3;
    bird.lifetime = 250;
    bird.scale= 0.2;
    birdGroup.add(bird);
    }
}

function createCoin(){
    if(frameCount % 300 == 0){
    coin = createSprite(770,Math.round(random(100,500)), 10, 10);
    coin.addImage(coinImg);
    coin.velocityX = -3;
    coin.lifetime = 250;
    coin.scale = 0.3;
    coinGroup.add(coin);
    }
}