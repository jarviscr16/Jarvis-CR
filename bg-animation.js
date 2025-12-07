const c = document.getElementById("bg-canvas");
const ctx = c.getContext("2d");

function resize() {
  c.width = innerWidth;
  c.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const crowns = Array.from({ length: 60 }, () => ({
  x: Math.random() * c.width,
  y: Math.random() * c.height,
  s: 10 + Math.random() * 15,
  sp: 0.3 + Math.random(),
  r: Math.random() * Math.PI
}));

function drawCrown(x, y, s, r) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(r);
  ctx.beginPath();
  ctx.moveTo(-s, 0);
  ctx.lineTo(-s / 2, -s);
  ctx.lineTo(0, -s / 2);
  ctx.lineTo(s / 2, -s);
  ctx.lineTo(s, 0);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,210,76,.25)";
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#FFD24C";
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, c.width, c.height);
  crowns.forEach(o => {
    o.y -= o.sp;
    if (o.y < -50) o.y = c.height + 50;
    drawCrown(o.x, o.y, o.s, o.r += .002);
  });
  requestAnimationFrame(animate);
}
animate();
