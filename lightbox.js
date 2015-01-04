var images = [];
document.write(
  "<div id=lbdiv><img id=lbimg src=''></div>" +
  "<div id=black></div>" +
  "<div id=spinnerdiv><center><img id=spinnerimg src='/spinner.gif'></center></div>" +
  "<style>" +
  "#lbdiv {" +
  "   display: none;" +
  "   width: 100%;" +
  "   height: 100%;" +
  "   background-color: black;" +
  "   margin: 0;" +
  "   padding: 0;" +
  "   position: fixed;" +
  "   top: 0;" +
  "   left: 0;" +
  "   z-index: 2;" +
  "}" +
  "#black {" +
  "   margin: 0;" +
  "   padding: 0;" +
  "   display: none;" +
  "   width: 100%;" +
  "   height: 200%;" +
  "   position: fixed;" +
  "   background-color: black;" +
  "   z-index: 1;" +
  "}" +
  "#lbimg {" +
  "   margin: 0;" +
  "   padding: 0;" +
  "   position: relative;" +
  "}" +
  "#spinnerdiv {" +
  "   display: none;" +
  "   position: absolute;" +
  "   top: 0;" +
  "   left: 0;" +
  "   z-index: 3;" +
  "}" +
  "</style>");
var lbdiv = document.getElementById("lbdiv");
var black = document.getElementById("black");
var spinnnerdiv = document.getElementById("spinnnerdiv");
var lbimg = document.getElementById("lbimg");
var img_index = 0;
var accept_keys = false;

function lightbox(initial_index) {
  oldscroll = window.pageYOffset;
  console.log(window.pageYOffset);
  window.scrollTo(0, 0);
  images = [];
  img_index = initial_index;
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.children.length == 1 &&
        link.children[0].tagName == "IMG") {
       images.push(link);
    }
  }
  lbdiv.style.display = 'block';
  black.style.display = 'block';
  update_image();
}

function left() {
  img_index--;
  update_image();
}

function right() {
  img_index++;
  update_image();
}

function update_image() {
  if (img_index < 0 || img_index >= images.length) {
    lbimg.src='';
    done_loading();
    lbdiv.style.display = 'none';
    black.style.display = 'none';
    accept_keys = false;
    window.scrollTo(0, oldscroll);
    return;
  }
  accept_keys = true;
  loading();
  lbimg.onload = done_loading;
  lbimg.src = images[img_index];
  lbimg.style.left = "0px";
  lbimg.style.top = "0px";
  lbimg.style.display = "none";
}

function done_loading() {
  spinnerdiv.style.display = "none";

  available_width = lbdiv.clientWidth;
  available_height = lbdiv.clientHeight;

  image_native_width = lbimg.width;
  image_native_height = lbimg.height;

  width_ratio = image_native_width / available_width;
  height_ratio = image_native_height / available_height;

  if (width_ratio > height_ratio) {
    lbimg.style.height = "";
    lbimg.style.width = available_width + "px";
    lbimg.style.left = "0px";
    lbimg.style.top = ((available_height - (image_native_height/width_ratio)) / 2) + "px";
  } else {
    lbimg.style.width = "";
    lbimg.style.height = available_height + "px";
    lbimg.style.top = "0px";
    lbimg.style.left = ((available_width - (image_native_width/height_ratio)) / 2) + "px";
  }
  lbimg.style.display = "block";
}

function loading() {
  spinnerdiv.style.display = "block";
}

function hide_lightbox() {
  img_index = -1;
  update_image();
}

document.onkeydown = function(event) {
  if (!accept_keys) {
    return;
  }
  if (!event) {
    event = window.event;
  }
  var code = event.keyCode;
  if (event.charCode && code == 0) {
    code = event.charCode;
  }
  switch(code) {
    case 37: // left
      left();
      break;
    case 39: // right
      right();
      break;
    case 81: // q
      hide_lightbox();
      break;
  }
  event.preventDefault();
};

document.onmouseup = function(event) {
   if (!accept_keys) {
      return;
   }
   if (!event) {
     event = window.event;
   }
   hide_lightbox();
   event.preventDefault();
}

var oldscroll = 0;

function load_lightbox_at_point(n) {
  return function() {
    lightbox(n);
    return false;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var links = document.getElementsByTagName("a");
  var n = 0;
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.children.length == 1 &&
        link.children[0].tagName == "IMG") {
      link.onclick = load_lightbox_at_point(n);
      n++;
    }
  }
});
