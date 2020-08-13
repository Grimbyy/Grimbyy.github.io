const flock = [];
let alignSlider, alignPowerSlider, cohesionSlider, cohesionPowerSlider, separationSlider, separationPowerSlider, button

function setup() {
  const sliderDist = 315;
  createCanvas(800, 480);
  alignPowerSlider = createSlider(0, 5, 1, 0.1);
  alignPowerSlider.position(sliderDist*0,height-25);
  alignSlider = createSlider(0, 250, 50, 0.1);
  alignSlider.position(sliderDist*0,height-75);
  cohesionPowerSlider = createSlider(0, 5, 1, 0.1);
  cohesionPowerSlider.position(sliderDist*1,height-25);
  cohesionSlider = createSlider(0, 250, 50, 0.1);
  cohesionSlider.position(sliderDist*1,height-75);
  separationPowerSlider = createSlider(0, 5, 2, 0.1);
  separationPowerSlider.position(sliderDist*2,height-25);
  separationSlider = createSlider(0, 250, 20, 0.1);
  separationSlider.position(sliderDist*2,height-75);
  
  button = createButton('Load Settings');
  button.position(10, 70);
  button.size(210,30);
  button.mousePressed(loadFav);
  
  for (let i=0;i<50;i++) {
    flock.push(new Boid());
  }
}

function loadFav() {
  alignPowerSlider.value(1);
  alignSlider.value(27);
  cohesionPowerSlider.value(1);
  cohesionSlider.value(0);
  separationPowerSlider.value(0.5);
  separationSlider.value(20.3);
}

function draw() {
  background(50);
  fill(255);
  text('Alignment Power (' + alignPowerSlider.value() + ')', alignPowerSlider.x+5, alignPowerSlider.y-5);
  text('Alignment Radius (' + alignSlider.value() + ')', alignSlider.x+5, alignSlider.y-5);
  text('Cohesion Power (' + cohesionPowerSlider.value() + ')', cohesionPowerSlider.x+5, cohesionPowerSlider.y-5);
  text('Cohesion Radius (' + cohesionSlider.value() + ')', cohesionSlider.x+5, cohesionSlider.y-5);
  text('Separation Power (' + separationPowerSlider.value() + ')', separationPowerSlider.x+5, separationPowerSlider.y-5);
  text('Separation Radius (' + separationSlider.value() + ')', separationSlider.x+5, separationSlider.y-5);
  text('Favourite Settings: \n- Alignment(Radius: 27, Power: 1)\n- Cohesion(Radius: 0, Power: 1)\n- Separation(Radius: 20.3, Power: 0.5)',10, 20);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}