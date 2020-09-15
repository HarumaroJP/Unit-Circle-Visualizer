const unit = 100;
let radianUnit;
let dgreesUnit;
let originX;
let originY;
let showGrid = false;
let myFont;
let theta = 0;

function preload() {
  myFont = loadFont("assets/CrimsonText-Regular.ttf");
}

function setup() {
  radianUnit = PI / 180;
  dgreesUnit = 180 / PI;
  createCanvas(windowWidth, windowHeight);
  fullscreen();

  originX = windowWidth / 2;
  originY = windowHeight / 2;

  createNativeSlider();
}

function draw() {
  createGrid(showGrid);
}

function createGrid(showSubGrid) {
  background(240);
  strokeWeight(2);

  stroke("rgb(0%, 83.9%, 24.5%)");
  fill("rgb(0%, 83.9%, 24.5%)");
  line(originX, 0, originX, windowHeight);
  triangle(originX, 0, originX - 5, 0 + 18, originX + 5, 0 + 18);

  strokeWeight(0);
  textFont(myFont);
  textSize(30);
  text("y", originX + 15, 0 + 30);

  strokeWeight(2);
  stroke("rgb(38.5%, 67.8%, 85.1%)");
  fill("rgb(38.5%, 67.8%, 85.1%)");
  line(0, originY, windowWidth, originY);
  triangle(
    windowWidth,
    originY,
    windowWidth - 18,
    originY - 5,
    windowWidth - 18,
    originY + 5
  );

  strokeWeight(0);
  textFont(myFont);
  textSize(30);
  text("x", windowWidth - 30, originY + 30);

  let mainRadius = unit * 2.5;
  let textOffsetX = 10;
  let textOffsetY = 30;
  stroke(240);
  strokeWeight(7);
  fill("rgb(0%, 0%, 0%)");
  text("1", originX + mainRadius + textOffsetX, originY + textOffsetY);
  text("-1", originX - mainRadius - textOffsetX - 20, originY + textOffsetY);

  if (showSubGrid) {
    strokeWeight(1);
    stroke(150);
    let offset = 0;
    while (originX + offset <= windowWidth) {
      offset += unit;
      line(originX + offset, 0, originX + offset, windowHeight);
      line(originX - offset, 0, originX - offset, windowHeight);
    }

    offset = 0;
    while (originY + offset <= windowWidth) {
      offset += unit;
      line(0, originY + offset, windowWidth, originY + offset);
      line(0, originY - offset, windowWidth, originY - offset);
    }
  }

  strokeWeight(8);
  stroke("rgb(95.6%, 25.7%, 26%)");
  point(originX, originY);

  createUnitCircle();
}

let mainRadius = unit * 2.5;
let subRadius = 60;
let heightX;
let widthY;
function createUnitCircle() {
  let radian = theta * -radianUnit;
  fill("rgba(0, 0, 0, 0)");
  strokeWeight(2);
  stroke("black");
  circle(originX, originY, mainRadius * 2);

  heightX = mainRadius * cos(radian);
  widthY = mainRadius * sin(radian);
  let vecX = originX + mainRadius * cos(radian);
  let vecY = originY + mainRadius * sin(radian);
  line(originX, originY, vecX, vecY);
  triangle(originX, originY, vecX, vecY, vecX, originY);
  arc(originX, originY, subRadius, subRadius, radian, 0);

  strokeWeight(8);
  stroke("rgb(95.6%, 25.7%, 26%)");
  point(originX, originY);
  point(vecX, vecY);
  point(vecX, originY);

  strokeWeight(7);
  stroke(240);
  fill("rgb(0%, 0%, 0%)");
  text("θ = ", originX + 50, originY + 395);
  text(
    "θ",
    originX + (subRadius - 8) * cos(radian / 2) - 7,
    originY + (subRadius - 8) * sin(radian / 2) + 10
  );
}

function createNativeSlider() {
  let length;
  let offsetX;
  let offsetY;

  length = 200;
  offsetX = -(length / 2 + 70);
  offsetY = -90;
  let slider = document.createElement("input");
  slider.type = "range";
  slider.id = "thetaSlider";
  slider.onchange = updateThetaField;
  slider.oninput = updateThetaField;
  slider.min = 0;
  slider.max = 360;
  slider.value = 0;
  let tmpStyle = slider.style;
  tmpStyle.position = "absolute";
  tmpStyle.left = originX + offsetX + "px";
  tmpStyle.top = windowHeight + offsetY + "px";
  tmpStyle.width = length + "px";
  document.body.appendChild(slider);
  thetaSlider = slider;

  length = 50;
  offsetX = 98;
  offsetY = -98;
  let inputField = document.createElement("input");
  inputField.id = "thetaValue";
  inputField.onchange = updateSlider;
  inputField.value = "0°";
  tmpStyle = inputField.style;
  tmpStyle.position = "absolute";
  tmpStyle.left = originX + offsetX + "px";
  tmpStyle.top = windowHeight + offsetY + "px";
  tmpStyle.width = length + "px";
  document.body.appendChild(inputField);
  thetaValue = inputField;

  offsetX = 300;
  offsetY = -320;
  let circleInfo_tmp = document.createElement("div");
  circleInfo_tmp.id = "circleInfo";
  circleInfo_tmp.innerHTML =
    "<ul>" +
    "<li>$sin0°=0$</li>" +
    "<li>$cos0°=1$</li>" +
    "<li>$tan0°=0$</li>" +
    "</ul>"; //改行されないからそれを直す
  tmpStyle = circleInfo_tmp.style;
  tmpStyle.position = "absolute";
  tmpStyle.left = originX + offsetX + "px";
  tmpStyle.top = windowHeight + offsetY + "px";
  document.body.appendChild(circleInfo_tmp);
  circleInfo = circleInfo_tmp;
  MathJax.typeset();
}

let thetaValue;
let thetaSlider;
let circleInfo;

function updateThetaField() {
  theta = thetaSlider.value;
  thetaValue.value = theta + "°";

  let radian = theta * radianUnit;
  circleInfo.innerHTML =
    "<ul>" +
    "<li>$sin" +
    theta +
    "°=" +
    "\\frac{" +
    "1" +
    "}{" +
    heightX +
    "}" +
    "$</li>" +
    "<li>$cos" +
    theta +
    "°=" +
    Math.cos(radian) +
    "$</li>" +
    "<li>$tan" +
    theta +
    "°=" +
    Math.tan(radian) +
    "$</li>" +
    "</ul>"; //改行されないからそれを直す
  MathJax.typeset();
}

function updateSlider() {
  theta = thetaValue.value;
  thetaSlider.value = theta;
  thetaValue.value = theta + "°";

  let radian = theta * radianUnit;
  circleInfo.innerHTML =
    "<ul>" +
    "<li>$sin" +
    theta +
    "°=" +
    "\\frac{" +
    "1" +
    "}{" +
    heightX +
    "}" +
    "$</li>" +
    "<li>$cos" +
    theta +
    "°=" +
    Math.cos(radian) +
    "$</li>" +
    "<li>$tan" +
    theta +
    "°=" +
    Math.tan(radian) +
    "$</li>" +
    "</ul>"; //改行されないからそれを直す
  MathJax.typeset();
}
