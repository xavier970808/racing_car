<template>
    <div class="game-container">
      <h1>貪食蛇遊戲</h1>
      <canvas id="gameCanvas" ref="gameCanvas" width="400" height="400"></canvas>
      <div id="score">分數: {{ score }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SnakeGame',  // 組件名稱
    data() {
      return {
        gridSize: 20,  // 每格的大小
        canvasSize: 400,  // 畫布的大小
        snake: [{ x: 160, y: 160 }],  // 貪食蛇的初始位置
        food: { x: 200, y: 200 },  // 食物的初始位置
        dx: 20,  // 控制蛇的方向 (水平)
        dy: 0,   // 控制蛇的方向 (垂直)
        score: 0,  // 分數
      };
    },
    methods: {
      // 隨機生成食物位置
      randomPosition() {
        return Math.floor(Math.random() * (this.canvasSize / this.gridSize)) * this.gridSize;
      },
      // 畫出貪食蛇
      drawSnake() {
        const ctx = this.$refs.gameCanvas.getContext('2d');
        this.snake.forEach(segment => {
          ctx.fillStyle = 'green';
          ctx.fillRect(segment.x, segment.y, this.gridSize, this.gridSize);
        });
      },
      // 畫出食物
      drawFood() {
        const ctx = this.$refs.gameCanvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(this.food.x, this.food.y, this.gridSize, this.gridSize);
      },
      // 更新遊戲邏輯
      updateGame() {
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };
  
        // 檢查是否撞牆或撞到自己
        if (head.x < 0 || head.x >= this.canvasSize || head.y < 0 || head.y >= this.canvasSize || this.isSnakeCollision(head)) {
          return this.gameOver();
        }
  
        this.snake.unshift(head);  // 新增蛇頭
  
        // 檢查蛇是否吃到食物
        if (head.x === this.food.x && head.y === this.food.y) {
          this.score++;
          this.food = { x: this.randomPosition(), y: this.randomPosition() };  // 重新生成食物
        } else {
          this.snake.pop();  // 移除蛇尾
        }
  
        this.draw();  // 畫出遊戲畫面
      },
      // 檢查蛇是否與自己碰撞
      isSnakeCollision(head) {
        return this.snake.some(segment => segment.x === head.x && segment.y === head.y);
      },
      // 清空畫布並重新畫出蛇和食物
      draw() {
        const ctx = this.$refs.gameCanvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);  // 清空畫布
        this.drawSnake();
        this.drawFood();
      },
      // 遊戲結束
      gameOver() {
        clearInterval(this.gameInterval);  // 停止遊戲循環
        alert(`遊戲結束！你的分數是: ${this.score}`);
      },
      // 處理鍵盤事件
      handleKeydown(event) {
        if (event.key === 'ArrowUp' && this.dy === 0) {
          this.dx = 0;
          this.dy = -this.gridSize;
        } else if (event.key === 'ArrowDown' && this.dy === 0) {
          this.dx = 0;
          this.dy = this.gridSize;
        } else if (event.key === 'ArrowLeft' && this.dx === 0) {
          this.dx = -this.gridSize;
          this.dy = 0;
        } else if (event.key === 'ArrowRight' && this.dx === 0) {
          this.dx = this.gridSize;
          this.dy = 0;
        }
      },
    },
    mounted() {
      // 設置鍵盤事件監聽
      window.addEventListener('keydown', this.handleKeydown);
  
      // 啟動遊戲
      this.gameInterval = setInterval(this.updateGame, 100);  // 每100毫秒更新一次遊戲
    },
    beforeDestroy() {
      // 組件銷毀前移除鍵盤事件監聽
      window.removeEventListener('keydown', this.handleKeydown);
    }
  };
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .game-container {
    text-align: center;
  }
  
  #gameCanvas {
    border: 5px solid black;  /* 設置畫布的黑色邊框 */
  }
  
  #score {
    margin-top: 10px;
    font-size: 18px;
    color: #333;
  }
  </style>
  