/**
 * 核心流程代码
 */

// 开始游戏
let snake = null;
let food_arr = [];
function start() {
  // 初始化蛇
  snake = new Snake();
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

    // 检查食物是否与蛇头相撞
    let index = -1;
    if(food_arr.length > 0) {
      for(let i=0; i<food_arr.length; i++) {
        if(food_arr[i].isCollide(snake.arr[0])) {
          index = i;
        }
      }

      if(index > -1) {
        // 给蛇增加长度
        let food_obj = food_arr.splice(index, 1);
        snake.add(food_obj);

        // 清除被吃食物圆
        cxt.fillStyle = 'white';
        cxt.fillRect(food_obj[0].x - gridWidth, food_obj[0].y - gridWidth, 2 * gridWidth, 2 * gridWidth);
      }
    }

    snake.drawSnake();
  }, 150);
  // })();

  // 2秒产生一个食物
  food_loop = setInterval(() => {
    let x = parseInt(cnv.width / gridWidth * Math.random()) * gridWidth;
    let y = parseInt(cnv.height / gridWidth * Math.random()) * gridWidth;
    let color = getRandomColor();
    let food = new Food(x, y, gridWidth, color);
    food_arr.push(food);
    food.create();
  }, 2000)
}

start();