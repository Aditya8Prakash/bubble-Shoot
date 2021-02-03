var bubble;
var bubbleVel;
var bubbleSize;
var player;
var size;
var heading;
var playerVel;
var force;
var boostColor;
var touch;
var playerColor;
var Score;
var Health;


lasers = [];
laserVel = [];



function setup() {

  createCanvas(800, 800);

  player = createVector(width / 2, height / 2)
  playerVel = createVector(0, 0);

  force = createVector(0, 0);

  size = 15;
  heading = 0;
  boostColor = color(0, 255, 0);
  playerColor = color(255);
  Score = 0;
  Health = 200;
  bubble = [];
  bubbleVel = [];
  

  for (var i = 0; i < 5; i++) {

    bubbleSize = random(40,70)
      bubble.push(createVector(random(0, width), random(0, height)));
      bubbleVel.push(p5.Vector.random2D().mult(random(0.25, 2.25)*3));

  }
}

function draw() {
  background(0);
  boostColor = color(0);
  
    if (keyIsDown(LEFT_ARROW)) {
        heading -= 6;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        heading += 6;
    }
    if (keyIsDown(UP_ARROW)) {
        force = p5.Vector.fromAngle(radians(heading));
        playerVel.add(force.mult(0.2));
        boostColor = color(0, 255, 0);
    }

    if (player.x > 800) {
        player.x = 0
    }
    if (player.x < 0) {
        player.x = 800
    }
    if (player.y > 800) {
        player.y = 0
    }
    if (player.y < 0) {
        player.y = 800
    }
    playerVel.mult(0.978);
    player.add(playerVel);

    touch = false;

    for (var i = 0; i < bubble.length; i++) {
        push();

            if (dist(bubble[i].x, bubble[i].y, player.x, player.y) < bubbleSize / 2) {
                touch = true;
            }
            bubble[i].add(bubbleVel[i]);

            if (bubble[i].x > width + bubbleSize / 2) {
                bubble[i].x = 0
            }
            if (bubble[i].x < -bubbleSize / 2) {
                bubble[i].x = 400
            }
            if (bubble[i].y > height + bubbleSize / 2) {
                bubble[i].y = 0
            }
            if (bubble[i].y < -bubbleSize / 2) {
                bubble[i].y = 400
            }

            fill(132, 112, 255, 45)
            stroke(255);
            ellipse(bubble[i].x, bubble[i].y, bubbleSize);
        pop();
    }
    

    push();
        translate(player.x, player.y);
        rotate(radians(heading));

        fill(boostColor)
        triangle(-size + 2, size * .7, -size * 3.5, size / 7, size * -.7, -size * .7);

        fill(playerColor);
        triangle(-size + 1, -size + 1, size + 1, 0, -size + 1, size + 1);
    pop();
    

    textSize(30);
    textAlign(CENTER, TOP);
    fill(255);
    text(Health, player.x, player.y + 25)

    fill(255);
    text(Score, 25, 25);

   
  if (touch == true) {
    playerColor = color(255, 0, 0);
    Health--;
} else {
    playerColor = color(255);
}







if (keyIsDown) {

  if (keyCode == 32) {
    lasers.push(createVector(player.x, player.y));
    laserVel.push(p5.Vector.fromAngle(radians(heading)).mult(7));
  } 
}

for (var i = 0; i < lasers.length; i++) {

  for (var z = 0; z < bubble.length; z++) {
      if (dist(lasers[i].x, lasers[i].y, bubble[z].x, bubble[z].y) < bubbleSize / 2) {
          bubble[z] = createVector(random(0, width), random(0, height));
          bubbleVel[z] = p5.Vector.random2D().mult(random(0.25, 2.25));
          Score++;
      }
  }
  lasers[i].add(laserVel[i]);

  push();
      stroke(255,0,0);
      point(lasers[i].x,lasers[i].y);
      line(lasers[i].x, lasers[i].y, lasers[i].x + laserVel[i].x * 4, lasers[i].y + laserVel[i].y * 4)
  pop();
}

}


