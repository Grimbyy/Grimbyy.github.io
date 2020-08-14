let trunkLength = 100;
let densitySlider;
let rotationLimitSlider;
let limitSlider;
let branchNoSlider;

let sliderPos;

let branchNo = 1;

let splitDensity;
let branchLimit;
let rotationValue;
let diminishValue;

let applyButton;
let applied;
let liveCheck;

let count;

function setup() {
  createCanvas(400, 720);
  angleMode(DEGREES);
  sliderPos = createVector(width/4, (height/2)+35);
  let sliderSize = createVector(width/2, 35);
  densitySlider = createSlider(1, 8, 1, 1);
  rotationLimitSlider = createSlider(0, 180, 33, 1);
  diminishSlider = createSlider(0, 0.70, 0.60, 0.01);
  limitSlider = createSlider(0, 1000000, 5000, 100);
  //branchNoSlider = createSlider(-10, 1, 1, 1);
  
  densitySlider.position(sliderPos.x, sliderPos.y);
  densitySlider.size(sliderSize.x, sliderSize.y);
  rotationLimitSlider.position(sliderPos.x, sliderPos.y+(sliderSize.y*2));
  rotationLimitSlider.size(sliderSize.x, sliderSize.y);
  diminishSlider.position(sliderPos.x, sliderPos.y+(sliderSize.y*4));
  diminishSlider.size(sliderSize.x, sliderSize.y);
  limitSlider.position(sliderPos.x, sliderPos.y+(sliderSize.y*6));
  limitSlider.size(sliderSize.x, sliderSize.y);
  
  splitDensity = densitySlider.value();
  rotationValue = rotationLimitSlider.value();
  diminishValue = diminishSlider.value();
  branchLimit = limitSlider.value();
  //branchNo = branchNoSlider.value();
  
  applyButton = createButton('Apply');
  applyButton.position(sliderPos.x, sliderPos.y+(sliderSize.y*7));
  applyButton.size(sliderSize.x, sliderSize.y);
  applyButton.mousePressed(updateFractal);
  fill(255);
  liveCheck = createCheckbox('Auto-Update', false);
  liveCheck.position(width/3+10, sliderPos.y+(sliderSize.y*8.25));
  liveCheck.style('color', 'white');
  applied = false;
}

function autoUpdate()
{
  if (liveCheck.checked()){
    if (splitDensity != densitySlider.value() || rotationValue != rotationLimitSlider.value() || diminishValue != diminishSlider.value() || branchLimit != limitSlider.value()) {
      updateFractal();
    }
  }
}

function updateFractal() {
  splitDensity = densitySlider.value();
  rotationValue = rotationLimitSlider.value();
  diminishValue = diminishSlider.value();
  branchLimit = limitSlider.value();
  //branchNo = branchNoSlider.value();
  applied = false;
}

function draw() {
  autoUpdate();
  if (!applied) {
  clear()
  background(51);
  push();
  stroke(255);
  line(0, height/2, width, height/2);
  translate(width/2, height/2);
  count = 0;
  line(0, 0, 0, -trunkLength);
  translate(0, -trunkLength)
  branch(75, branchLimit);
  pop();
  text('Split Density: ' + splitDensity, sliderPos.x, sliderPos.y+(70*0));
  text('Branch Rotation: ' + rotationValue + '°', sliderPos.x, sliderPos.y+(70*1));
  text('Shorten Multiplier: ' + diminishValue, sliderPos.x, sliderPos.y+(70*2));
  text('Branch Limit: ' + branchLimit, sliderPos.x, sliderPos.y+(70*3));
  text('Lines drawn: ' + count, 10, 25);
  //noLoop();
    applied = true;
  } 
}

function branch(len, limit) {
  count++;
  if (len >= 1 && limit >= count) {
    for (let i=branchNo;i<=splitDensity;i++) {
      push();
      rotate((rotationValue/splitDensity)*i);
      line(0, 0, 0, -len);
      translate(0, -len)
      branch(len*diminishValue, limit);
      pop();
      push();
      rotate(-(rotationValue/splitDensity)*i);
      line(0, 0, 0, -len);
      translate(0, -len)
      branch(len*diminishValue, limit);
      pop();
    }
  }
}