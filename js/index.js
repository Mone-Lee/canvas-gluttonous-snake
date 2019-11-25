/**
 * 核心流程代码
 */

// 开始游戏
let food_interval = null;
function start() {
  // 初始化蛇
  let snake = new Snake();
  snake.init();

  var mouse = getMouse(cnv);

  // 根据鼠标方向移动蛇，蛇头向箭头方向移动，蛇身坐标为前一个蛇身圆的坐标
  // (function frame() {
    // window.requestAnimationFrame(frame);
    // console.log(mouse.x, mouse.y);
  let loop = setInterval(() => {
    cxt.clearRect(0, 0, cnv.width, cnv.height);

    let head = Object.assign({}, snake.arr[0]);
    // console.log(mouse.x, head.x * 10);
    // console.log(mouse.x - head.x * 20 - 10);
    // console.log(mouse.y - head.x * 20 - 10);
    let vx = mouse.x - head.x * 10 > 0 ? speed : -speed;
    let vy = mouse.y - head.y * 10 > 0 ? speed : -speed;

    snake.arr[0] = {x: head.x + vx, y: head.y + vy, color: head.color};
    snake.move(head);

    snake.drawSnake();
  }, 100);
  // })();

  // 2秒产生一个食物
  // food_interval = setInterval(() => {
  //   let x = parseInt(cnv.width / gridWidth * Math.random()) * gridWidth;
  //   let y = parseInt(cnv.height / gridWidth * Math.random()) * gridWidth;
  //   let color = getRandomColor();
  //   let food = new Food(x, y, gridWidth, color);
  //   food.create();
  // }, 2000)
}

start();