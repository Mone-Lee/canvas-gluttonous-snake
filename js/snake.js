/**
 * 蛇类
 */

// 记录蛇头的坐标，运动方向, 长度
function Snake(x, y, len) {
  this.len = len || 0;
  // this.dir = 'R'; // 初始化方向为向右
  this.arr = [];
}

// 初始化蛇，初始长度为3
Snake.prototype.init = function() {
  for(let i=0; i<3; i++) {
    this.add();
    this.drawBlock(this.arr[i]);
  }
}

// 添加蛇身圆
// 主要计算最后一个蛇身圆与倒数第二个蛇身圆的关系，从而确定新增蛇身圆的坐标
Snake.prototype.add = function(newNode) {
  let x = 0;
  let y = 0;
  if(this.len === 0) {
    x = parseInt(cnv.width / 20);
    y = parseInt(cnv.height / 20);
  }else if(this.len === 1) {
    x = parseInt(cnv.width / 20) - 1;
    y = parseInt(cnv.height / 20);
  }else {
    let last = this.arr[this.len - 1];
    let plast = this.arr[this.len - 2];

    px = last.x - plast.x;
    py = last.y - plast.y;

    x = last.x + px;
    y = last.y + py;
  }

  let color = newNode ? newNode[0].color : getRandomColor();
  this.arr.push({x: x, y: y, color: color});
  this.len++;
}

// 画蛇圆
Snake.prototype.drawBlock = function(node) {
  cxt.beginPath();
  cxt.arc(node.x * gridWidth, node.y * gridWidth, gridWidth, 0, 360 * Math.PI / 180, false);
  cxt.fillStyle = node.color;
  cxt.fill();
  cxt.closePath();
}

// 画蛇
Snake.prototype.drawSnake = function() {
  for(let i=0; i<this.len; i++) {
    this.drawBlock(this.arr[i]);
  }
}

// 移动身体
Snake.prototype.move = function(preNode) {
  // 遍历蛇身，下一个蛇身圆的坐标改为上一个蛇身圆的坐标
  for(let i=0; i<this.len-1; i++) {
    this.arr[i].color = this.arr[i+1].color
  }
}

// 清除蛇尾
Snake.prototype.clearTail = function() {
  let tail = this.arr[this.len - 1];
  cxt.fillStyle = 'white';
  cxt.fillRect(tail.x * gridWidth - gridWidth, tail.y * gridWidth - gridWidth, 2 * gridWidth, 2 * gridWidth);
}