// Constants
const BACKGROUND_COLOR = "black";
const CUBE_COLOR = "green";

const ROTATION_X_SPEED = 0.01;
const ROTATION_Y_SPEED = 0.5;
const ROTATION_Z_SPEED = 0.25;

const Vector3 = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}

// Document elements
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Get width and height sets the canvas width and height.
let w = document.documentElement.clientWidth;
let h = document.documentElement.clientHeight;

canvas.width = w;
canvas.height = h;

// Set color and lines
ctx.fillStyle = BACKGROUND_COLOR;
ctx.strokeStyle = CUBE_COLOR;
ctx.lineWidth = w / 200;
ctx.lineCap = "round";

// Cube parameters
let xCenter = w / 2;
let yCenter = h / 2;
let zCenter = 0;
let size = h / 4;

let vertices = [
    new Vector3(xCenter - size, yCenter - size, zCenter - size),
    new Vector3(xCenter + size, yCenter - size, zCenter - size),
    new Vector3(xCenter + size, yCenter + size, zCenter - size),
    new Vector3(xCenter - size, yCenter + size, zCenter - size),
    new Vector3(xCenter - size, yCenter - size, zCenter + size),
    new Vector3(xCenter + size, yCenter - size, zCenter + size),
    new Vector3(xCenter + size, yCenter + size, zCenter + size),
    new Vector3(xCenter - size, yCenter + size, zCenter + size)
];

let edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Back face
    [4, 5], [5, 6], [6, 7], [7, 4], // Front face
    [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting sides
];

// Cube rotation loop
let deltaTime;
let lastTime = 0;

requestAnimationFrame(Loop);

function Loop(nowTime) {
    deltaTime = nowTime - lastTime;
    lastTime = nowTime;

    // Fill background
    ctx.fillRect(0, 0, w, h);

    // Draw rotate the bute z axis
    let angle = 0.002 * ROTATION_Z_SPEED * Math.PI * deltaTime;

    for (let v of vertices) {
        let dx = v.x - xCenter;
        let dy = v.y - yCenter;
        let x = dx * Math.cos(angle) - dy * Math.sin(angle);
        let y = dx * Math.sin(angle) + dy * Math.cos(angle);

        v.x = x + xCenter;
        v.y = y + yCenter;
    }

    // Draw rotate the bute y axis
    angle = 0.002 * ROTATION_Y_SPEED * Math.PI * deltaTime;

    for (let v of vertices) {
        let dx = v.x - xCenter;
        let dz = v.z - zCenter;
        let x = dz * Math.sin(angle) + dx * Math.cos(angle);
        let z = dz * Math.cos(angle) - dx * Math.sin(angle);

        v.x = x + xCenter;
        v.z = z + zCenter;
    }

    // Draw rotate the bute x axis
    angle = 0.002 * ROTATION_X_SPEED * Math.PI * deltaTime;

    for (let v of vertices) {
        let dy = v.y - yCenter;
        let dz = v.z - zCenter;
        let y = dy * Math.cos(angle) - dz * Math.sin(angle);
        let z = dy * Math.sin(angle) + dz * Math.cos(angle);
        v.y = y + yCenter;
        v.z = z + zCenter;
    }

    // Draw each edge
    for (let edge of edges) {
        ctx.beginPath();
        ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
        ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
        ctx.stroke();
    }

    requestAnimationFrame(Loop);
}