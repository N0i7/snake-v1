/* hintergrund leinwand in 2d */
let canvas = document.getElementById("canvas"); //erzeugt das canvas im html-file
let ctx = canvas.getContext("2d"); // lässt den content in 2d erscheinen. webgl macht 3d->browsersensitive

/*  //bitmaprenderer -> bild als "leinwand" */

/* variablen */
let rows = 20;
let cols = 20;
let snake = [{ x: 9, y: 3 }];
let food = { x: 5, y: 5 };
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = "UP";
let foodCollected = false;

placeFood();
/* bewegung */
setInterval(
  gameLoop,
  300
); /* //ermöglicht im fenster loops mit zeitabstand. alle 200ms gameLoop ausführen */

document.addEventListener(
  "keydown",
  keyDown
); /* // HTML-DOM.  lässt tastatur fürs html zu */

/* malfunktion ausführen */
draw();

function draw() {
  ctx.fillStyle = "lightgrey";
  ctx.fillStyle(0, 0, canvas.width, canvas.height);
  /* //Leinwand
   */
  ctx.fillStyle = "white";
  snake.forEach((part) => add(part.x, part.y));

  ctx.fillStyle = "lightgreen";
  add(food.x, food.y); /* //futter */

  requestAnimationFrame(
    draw
  ); /* //macht den ablauf flüssiger. gut für mobile. schont cpu .nach aufrufen von draw, nochmal draw aufrufen */
}
/* 
 //futter wird random auf dem canvas verteilt */
function placeFood() {
  let randomX = Math.floor(Math.random() * cols);
  let randomY = Math.floor(Math.random() * rows);

  food = { x: randomX, y: randomY };
}

function add(x, y) {
  ctx.fillStyle(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
}
/*  //Schlange updaten
 //jedes mal wird die länge der schlange vergrößert */
function shiftSnake() {
  for (let i = snake.length - 1; i > 0; i--) {
    const part = snake[i];
    const lastPart = snake[i - 1];
    part.x = lastPart.x;
    part.y = lastPart.y;
  }
}

function gameLoop() {
  testGameOver();
  shiftSnake(); /* //schlange stacken */
  if (foodCollected == true) {
    snake = [
      { x: snake[0].x, y: snake[0].y },
      ...snake,
    ]; /* //immer ein glied mehr->schlange wächst unendlich */
    foodCollected = false;
  }
  /*  //auf der x-achse bewegen */
  if (direction == "LEFT") {
    snake[0].x--;
  }
  if (direction == "RIGHT") {
    snake[0].x++;
  }
  if (direction == "UP") {
    snake[0].y--;
  }
  if (direction == "DOWN") {
    snake[0].y++;
  }
  /*    //wenn x,y-achse stimmen dann essen und neu food pos. */
  if (snake[0].x == food.x && snake[0].y == food.y) {
    /*   //futter wird eingesammelt */
    foodCollected = true;
    placeFood();
  }
}
/*  //bewegung der schlange vorgeben bei tastendruck
 */ function keyDown(e) {
  /*  //keyCodes werden von JS vorgegeben */
  if (e.keyCode == 37) {
    direction = "LEFT";
  }
  if (e.keyCode == 38) {
    direction = "UP";
  }
  if (e.keyCode == 39) {
    direction = "RIGHT";
  }
  if (e.keyCode == 40) {
    direction = "DOWN";
  }
}
function testGameOver() {
  let firstPart = snake[0];
  let otherParts = snake.slice(1); // array wo das erste teil der schlange fehlt
  let duplicatePart = otherParts.find(
    (part) => part.x == firstPart.x && part.y == firstPart.y
  ); //wenn die koordinaten sich treffen

  //wand
  if (
    snake[0].x < 0 ||
    snake[0].x > cols - 1 ||
    snake[0].y < 0 ||
    snake[0].y > rows - 1 ||
    duplicatePart // wenn sich die koordinaten treffen
  ) {
    placeFood(); //food neu
    snake = [{ x: 9, y: 3 }]; // start posistion
    direction = "LEFT";
  }
}
