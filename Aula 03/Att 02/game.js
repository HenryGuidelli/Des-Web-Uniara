const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const keys = {
  left: false,
  right: false,
  up: false,
};

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") keys.left = true;
  if (e.code === "ArrowRight") keys.right = true;
  if (e.code === "Space" || e.code === "ArrowUp") keys.up = true;
});

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") keys.left = false;
  if (e.code === "ArrowRight") keys.right = false;
  if (e.code === "Space" || e.code === "ArrowUp") keys.up = false;
});

const player = {
  x: 50,
  y: 0,
  width: 30,
  height: 30,
  dx: 0,
  dy: 0,
  speed: 3,
  gravity: 0.8,
  jumpForce: -12,
  onGround: false,
};

const platforms = [
  { x: 0, y: 370, width: 800, height: 30 }, // chão
  { x: 200, y: 300, width: 100, height: 10 },
  { x: 400, y: 250, width: 100, height: 10 },
  { x: 600, y: 200, width: 100, height: 10 },
];

function update() {
  player.dx = 0;

  if (keys.left) player.dx = -player.speed;
  if (keys.right) player.dx = player.speed;

  player.dy += player.gravity;

  if (keys.up && player.onGround) {
    player.dy = player.jumpForce;
    player.onGround = false;
  }

  player.x += player.dx;
  player.y += player.dy;

  player.onGround = false;

  for (let platform of platforms) {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height < platform.y + 10 &&
      player.y + player.height + player.dy >= platform.y
    ) {
      player.y = platform.y - player.height;
      player.dy = 0;
      player.onGround = true;
    }
  }

  if (player.y > canvas.height) {
    player.x = 50;
    player.y = 0;
    player.dy = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Platforms
  ctx.fillStyle = "#888";
  for (let platform of platforms) {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
