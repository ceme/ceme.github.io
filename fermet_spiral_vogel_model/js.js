var count = 5000; //number of dots
var size = 1; //size of dots
var c = 3; //constant scaling factor

var golden_angle = 137.508;
//var golden_angle = 140.2554;

function radiusFermat(n) {
  return c * Math.sqrt(n);
}

function angleFermat(n) {
  return n * golden_angle;
}

function describeFermatPoint(n) {
  return polarToCartesian(200, 200, radiusFermat(n), angleFermat(n));
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function createFermatPlot(l) {
  var set = [];
  for (var i = 0; i <= l; i++) {
    set[i] = describeFermatPoint(i);
  }
  return set;
}

function renderCircles(set) {
  for (var i = 1; i < set.length; i++) {
    var p =  describeFermatPoint(i);
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("id", "circle" + i);
    circle.setAttribute("fill", "red");
    circle.setAttribute("r", size);
    circle.setAttribute("cx", set[i].x);
    circle.setAttribute("cy", set[i].y);
    document.getElementById("svg-id").appendChild(circle);
  }
}

/*==========arc=========*/
function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

/*==========slider controls=========*/
var maxSafe = Number.MAX_SAFE_INTEGER;
function getMaxCount() {
  return Math.round(Number.MAX_SAFE_INTEGER / 10000000);
}

function getSliderCount() {
  return document.getElementById('sliderCount').value;
}

function getSliderSize() {
  return document.getElementById('sliderSize').value;
}

function getSliderScale() {
  return document.getElementById('sliderScale').value;
}



var listener = function(id) {
  window.requestAnimationFrame(function() {
    count = getSliderCount();
    size = getSliderSize();
    c = getSliderScale();
    var svgCon = document.getElementById("svg-id")
    while (svgCon.firstChild) {
      svgCon.removeChild(svgCon.firstChild);
    }
    renderCircles(createFermatPlot(count));
  });
};

function attachSliderEvents(ids) {
  for (var id in ids) {
    var rng = document.getElementById(ids[id]);
    rng.addEventListener("mousedown", function() {
      listener();
      rng.addEventListener("mousemove", listener);
    });
    rng.addEventListener("mouseup", function() {
      rng.removeEventListener("mousemove", listener);
    });  
  }
}


window.onload = function() {
  
  /*====attach slider events =====*/
  attachSliderEvents(["sliderCount","sliderSize","sliderScale"]);

  /*====render plot=====*/
  renderCircles(createFermatPlot(count));

  /*====render arc=====*/
  document.getElementById("arc1").setAttribute("d", describeArc(200, 200, 100, 0, 270));

};
