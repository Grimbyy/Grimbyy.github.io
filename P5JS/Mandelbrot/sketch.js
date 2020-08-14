let resSlider, ZoomSlider, densitySlider, mapXSlider, mapYSlider;
let resLast, zoomLast, densityLast, mapXLast, mapYLast;

var viewer = function(p)
{
  p.setup = function() {
    p.createCanvas(420, 420);
    p.pixelDensity(1);
    let sliderDist = 75;
    ZoomSlider = p.createSlider(0,1, 1, 0.0001);
    ZoomSlider.position(p.width-1, (sliderDist*1));
    ZoomSlider.size(331, 25);
    resSlider = p.createSlider(1,10, 2, 1);
    resSlider.position(p.width-1, (sliderDist*2));
    resSlider.size(331, 25);
    densitySlider = p.createSlider(3,1000, 50, 1);
    densitySlider.position(p.width-1, (sliderDist*3));
    densitySlider.size(331, 25);
  
    mapXSlider = p.createSlider((-p.width)*5,p.width*5, -100, 1);
    mapXSlider.position(p.width-1, (sliderDist*4));
    mapXSlider.size(331, 25);
    mapYSlider = p.createSlider((-p.height)*5,p.height*5, 0, 1);
    mapYSlider.position(p.width-1, (sliderDist*5));
    mapYSlider.size(331, 25);
  }

  p.draw = function() {
    if (resLast != resSlider.value()) {p.clear()}
    p.loadPixels();
    if (resLast != resSlider.value() || zoomLast != ZoomSlider.value() || densityLast != densitySlider.value() || mapXLast != mapXSlider.value() || mapYLast != mapYSlider.value() || p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown(p.RIGHT_ARROW) || p.keyIsDown(p.UP_ARROW)|| p.keyIsDown(p.DOWN_ARROW)) {
    
      if (p.keyIsDown(p.LEFT_ARROW))
      {
          mapXSlider.value(mapXSlider.value()+5);
      } else if (p.keyIsDown(p.RIGHT_ARROW)) {
          mapXSlider.value(mapXSlider.value()-5);
      } else if (p.keyIsDown(p.UP_ARROW)) {
          mapYSlider.value(mapYSlider.value()+5);
      } else if (p.keyIsDown(p.DOWN_ARROW)) {
          mapYSlider.value(mapXSlider.value()-5);
      }
  
      let density = densitySlider.value();
  
      for (let x=0;x<p.width;x+=resSlider.value()) {
          for (let y=0;y<p.height;y+=resSlider.value()) {
    
              let a = p.map((x+(mapXSlider.value()/ZoomSlider.value())), 0, p.width, -ZoomSlider.value(), ZoomSlider.value());
              let b = p.map((y+(mapYSlider.value()/ZoomSlider.value())), 0, p.height, -ZoomSlider.value(), ZoomSlider.value());
      
              let ca = a;
              let cb = b;
      
              let n=0;
              let z=0;
      
              while (n<density) {
                  let aa = a * a - b * b;
                  let bb = 2 * a * b;
        
                  a=aa+ca;
                  b=bb+cb;
        
                  if ( p.abs(a+b) > 16 ) {
                      break;
                  }
        
              n++;
              }      
            var bright = p.map(n, 0, density, 0, 1);
            palpha = 255;
            bright = p.map(p.sqrt(bright), 0, 1, 0, 255)
            if (n==density)
            {
              palpha = 0;
            }
      
            let pix = (x+y*p.width)*4;
            p.pixels[pix+0] = bright;
            p.pixels[pix+1] = bright;
            p.pixels[pix+2] = bright;
            p.pixels[pix+3] = palpha;
          }
        }
      resLast = resSlider.value();
      zoomLast = ZoomSlider.value();
      densityLast = densitySlider.value();
      mapXLast = mapXSlider.value();
      mapYLast = mapYSlider.value();
      p.updatePixels();
    }
  }
}
let labelDist = 75
var controls = function(p) {
  p.setup = function() {
    p.createCanvas(333, 420);
    loc5button = p.createButton('RESET');
    loc5button.position(420, p.height);
    loc5button.size(p.width, 35);
    loc5button.mousePressed(function() {loadLocation(999)});
  }
  
  p.draw = function() {
    p.background(51);
    p.push();
    p.stroke(100);
    p.line(1, 1, 1, p.height);
    p.line(1, 50, p.width, 50);
    p.pop();
    p.fill(255);
    p.push();
    p.textSize(32);
    p.text('CONTROLS', (p.width/8)/6, p.height/11);
    p.pop();
    p.text('Zoom ('+ zoomLast +')', (p.width/8)/6, 75+(labelDist*0));
    p.text('Resolution ('+ (110-(resLast*10)) +'%)', (p.width/8)/6, 75+(labelDist*1));
    p.text('Render Density ('+ densityLast+')', (p.width/8)/6, 75+(labelDist*2));
    p.text('Move X ('+ mapXLast +')', (p.width/8)/6, 75+(labelDist*3));
    p.text('Move Y ('+ mapYLast +')', (p.width/8)/6, 75+(labelDist*4));
  }
}

