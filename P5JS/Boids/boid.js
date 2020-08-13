class Boid {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.size = createVector(3,5);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(2, 4))
    this.acceleration = createVector();
    this.maxForce = 0.25;
    this.maxSpeed = 2.5;
    
    this.alignDist = 50;
    this.cohDist = 50;
    this.sepDist = 20;
  }
  
  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() - radians(90))
    strokeWeight(1);
    stroke(0);
    fill(255);
    triangle(0, 0 + this.size.y, 0 + this.size.x, 0 - this.size.y, 0 - this.size.x, 0 - this.size.y)
    pop(); 
  }
  
  align(boids) {
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other != this && d < this.alignDist){
      steering.add(other.vel);
      total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  
  cohesion(boids) {
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other != this && d < this.cohDist){
      steering.add(other.pos);
      total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.pos);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  
  separation(boids) {
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
      if (other != this && d < this.sepDist){
        let diff = p5.Vector.sub(this.pos, other.pos);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  
  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);
    
    separation.mult(separationPowerSlider.value());
    cohesion.mult(cohesionPowerSlider.value());
    alignment.mult(alignPowerSlider.value());
    
    this.alignDist = alignSlider.value();
    this.cohDist = cohesionSlider.value();
    this.sepDist = separationSlider.value();
    
    this.acceleration.add(separation);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
  }
  
  edges() {
    if (this.pos.x <= 0) {
      this.pos.x += width;
    } else if (this.pos.x >= width) {
      this.pos.x -= width;
    } else if (this.pos.y <= 0) {
      this.pos.y += height;
    } else if (this.pos.y >= height) {
      this.pos.y -= height;
    }
  }
  
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acceleration); 
    this.vel.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }
}