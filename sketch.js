//Create variables here
var dog,dogImage
var happyDogImage
var database
var foodS
var foodS
function preload()
{
  dogImage=loadImage("images/dogImg.png")
  happyDogImage=loadImage("images/dogImg1.png")

}

function setup() {
  createCanvas(500, 500);
  database=firebase.database()
  dog=createSprite(300,400,20,20)
  dog.addImage("dogImage",dogImage)
  dog.scale=0.2
  foodS=database.ref('Food')
  foodS.on("value",readStock)
  
}


function draw() {  
background(46,139,87)

  drawSprites();
  textSize(15)
  fill("white")
  text("food left"+foodS,250,300)
  //add styles here

}
function readStock(data){
  foodS=data.val() 
}
function writeStock(x){
if(x<=0){
  x=0;
}
else{
  x=x-1
}

  database.ref('/').update({
Food:x
  })
}


