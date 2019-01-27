//Creating and centering rendered
const renderer = PIXI.autoDetectRenderer(800, 600);  
document.body.appendChild(renderer.view);
renderer.view.style.position = 'absolute';
renderer.view.style.top = '50%';
renderer.view.style.left = '50%';
renderer.view.style.transform = 'translate3d( -50%, -50%, 0 )';
renderer.view.style.color = '0x990000';

const stage = new PIXI.Container();
stage.interactive = true;

//Drowing background for the canvas
const background = new PIXI.Graphics();  
background.beginFill(0x11111);  
background.drawRect(0,0,800,600);  
background.endFill();  

stage.addChild(background);


const texture = PIXI.Texture.fromImage('./assets/sniperSlice.png');  
const rocket = PIXI.Texture.fromImage('assets/rocket.png');
const sniper = new PIXI.Sprite(texture);

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
stage.addChild(laser);

stage.addChild(sniper);

stage.on("mousedown", function(e){  
  shoot(sniper.rotation, {
    x: sniper.position.x,
    y: sniper.position.y
  });
})

stage.on("rightclick", function(e){
     moveToPoint();
})

let bullets = [];  
const bulletSpeed = 10;

(function setup() {
     animate();  
})();

function moveToPoint() {
     sniper.position.x = renderer.plugins.interaction.mouse.global.x;
     sniper.position.y = renderer.plugins.interaction.mouse.global.y;
}

function shoot(rotation, startPosition){  
  var bullet = new PIXI.Sprite(rocket);
  
  bullet.position.x = startPosition.x;
  bullet.position.y = startPosition.y;

  bullet.rotation = rotation;
  stage.addChild(bullet);
  bullets.push(bullet);
}

function rotateToPoint(mx, my, px, py){  
  var dist_Y = my - py;
  var dist_X = mx - px;
  var angle = Math.atan2(dist_Y,dist_X);
  return angle;
}


function animate() {  
requestAnimationFrame(animate);

sniper.rotation = rotateToPoint(renderer.plugins.interaction.mouse.global.x, renderer.plugins.interaction.mouse.global.y, sniper.position.x, sniper.position.y);

laser.rotation = rotateToPoint(renderer.plugins.interaction.mouse.global.x, renderer.plugins.interaction.mouse.global.y, laser.position.x, laser.position.y);

laser.rotation+=100.15;

laser.position.x = sniper.position.x;
laser.position.y = sniper.position.y;

for (var b=bullets.length-1; b>=0; b--){
    bullets[b].position.x += Math.cos(bullets[b].rotation)*bulletSpeed;
    bullets[b].position.y += Math.sin(bullets[b].rotation)*bulletSpeed;
}

  renderer.render(stage);
}
