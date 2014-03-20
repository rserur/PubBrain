PShape lobes;

void setup() {
  size(800, 600);
  lobes = loadShape("Lobes.svg");
}

void draw() {
  background(0, 0, 0);
  shape(lobes, 100, 100, 600, 400);
}

void mousePressed() {
 // enlarge shape when mouse pressed?
 lobes.scale(1.5);
}


