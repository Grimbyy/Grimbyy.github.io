class Particle {
 constructor() {
   this.pos = createVector(width/2, height/2);
   this.rays = [];
   for (let i = 0; i < 360; i+= 0.25) {
     this.rays.push(new Ray(this.pos, radians(i)))
   }
 }
  
  update(x, y) {
    this.pos.set(x, y);
  }
  
  look(walls) {
    for (let ray of this.rays) {
      let closest = null;
      let record = Infinity;
      let color = 0;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) { 
          const d = p5.Vector.dist(this.pos, pt)
          if (d < record) {
            record = d;
            closest = pt;
            color = d;
          }
        }
      }
      if (closest) {
        if (color > 50) {stroke(0, 255, 0)} else {stroke(255, 0, 0)}
        line(this.pos.x, this.pos.y, closest.x, closest.y); 
      }
    }
  }
  
  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4);
    for (let ray of this.rays)
    {
      ray.show();
    }
  }
}