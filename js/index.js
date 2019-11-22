/**
 * 核心流程代码
 */

// 开始游戏
let food_interval = null;
function start() {
  // 2秒产生一个食物
  food_interval = setInterval(() => {
    let x = parseInt(cnv.width / gridWidth * Math.random()) * gridWidth;
    let y = parseInt(cnv.height / gridWidth * Math.random()) * gridWidth;
    let color = getRandomColor();
    let food = new Food(x, y, gridWidth, color);
    food.create();
  }, 2000)
}

start();