let buttonDist = 75
var buttons = function(p) {
  p.setup = function() {
    p.createCanvas(210, 420);
    loc1button = p.createButton('LOAD');
    loc1button.position(650, 80+(buttonDist*0));
    loc1button.size(175, 35);
    loc1button.mousePressed(function() {loadLocation(1)});
    loc2button = p.createButton('LOAD');
    loc2button.position(650, 80+(buttonDist*1));
    loc2button.size(175, 35);
    loc2button.mousePressed(function() {loadLocation(2)});
    loc3button = p.createButton('LOAD');
    loc3button.position(650, 80+(buttonDist*2));
    loc3button.size(175, 35);
    loc3button.mousePressed(function() {loadLocation(3)});
    loc4button = p.createButton('LOAD');
    loc4button.position(650, 80+(buttonDist*3));
    loc4button.size(175, 35);
    loc4button.mousePressed(function() {loadLocation(4)});
    loc5button = p.createButton('RESET');
    loc5button.position(650, 80+(buttonDist*4));
    loc5button.size(175, 35);
    loc5button.mousePressed(function() {loadLocation(999)});
  }
  
  p.draw = function() {
    p.background(51);
    p.push();
    p.stroke(100);
    p.line(1, 1, 1, p.height);
    p.line(1, 50, p.width, 50);
    p.pop()
    p.fill(255);
    p.text('Preset Locations', p.width/4, 30);
    p.text('Location #1', 22.5, 75+(labelDist*0));
    p.text('Location #2', 22.5, 75+(labelDist*1));
    p.text('Location #3', 22.5, 75+(labelDist*2));
    p.text('Location #4', 22.5, 75+(labelDist*3));
  }
}

function loadLocation(locNum) {
    switch (locNum) {
      case 1:
         //console.log(1);
        resSlider.value(1);
        ZoomSlider.value(0.11);
        densitySlider.value(1000);
        mapXSlider.value(136);
        mapYSlider.value(-1800);
        break;
      case 2:
        //console.log(2);
        resSlider.value(1);
        ZoomSlider.value(0.26);
        densitySlider.value(1000);
        mapXSlider.value(-318);
        mapYSlider.value(0);
        break;
      case 3:
        //console.log(3);
        resSlider.value(1);
        ZoomSlider.value(0.14);
        densitySlider.value(1000);
        mapXSlider.value(2100);
        mapYSlider.value(0);
        break;
      case 4:
        //console.log(4);
        resSlider.value(1);
        ZoomSlider.value(0.07);
        densitySlider.value(1000);
        mapXSlider.value(1618);
        mapYSlider.value(1646);
        break;
      default:
        //console.log(999);
        resSlider.value(2);
        ZoomSlider.value(1);
        densitySlider.value(50);
        mapXSlider.value(-100);
        mapYSlider.value(0);
        break;
    }
}

var myp5 = new p5(viewer);
var myp51 = new p5(controls);
//var myp52 = new p5(buttons);