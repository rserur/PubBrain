PShape s;

void setup() {
  size(800, 600);
  // The file "bot.svg" must be in the data folder
  // of the current sketch to load successfully
  s = loadShape("Lobes.svg");
}

void draw() {
  background(0, 0, 0);
  shape(s, 100, 100, 600, 400);
}

