const app = new PIXI.Application({ 
     width: 300,         // default: 800
     height: 456,        // default: 600
     antialias: true,    // default: false
     transparent: false, // default: false
     resolution: 1,     // default: 1
   }
);
document.body.appendChild(app.view);

console.log(app);