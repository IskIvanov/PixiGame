const app = new PIXI.Application({
     width: 600, // default: 800
     height: 600, // default: 600
     antialias: true, // default: false
     backgroundColor: 0x292929
 });


 const rocket = PIXI.Sprite.fromImage('./assets/rocket.png');
 const sniper = PIXI.Sprite.fromImage('./assets/sniper.png')
 
 sniper.anchor.set(0.5);

 sniper.x = app.screen.width / 2;
 sniper.y = app.screen.height / 2;

 app.stage.addChild(sniper);

 document.body.appendChild(app.view);

 app.ticker.add(function (delta) {
     sniper.rotation += 0.1 * delta;
 })