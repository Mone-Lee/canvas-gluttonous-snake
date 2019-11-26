/**
 * 食物类，每一个都是圆形
 */

function Food(x, y, r, color) {
  // 定义圆形坐标与半径
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color || "#6699FF";
}

Food.prototype.create = function() {
  // 描绘实心圆
  cxt.beginPath();
  cxt.fillStyle = this.color;
  cxt.arc(this.x, this.y, this.r, 0, 360 * Math.PI / 180, false);
  cxt.closePath();
  cxt.fill();
}

// 检查碰撞，使用外接圆判定法
Food.prototype.isCollide = function(obj) {
  let dx = this.x - obj.x * gridWidth;
  let dy = this.y - obj.y * gridWidth;
  let distance = parseInt((Math.sqrt(dx * dx + dy * dy)));

  if(distance <= 2 * gridWidth) {
    return true;
  }else {
    return false;
  }
}