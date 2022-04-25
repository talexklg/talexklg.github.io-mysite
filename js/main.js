/* Carousel - Карусель */
let radius = 500;
let autoRotate = true;
let rotateSpeed = -60;
let imgWidth = 200;
let imgHeight = 140;
setTimeout(init, 300);
let odrag = document.getElementById("drag-container");
let ospin = document.getElementById("spin-container");
let carousel = document.getElementById("carousel");
let aImg = ospin.getElementsByTagName("a");
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";
let ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";
function init(delayTime) {
  for (let i = 0; i < aImg.length; i++) {
    aImg[i].style.transform =
      "rotateY(" +
      i * (360 / aImg.length) +
      "deg) translateZ(" +
      radius +
      "px)";
    aImg[i].style.transition = "transform 1s";
    aImg[i].style.transitionDelay = delayTime || (aImg.length - i) / 4 + "s";
  }
}
function applyTranform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;
  obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}
function playSpin(yes) {
  ospin.style.animationPlayState = yes ? "running" : "paused";
}
let sX,
  sY,
  nX,
  nY,
  desX = 0,
  desY = 0,
  tX = 0,
  tY = 10;
if (autoRotate) {
  let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
  ospin.style.animation = `${animationName} ${Math.abs(
    rotateSpeed
  )}s infinite linear`;
}
carousel.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  let sX = e.clientX,
    sY = e.clientY;
  this.onpointermove = function (e) {
    e = e || window.event;
    let nX = e.clientX,
      nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };
  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };
  return false;
};
/* End Carousel - Конец карусели */

function Calendar4(id, year, month) {
  Date.prototype.getWeek = function () {
    var target = new Date(this.valueOf());
    var dayNr = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
  };

  var Dlast = new Date(year, parseFloat(month) + 1, 0).getDate(),
    D = new Date(year, month, Dlast),
    DNlast = D.getDay(),
    DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
    m = document.querySelector(
      "#" + id + ' option[value="' + D.getMonth() + '"]'
    ),
    g = document.querySelector("#" + id + " input");

  if (new Date(D.getFullYear(), D.getMonth(), 1).getWeek() < 10) {
    calendar =
      "<tr><td>0" + new Date(D.getFullYear(), D.getMonth(), 1).getWeek();
  } else {
    calendar =
      "<tr><td>" + new Date(D.getFullYear(), D.getMonth(), 1).getWeek();
  }

  if (DNfirst != 0) {
    for (var i = 1; i < DNfirst; i++) calendar += "<td>";
  } else {
    for (var i = 0; i < 6; i++) calendar += "<td>";
  }

  for (var i = 1; i <= Dlast; i++) {
    if (
      i == new Date().getDate() &&
      D.getFullYear() == new Date().getFullYear() &&
      D.getMonth() == new Date().getMonth()
    ) {
      calendar += '<td class="today">' + i;
    } else {
      if (
        (i == 1 &&
          D.getMonth() == 0 &&
          ((D.getFullYear() > 1897 && D.getFullYear() < 1930) ||
            D.getFullYear() > 1947)) ||
        (i == 2 && D.getMonth() == 0 && D.getFullYear() > 1992) ||
        ((i == 3 || i == 4 || i == 5 || i == 6 || i == 8) &&
          D.getMonth() == 0 &&
          D.getFullYear() > 2004) ||
        (i == 7 && D.getMonth() == 0 && D.getFullYear() > 1990) ||
        (i == 23 && D.getMonth() == 1 && D.getFullYear() > 2001) ||
        (i == 8 && D.getMonth() == 2 && D.getFullYear() > 1965) ||
        (i == 1 && D.getMonth() == 4 && D.getFullYear() > 1917) ||
        (i == 9 && D.getMonth() == 4 && D.getFullYear() > 1964) ||
        (i == 12 && D.getMonth() == 5 && D.getFullYear() > 1990) ||
        (i == 7 &&
          D.getMonth() == 10 &&
          D.getFullYear() > 1926 &&
          D.getFullYear() < 2005) ||
        (i == 8 &&
          D.getMonth() == 10 &&
          D.getFullYear() > 1926 &&
          D.getFullYear() < 1992) ||
        (i == 4 && D.getMonth() == 10 && D.getFullYear() > 2004)
      ) {
        calendar += '<td class="holiday">' + i;
      } else {
        calendar += "<td>" + i;
      }
    }
    if (
      new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0 &&
      i != Dlast
    ) {
      if (new Date(D.getFullYear(), D.getMonth(), i).getWeek() < 9) {
        calendar +=
          "<tr><td>0" +
          new Date(D.getFullYear(), D.getMonth(), i + 1).getWeek();
      } else {
        calendar +=
          "<tr><td>" + new Date(D.getFullYear(), D.getMonth(), i + 1).getWeek();
      }
    }
  }

  if (DNlast != 0) {
    for (var i = DNlast; i < 7; i++) calendar += "<td>";
  }

  document.querySelector("#" + id + " tbody").innerHTML = calendar;
  g.value = D.getFullYear();
  m.selected = true;

  if (document.querySelectorAll("#" + id + " tbody tr").length < 6) {
    document.querySelector("#" + id + " tbody").innerHTML +=
      "<tr><td>&nbsp;<td><td><td><td><td><td><td>";
  }

  document.querySelector(
    "#" + id + ' option[value="' + new Date().getMonth() + '"]'
  ).style.color = "rgb(220, 0, 0)";
}

Calendar4("calendar4", new Date().getFullYear(), new Date().getMonth());
document.querySelector("#calendar4").onchange = function Kalendar4() {
  Calendar4(
    "calendar4",
    document.querySelector("#calendar4 input").value,
    document.querySelector("#calendar4 select").options[
      document.querySelector("#calendar4 select").selectedIndex
    ].value
  );
};

// Create a JavaScript Date object for the current date and time, and set the desired options.
function clockTick()    {
var date = new Date(),
  options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
// Convert to locale string and add a locale and the options
date = date.toLocaleString("ru-RU", options);

// Output the date to the above HTML element
document.getElementById("date").innerHTML = date;  
}
setInterval(function(){clockTick();}, 1000);

