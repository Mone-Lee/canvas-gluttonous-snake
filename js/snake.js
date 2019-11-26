/**
 * 蛇类
 */

// 记录蛇头的坐标，运动方向, 长度
function Snake(x, y, len) {
  // this.x = x;
  // this.y = y;
  this.len = len || 0;
  this.dir = 'R'; // 初始化方向为向右
  this.arr = [];
}

// 初始化蛇，初始长度为3
Snake.prototype.init = function() {
  for(let i=0; i<3; i++) {
    this.add();
    this.drawBlock(this.arr[0], this.arr[i]);
  }
}

// 添加蛇身圆
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

  let color = newNode ? newNode.color : getRandomColor();
  this.arr.push({x: x, y: y, color: color});
  this.len++;
}

// 画蛇圆
Snake.prototype.drawBlock = function(head, node) {
  cxt.beginPath();
  cxt.arc(node.x * gridWidth, node.y * gridWidth, gridWidth, 0, 360 * Math.PI / 180, false);
  cxt.fillStyle = node.color;
  cxt.fill();
  cxt.closePath();
}

// 画蛇
Snake.prototype.drawSnake = function() {
  for(let i=0; i<this.len; i++) {
    this.drawBlock(this.arr[0], this.arr[i]);
  }
}

// 移动身体
Snake.prototype.move = function(preNode) {
  // 遍历蛇身，下一个蛇身圆的坐标改为上一个蛇身圆的坐标
  for(let i=1; i<this.len; i++) {
    let oldNode = Object.assign({}, this.arr[i]);

    this.arr[i].x = preNode.x;
    this.arr[i].y = preNode.y;

    preNode = oldNode;
  }
}
