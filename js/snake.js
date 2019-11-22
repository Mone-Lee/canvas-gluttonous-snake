/**
 * 蛇类
 */

// 记录蛇头的坐标，运动方向, 长度
function Snake(x, y, len) {
  this.x = x;
  this.y = y;
  this.len = len || 0;
  this.dir = 'L'; // 初始化方向为向左
  this.arr = [];
}

// 初始化蛇，初始长度为5
Snake.prototype.init = function() {
  for(let i=0; i<5; i++) {
    this.add();
    this.drawBlock(this.arr[i]);
  }
  console.log(this.arr);
}

// 添加蛇身圆
Snake.prototype.add = function(newNode) {
  let x = 0;
  let y = 0;
  if(this.len === 0) {
    x = parseInt(cnv.width / 2);
    y = parseInt(cnv.height / 2);
  }else if(this.len === 1) {
    x = parseInt(cnv.width / 2) + 2 * gridWidth;
    y = parseInt(cnv.height / 2);
  }else {
    let last = this.arr[this.len - 1];
    let plast = this.arr[this.len - 2];

    px = last.x - plast.x;
    py = last.y - plast.y;

    x = last.x + px;
    y = last.y + py;
  }

  let color = newNode ? newNode.color : getRandomColor();
  this.len++;
  this.arr.push({x: x, y: y, color: color});
}

// 画蛇身
Snake.prototype.drawBlock = function(node) {
  cxt.beginPath();
  cxt.arc(node.x, node.y, gridWidth, 0, 360 * Math.PI / 180, false);
  cxt.fillStyle = node.color;
  cxt.fill();
  // cxt.closePath();
}