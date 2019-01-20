const app = new PIXI.Application();

document.getElementById("display").appendChild(app.view);
// const renderer = PIXI.autoDetectRenderer(600,600, {
//      transparent:true,
//      resolution: 1
// })
// document.getElementById('display').appendChild(renderer.view);

//Creating stage component
const stage = new PIXI.Container();

const Graphics = new PIXI.Graphics();

let xVelocity = 0.1;
let yVelocity = 0.1;
let mousePosition;
// Finding mouse position
const getMousePosition = ()=> app.renderer.plugins.interaction.mouse.global;

app.ticker.add( ()=>{
     mousePosition = getMousePosition();
     datDot.x = mousePosition.x;
     datDot.y = mousePosition.y;
     
     console.log(getMousePosition());
} );


// Adding assets with loader
PIXI.loader
     .add("rocket","./assets/rocketSlice.png")
     .add("sniper","./assets/sniperSlice.png")
     .add("explosion","./assets/explosion.png")
     .load(setup);

// Naming variables for the main assets 
let rocket;
let sniper;
let explosion;

console.log(getMousePosition());


function setup() {
     stage.interactive = true;
     
     rocket = new PIXI.Sprite(
          PIXI.loader.resources['rocket'].texture
     )
     
     rocket.interactive = true;
     
     // rocket.anchor.set(0.5);
     // rocket.x = 100;
     // rocket.y = 100;
     // rocket.anchor.set(0.5, 0.5);

     rocket.click = () => {
          rocket.scale.x += 0.1;
          rocket.scale.y += 0.1;
     }

     animationLoop();
}

function animationLoop() {
     requestAnimationFrame(animationLoop);

     rocket.anchor.set(0.5);
     rocket.x = 100;
     rocket.y = 100;
     rocket.anchor.set(0.5, 0.5);

     rocket.rotation+=0.05;

     app.stage.addChild(rocket);
}

//  function player() {
//      requestAnimationFrame(player);

//      sniper.anchor.set(0.5);
//      sniper.x = app.screen.width / 2;
//      sniper.y = app.screen.height / 2;
//      sniper.rotation += 0.025;
//      sniper.pivot.set(200,0);
//      app.stage.addChild(sniper);
// }

// function rocketShoot() {
//      rocket.anchor.set(0.5);
//      rocket.x = 100;
//      rocket.y = 100;
//      app.stage.addChild(rocket);
// }

// function fire() {
//      explosion.anchor.set(0.5);
//      explosion.scale.set(0.2);
//      explosion.x = 295;
//      explosion.y = 329;
//      app.stage.addChild(explosion);
// }

// player();
// rocketShoot();
// fire(); 

//  app.ticker.add(function (delta) {
//      sniper.rotation += 0.03 * delta;
//  })

