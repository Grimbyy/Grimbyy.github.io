let first = true;
let buttons = [];
let buttonSize;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  
  buttons.push(createButton('Fun'));
  buttons[0].mousePressed(function() {
    location.replace();
  });
  buttons.push(createButton('Contact'));
  buttons[1].mousePressed(function() {
    location.replace();
  });
  buttons.push(createButton('References'));
  buttons[2].mousePressed(function() {
    location.replace();
  });
  buttons.push(createButton('Projects'));
  buttons[3].mousePressed(function() {
    location.replace("http://grimbyy.github.io/P5JS/Ray Casting/raycasting");
    console.log("hello");
  });
  buttonSize = createVector(330, 35);
  stroke(0);
  for (let i = 0;i<buttons.length;i++) {
    buttons[i].size(buttonSize.x, buttonSize.y);
    buttons[i].position((windowWidth/2)-(buttonSize.x/2),windowHeight/2-((buttons.length/2)*((75-(buttonSize.y*1.5))*i)));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (let i = 0;i<buttons.length;i++) {
    buttons[i].size(buttonSize.x, buttonSize.y);
    buttons[i].position((windowWidth/2)-(buttonSize.x/2),windowHeight/2-((buttons.length/2)*((75-(buttonSize.y*1.5))*i)));
  }
}

let myTitle;

function draw() {
  background(55);
  let title = 'CALLUM J. GRIMBLE';
  let subTitle = 'Backend / Frontend / Database Architect / Software Architect';
  let subSubTitle = 'GitHub: grimbyy\nLinkedIn: callum-grimble'
  push();
  
  textSize(map(windowWidth, 0, 1920, 30, 55));
  fill(255);
  myTitle = text(title, 10, 100);
  textSize(map(windowWidth, 0, 1920, 15, 25));
  text(subTitle, 10, 100+35);
  textSize(map(windowWidth, 0, 1920, 12, 12));
  text(subSubTitle, 10, 100+50);
  pop();
  fill(110);
  line(0, 100+5, windowWidth, 100+5)
}

function mousePressed() {
  
}