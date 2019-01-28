//Creating and centering renderer
const renderer = PIXI.autoDetectRenderer(800, 600);  
document.body.appendChild(renderer.view);
renderer.view.style.position = 'absolute';
renderer.view.style.top = '50%';
renderer.view.style.left = '50%';
renderer.view.style.transform = 'translate3d( -50%, -50%, 0 )';
renderer.view.style.color = '0x990000';

// Creating stage from pixi Container
const stage = new PIXI.Container();
stage.interactive = true;

//Drowing background for the stage
const background = new PIXI.Graphics();  
background.beginFill(0x11111);  
background.drawRect(0,0,800,600);  
background.endFill();  
stage.addChild(background);

// Uploading assets - trying to solve how to make animation SpriteSheet animation
const texture = PIXI.Texture.fromImage('./assets/sniperSlice.png');  
const rocket = PIXI.Texture.fromImage('assets/rocket.png');
const sniper = new PIXI.Sprite(texture);

// Finding mouse position
let mousePointer = renderer.plugins.interaction.mouse.global;

// Coordinates for the sniper 
let xVelocity = 0.1;
let yVelocity = 0.1;
let speed = 20;
let angle = 0;

sniper.anchor.x = 0.5;  
sniper.anchor.y = 0.5;

//sniper Starting position
sniper.position.x = 200;  
sniper.position.y = 150;

//Drawing laser for the sniper
var laser = new PIXI.Graphics();
laser.lineStyle(1.2, 0xba0000);
laser.moveTo(0,-20);
laser.lineTo(300, 100);

//Adding sniper and laser to the stage
stage.addChild(laser);
stage.addChild(sniper);

//Adding stage EventListeners for left and rigthclick
stage.on("mousedown", function(e){  
  shoot(sniper.rotation, {
    x: sniper.position.x,
    y: sniper.position.y
  });
})

stage.on("rightclick", function(e){
     moveToPoint();
})

// Adding rocket array and speed
let rockets = [];  
const rocketspeed = 10;

function moveToPoint() {
    
    // Simple way for sniper to move to mouse point
     sniper.position.x = mousePointer.x;
     sniper.position.y = mousePointer.y;

    // Trying to solve - sniper follow the mouse using x and y velocity 

    // let dX = mousePointer.x - sniper.position.x;
    // let dY = mousePointer.y - sniper.position.y;

    // let angle = Math.atan2(dX,dY); 
    // xVelocity = Math.cos(angle) * speed;
    // yVelocity = Math.sin(angle) * speed;

    // sniper.position.x +=xVelocity;
    // sniper.position.y +=yVelocity;
  
}

// Function for shooting rockets in the direction of the mouse
function shoot(rotation, startPosition){  
  let bullet = new PIXI.Sprite(rocket);
  
  bullet.position.x = startPosition.x;
  bullet.position.y = startPosition.y;

  bullet.rotation = rotation;
  stage.addChild(bullet);
  rockets.push(bullet);
}

// Function for calculating angle
function rotateToPoint(mx, my, px, py){  
  var dist_Y = my - py;
  var dist_X = mx - px;
  var angle = Math.atan2(dist_Y,dist_X);
  return angle;
}

// Function for animating everything on stage
function animate() {  
requestAnimationFrame(animate);

sniper.rotation = rotateToPoint(mousePointer.x, mousePointer.y, sniper.position.x, sniper.position.y);

laser.rotation = rotateToPoint(mousePointer.x, mousePointer.y, laser.position.x, laser.position.y);

laser.rotation+=100.15;

laser.position.x = sniper.position.x;
laser.position.y = sniper.position.y;

for (var b=rockets.length-1; b>=0; b--){
    rockets[b].position.x += Math.cos(rockets[b].rotation)*rocketspeed;
    rockets[b].position.y += Math.sin(rockets[b].rotation)*rocketspeed;
}

  renderer.render(stage);
}


// Making self executable setup function
(function setup() {
  animate();  
})();
