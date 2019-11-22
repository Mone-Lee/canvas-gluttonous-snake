/** 
 * 通用方法
 */

const $$ = function(id) {
	return document.getElementById(id);
}

var cnv = $$('canvas');
var cxt = cnv.getContext('2d');

// 食物半径
var gridWidth = 20;

//获取随机颜色值
function getRandomColor(){
  return '#' +
  (function (color) {
      return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
      && (color.length == 6) ? color : arguments.callee(color);
  })('');
}