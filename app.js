PIXI.utils.sayHello();

const renderer = PIXI.autoDetectRenderer(600,600, {
     transparent:true,
     resolution: 1
})
document.getElementById('display').appendChild(renderer.view);

const stage = new PIXI.Container();

PIXI.loader
     .add("rocket","./assets/rocketSlice.png")
     .add("sniper","./assets/sniperSlice.png")
     .add("explosion","./assets/explosion.png")
     .load(setup);

let rocket;
let sniper;
let explosion;
const getMousePosition = ()=> {
 console.log()    
}

function setup() {
     stage.interactive = true;
     rocket = new PIXI.Sprite(
          PIXI.loader.resources['rocket'].texture
     )
     
     rocket.interactive = true;

     rocket.click = () => {
          rocket.scale.x += 0.1;
          rocket.scale.y += 0.1;
     }

     stage.addChild(rocket);
     animationLoop();
}

function animationLoop() {
     requestAnimationFrame(animationLoop);

     rocket.anchor.set(0.5);
     rocket.x = 100;
     rocket.y = 100;
     rocket.anchor.set(0.5, 0.5);

     rocket.rotation+=0.05;

     renderer.render(stage);
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

