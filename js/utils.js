/** 
 * 通用方法
 */

const $$ = function(id) {
	return document.getElementById(id);
}

var cnv = $$('canvas');
var cxt = cnv.getContext('2d');

// 食物半径
var gridWidth = 10;

var center_x = parseInt(cnv.width / 2);
var center_y = parseInt(cnv.height / 2);

var speed = 1;

//获取随机颜色值
function getRandomColor(){
  return '#' +
  (function (color) {
    return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
    && (color.length == 6) ? color : arguments.callee(color);
  })('');
}

//获取鼠标当前位置
function getMouse(element) {
  var mouse = { x: 0, y: 0 };
  element.addEventListener("mousemove", function (e) {
      var x, y;
      var e = e || window.event;
      if (e.pageX || e.pageY) {
          x = e.pageX;
          y = e.pageY;
      }
      else {
          x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      x -= element.offsetLeft;
      y -= element.offsetTop;

      mouse.x = x;
      mouse.y = y;
  }, false);
  return mouse;
}

//动画循环，兼容各大浏览器
window.requestAnimationFrame = (
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function (callback) {
      return window.setTimeout(callback, 1000 / 60);
  }
);