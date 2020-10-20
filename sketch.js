const unit = 100;
let radianUnit;
let dgreesUnit;
let originX;
let originY;
let showGrid = false;
let myFont;
let theta = 0;

const waveHight = 100.0; // Height of wave
const calcWaveCount = 5;
let waveBufferX1 = [];
let waveBufferY1 = [];
let waveBufferX2 = [];
let waveBufferY2 = [];

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

  // calcWave();
  createNativeSlider();
}

function draw() {
  createGrid(showGrid);
  renderWave();
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
  text("y", originX - 30, 0 + 30);

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

  stroke(240);
  strokeWeight(7);
  fill("rgb(0%, 0%, 0%)");

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
  heightX = mainRadius * cos(radian);
  widthY = mainRadius * sin(radian);
  let vecX = originX + mainRadius * cos(radian);
  let vecY = originY + mainRadius * sin(radian);

  fill("rgba(0, 0, 0, 0)");
  strokeWeight(2);
  stroke("black");
  drawingContext.setLineDash([5, 5]);
  line(vecX, originY, vecX, vecY);
  line(originX, vecY, vecX, vecY);
  drawingContext.setLineDash([1, 1]);

  circle(originX, originY, mainRadius * 2);

  line(originX, originY, vecX, vecY);
  line(originX - mainRadius, originY, originX + mainRadius, originY);
  line(originX, originY - mainRadius, originX, originY + mainRadius);
  // triangle(originX, originY, vecX, vecY, vecX, originY);
  arc(originX, originY, subRadius, subRadius, radian, 0);

  strokeWeight(8);
  stroke("rgb(95.6%, 25.7%, 26%)");
  point(originX, originY);
  point(vecX, vecY);
  // point(vecX, originY);

  strokeWeight(7);
  stroke(240);
  fill("rgb(0%, 0%, 0%)");
  text("θ = ", originX + 50, originY + 395);
  text(
    "θ",
    originX + (subRadius - 8) * cos(radian / 2) - 7,
    originY + (subRadius - 8) * sin(radian / 2) + 10
  );

  let textOffsetX = 10;
  let textOffsetY = 30;
  text("1", originX + mainRadius + textOffsetX, originY + textOffsetY);
  text("-1", originX - mainRadius - textOffsetX - 20, originY + textOffsetY);

  let isSwitchSin =
    (0 <= theta && theta <= 90) || (theta <= 360 && 270 <= theta);

  text("sin θ", originX + (isSwitchSin ? -70 : 10), vecY + 5);

  let isSwitchCos = 0 <= theta && theta <= 180;
  text("cos θ", vecX - 20, originY + (isSwitchCos ? 25 : -20));
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
  circleInfo.innerHTML = setTriangularRatio(radian);
  MathJax.typeset();
}

function updateSlider() {
  theta = thetaValue.value;
  thetaSlider.value = theta;
  thetaValue.value = theta + "°";

  let radian = theta * radianUnit;
  circleInfo.innerHTML = setTriangularRatio(radian);
  MathJax.typeset();
}

let sinDegrees = {
  0: "0",
  30: "\\frac{1}{2}",
  45: "\\frac{1}{\\sqrt{2}}",
  60: "\\frac{\\sqrt{3}}{2}",
  90: "1",
  120: "\\frac{\\sqrt{3}}{2}",
  135: "\\frac{1}{\\sqrt{2}}",
  150: "\\frac{1}{2}",
  180: "0",
  360: "0",
};

let cosDegrees = {
  0: "1",
  30: "\\frac{\\sqrt{3}}{2}",
  45: "\\frac{1}{\\sqrt{2}}",
  60: "\\frac{1}{2}",
  90: "0",
  120: "-\\frac{1}{2}",
  135: "-\\frac{1}{\\sqrt{2}}",
  150: "-\\frac{\\sqrt{3}}{2}",
  180: "-1",
  360: "1",
};

let tanDegrees = {
  0: "0",
  30: "\\frac{1}{\\sqrt{3}}",
  45: "1",
  60: "\\sqrt{3}",
  90: "NaN",
  120: "-\\sqrt{3}",
  135: "-1",
  150: "-\\frac{1}{\\sqrt{3}}",
  180: "0",
  360: "0",
};

function setTriangularRatio(rad) {
  let tmpInner, tmpSin, tmpCos, tmpTan;

  if (sinDegrees[theta] || theta == 360) {
    tmpSin = "<li>$sin" + theta + "°=" + sinDegrees[theta] + "$</li>";
  } else if (sinDegrees[theta - 180]) {
    tmpSin =
      "<li>$sin" + theta + "°=" + "-" + sinDegrees[theta - 180] + "$</li>";
  } else {
    tmpSin =
      "<li>$sin" +
      theta +
      "°=" +
      Math.floor(Math.sin(rad) * 400) / 400 +
      "$</li>";
  }

  if (cosDegrees[theta] || theta == 360) {
    tmpCos = "<li>$cos" + theta + "°=" + cosDegrees[theta] + "$</li>";
  } else if (cosDegrees[theta - 180]) {
    tmpCos =
      "<li>$cos" + theta + "°=" + "-" + cosDegrees[theta - 180] + "$</li>";
  } else {
    tmpCos =
      "<li>$cos" +
      theta +
      "°=" +
      Math.floor(Math.cos(rad) * 400) / 400 +
      "$</li>";
  }

  if (tanDegrees[theta] || theta == 360) {
    tmpTan = "<li>$tan" + theta + "°=" + tanDegrees[theta] + "$</li>";
  } else if (tanDegrees[theta - 180]) {
    tmpTan = "<li>$tan" + theta + "°=" + tanDegrees[theta - 180] + "$</li>";
  } else {
    tmpTan =
      "<li>$tan" +
      theta +
      "°=" +
      Math.floor(Math.tan(rad) * 400) / 400 +
      "$</li>";
  }

  return (tmpInner = "<ul>" + tmpSin + tmpCos + tmpTan + "</ul>");
}

function calcWave() {
  let waveX = 0.0;
  let calcRange = 180 * calcWaveCount;
  while (theta < calcRange) {
    theta += 1.8;
    waveX += 2;

    waveBufferX1.push(waveX + originX);
    waveBufferX2.push(-waveX + originX);
    waveBufferY1.push(sin(theta * radianUnit) * waveHight + originY);
    waveBufferY2.push(sin(-theta * radianUnit) * waveHight + originY);
  }
}

let index = 0;
function renderWave() {
  stroke("black");
  strokeWeight(1.5);

  index++;
  for (let i = 0; i < index; i++) {
    line(
      waveBufferX1[i],
      waveBufferY1[i],
      waveBufferX1[i + 1],
      waveBufferY1[i + 1]
    );
    // ellipse(waveBufferX1[i], waveBufferY1[i], 0.5, 0.5);
    line(
      waveBufferX2[i],
      waveBufferY2[i],
      waveBufferX2[i + 1],
      waveBufferY2[i + 1]
    );
    // ellipse(waveBufferX2[i], waveBufferY2[i], 0.5, 0.5);
  }
}
