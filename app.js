const renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});  
document.body.appendChild(renderer.view);

const stage = new PIXI.Container();

const texture = PIXI.Texture.fromImage('./assets/sniperSlice.png');  
const carrotTex = PIXI.Texture.fromImage('assets/rocket.png');
const sniper = new PIXI.Sprite(texture);
sniper.anchor.x = 0.5;  
sniper.anchor.y = 0.5;

sniper.position.x = 200;  
sniper.position.y = 150;

const background = new PIXI.Graphics();  
background.beginFill(0x123456);  
background.drawRect(0,0,800,600);  
background.endFill();  

stage.addChild(background);

stage.addChild(sniper);

stage.interactive = true;

stage.on("mousedown", function(e){  
  shoot(sniper.rotation, {
    x: sniper.position.x+Math.cos(sniper.rotation)*20,
    y: sniper.position.y+Math.sin(sniper.rotation)*20
  });
})

stage.on("rightclick", function(e){
     console.log('RightClick registed');
})

let bullets = [];  
const bulletSpeed = 10;

// Mouse position coordinates
const getMousePosition = ()=> app.renderer.plugins.interaction.mouse.global;

(function setup() {
     animate();  
})();

function moveToPoint() {
     sniper.position.x = getMousePosition.x;
     sniper.position.y = getMousePosition.y;
}

function shoot(rotation, startPosition){  
  var bullet = new PIXI.Sprite(carrotTex);
  bullet.position.x = startPosition.x;
  bullet.position.y = startPosition.y;
  bullet.rotation = rotation;
  stage.addChild(bullet);
  bullets.push(bullet);
}

function rotateToPoint(mx, my, px, py){  
  var self = this;
  var dist_Y = my - py;
  var dist_X = mx - px;
  var angle = Math.atan2(dist_Y,dist_X);
  return angle;
}


function animate() {  
requestAnimationFrame(animate);
sniper.rotation = rotateToPoint(renderer.plugins.interaction.mouse.global.x, renderer.plugins.interaction.mouse.global.y, sniper.position.x, sniper.position.y);

for (var b=bullets.length-1; b>=0; b--){
    bullets[b].positiofn.x += Math.cos(bullets[b].rotation)*bulletSpeed;
    bullets[b].position.y += Math.sin(bullets[b].rotation)*bulletSpeed;
}


  renderer.render(stage);
}