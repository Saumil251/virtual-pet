//Create variables here
var dog,dogImage
var happyDogImage
var database
var foodS
var foodS
var fedtime,lastFed
var feed,addFood
var foodObj

function preload()
{
  dogImage=loadImage("images/dogImg.png")
  happyDogImage=loadImage("images/dogImg1.png")

}

function setup() {
  database=firebase.database()
  createCanvas(500, 500);

foodObj= new Food()
 
  dog=createSprite(300,400,20,20)
  dog.addImage("dogImage",dogImage)
  dog.scale=0.2

  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

  foodS=database.ref('Food')
  foodS.on("value",readStock)
  
}


function draw() {  
background(46,139,87)
foodObj.display()

fedTime=database.ref('FeedTime')
fedTime.on("value",funtion(data){
  lastFed=data.val()
})

drawSprites();

textSize(15)
fill("white")
text("food left"+foodS,250,300)
//add styles here
fill(255,255,254)
    textSize(15)
    if(lastFed>=12){
        text("Last Feed: "+lastFed%12 + "PM",50,30)
    }else if(lastFed==0){
        text("Last Feed:"+lastFed+"AM",50,30)
    }else{
        text("Last Fee:"+ lastFed+"AM",50,30)
    }
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

function feedDog(){
  dog.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').updste({
    Food:foodS
  })
}


