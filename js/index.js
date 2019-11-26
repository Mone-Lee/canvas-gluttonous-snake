/**
 * 核心流程代码
 */

// 开始游戏
function start() {
  // 初始化蛇
  let snake = new Snake();
  snake.init();

  var mouse = getMouse(cnv);

  // 根据鼠标方向移动蛇，蛇头向箭头方向移动，蛇身坐标为前一个蛇身圆的坐标
  // (function frame() {
    // window.requestAnimationFrame(frame);
  snake_loop = setInterval(() => {
    let head = Object.assign({}, snake.arr[0]);
    let diff_x = mouse.x - head.x * 10;
    let diff_y = mouse.y - head.y * 10;
    let vx = 0;
    let vy = 0;

    // 蛇头与鼠标在同一水平线或同一垂直直线方向，则不偏移，允许两者偏差值在+-一个半径之内
    if(Math.abs(diff_x) < gridWidth) {  // 垂直移动
      vx = 0;
      vy = diff_x > 0 ? speed : -speed;
    }else if(Math.abs(diff_y) < gridWidth) {  // 水平移动
      vx = diff_x > 0 ? speed : -speed;
      vy = 0;
    }else {
      vx = mouse.x - head.x * 10 > 0 ? speed : -speed;
      vy = mouse.y - head.y * 10 > 0 ? speed : -speed;
    }

    let newHead = {x: head.x + vx, y: head.y + vy, color: head.color};
    // 清除原来蛇尾
    snake.clearTail();
    snake.move(head);
    snake.arr.pop();

    snake.arr.unshift(newHead);
    snake.drawSnake();
  }, 100);
  // })();

  // 2秒产生一个食物
  food_loop = setInterval(() => {
    let x = parseInt(cnv.width / gridWidth * Math.random()) * gridWidth;
    let y = parseInt(cnv.height / gridWidth * Math.random()) * gridWidth;
    let color = getRandomColor();
    let food = new Food(x, y, gridWidth, color);
    food.create();
  }, 2000)
}

start();