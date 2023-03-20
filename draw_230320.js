let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let xValue = 0;
let yValue = 0;

//Make data
let linePts = [];
linePts.push(new THREE.Vector2(50, 50));
linePts.push(new THREE.Vector2(150, 200));

linePts.push(new THREE.Vector2(50, 250));
linePts.push(new THREE.Vector2(350, 250));

linePts.push(new THREE.Vector2(50, 50));
linePts.push(new THREE.Vector2(150, 200));

let boxPts = [];

boxPts.push(new THREE.Vector2(100, 100));
boxPts.push(new THREE.Vector2(300, 300));


function draw_line(p0, p1) {
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
}

function draw_point(p) {
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
    ctx.fill();
}

function draw_box(minPt, maxPt) {
    let p0 = new THREE.Vector2(minPt.x, minPt.y);
    let p1 = new THREE.Vector2(minPt.x, maxPt.y);
    let p2 = new THREE.Vector2(maxPt.x, maxPt.y);
    let p3 = new THREE.Vector2(maxPt.x, minPt.y);
    draw_line(p0, p1);
    draw_line(p1, p2);
    draw_line(p2, p3);
    draw_line(p3, p0);
}

function draw_circle(ctr, radius) {
    ctx.beginPath();
    ctx.arc(ctr.x, ctr.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function draw_image() {
    ctx.strokeStyle = "blue";
    draw_line(linePts[0], linePts[1]);
    ctx.strokeStyle = "red";
    draw_line(linePts[2], linePts[3]);
    ctx.strokeStyle = "green";
    draw_box(boxPts[0], boxPts[1])
    ctx.strokeStyle = "black";
    draw_circle(new THREE.Vector2(230 + xValue, 230 + yValue), 110);
}

function line_line_intersection(p0, p1, p2, p3) {
    // y=ax+b : 직선의 방정식
    // a:기울기 : y증가량 / x증가량
    // y=a0x+b0  y=a1x+b1
    let a0 = (p1.y - p0.y) / (p1.x - p0.x);
    let b0 = p0.y - a0 * p0.x;

    let a1 = (p3.y - p2.y) / (p3.x - p2.x);
    let b1 = p2.y - a1 * p2.x;

    //직선의 교점? a0x+b0=a1x+b1 --> (a0-a1)x = b1 -b0
    let intersectionX = (b1 - b0) / (a0 - a1);
    let intersectionY = a0 * intersectionX + b0;

    if (p0.x > intersectionX || p1.x < intersectionX)
        return;
    if (p2.x > intersectionX || p3.x < intersectionX)
        return;
    if (p0.y > intersectionY || p1.y < intersectionY)
        return;
    if (p2.y > intersectionY || p3.y < intersectionY)
        return;

    let intersectionPt = new THREE.Vector2(intersectionX, intersectionY);
    draw_point(intersectionPt);
}

function line_box_intersection(lineP0, lineP1, boxMinPt, boxMaxPt) {
    //Need to write...

    //꼭지점 먼저 구하기
    //라인 구하고 하나의 라인과 4개의 라인의 인터섹션 구하기
    //라인-라인 인터섹션 4번
    //x,y축 평행선 따로 예외처리

    //직선
    let a0 = (lineP1.y - lineP0.y) / (lineP1.x - lineP0.x);
    let b0 = lineP0.y - a0 * lineP0.x;
    
    //사각형
    //y= t=a0x+b0
    //x = (t-b0)/a0
    let boxP0 = new THREE.Vector2(boxMinPt.x, boxMinPt.y); //좌상
    let boxP1 = new THREE.Vector2(boxMaxPt.x, boxMinPt.y); //우상
    let boxP2 = new THREE.Vector2(boxMaxPt.x, boxMinPt.y); //좌하
    let boxP3 = new THREE.Vector2(boxMaxPt.x, boxMaxPt.y); //우하

    //교점
    line_line_intersection(lineP0,lineP1,boxP0,boxP1);
    line_line_intersection(lineP0,lineP1,boxP0,boxP2);
    line_line_intersection(lineP0,lineP1,boxP1,boxP3);
    line_line_intersection(lineP0,lineP1,boxP2,boxP3);
}

function line_circle_intersection(lineP0, lineP1, circleCtr, circleRadius) {
    //Need to write...
}

function box_circle_intersection(boxMinPt, boxMaxPt, circleCtr, circleRadius) {
    //Need to write...
}

//Keyboard Input
function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        xValue += 5;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        xValue -= 5;
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        yValue -= 5;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        yValue += 5;
    }
}

//Animation Callback
function clear(){
    ctx.clearRect(0, 0, c.width, c.height);
}
function update(){
    clear();
    draw_image();
    requestAnimationFrame(update);
}
update();
document.addEventListener('keydown', keyDown);