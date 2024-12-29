<template>
  <div class="game-container">
    <h1>貪食蛇遊戲</h1>
    <canvas id="gameCanvas" ref="gameCanvas" width="1000" height="500"></canvas>
    <div id="score">分數: {{ score }}</div>
    
    <!-- 密码输入框 -->
    <div>
      <label for="password">输入密码以调整游戏速度:</label>
      <input type="password" v-model="password" />
      <button class="confirm-button" @click="checkPassword" >確認密碼</button>
      <span v-if="!isPasswordCorrect" style="color: red;">密码错误</span>
    </div>
    
    <!-- Slider to adjust game speed -->
    <div v-if="isPasswordCorrect">
      <label for="speedSlider">遊戲速度:</label>
      <input
        type="range"
        id="speedSlider"
        v-model="speed"
        min="10"
        max="300"
        step="10"
      />
      <span>{{ speed }} ms</span>
    </div>
    
    <!-- Start game button -->
    <button v-if="!gameStarted" @click="startGame">開始遊戲</button>
    
    <p>W上移，S下移，A左移，D右移，Enter開始遊戲</p>
    <p>本遊戲由 Xavie 開發</p>
  </div>
</template>

  <script>
  export default {
    nname: 'SnakeGame',
    data() {
    return {
      gridSize: 20,
      canvasSize: 1000, // 宽度改为 1000
      canvasHeight: 500, // 新增高度变量
      snake: [{ x: 160, y: 160 }],
      food: { x: 200, y: 200 },
      dx: 20,
      dy: 0,
      score: 0,
      gameInterval: null,
      gameStarted: false,
      speed: 50, // 預設速度為 50ms
      password: '', // 用于存储用户输入的密码
      isPasswordCorrect: false, // 用于标识密码是否正确
    };
  },

    methods: {
      randomPosition() {
        return {
          x: Math.floor(Math.random() * (this.canvasSize / this.gridSize)) * this.gridSize,
          y: Math.floor(Math.random() * (this.canvasHeight / this.gridSize)) * this.gridSize
        };
      },
      drawSnake() {
        const ctx = this.$refs.gameCanvas.getContext('2d');
        this.snake.forEach(segment => {
          ctx.fillStyle = 'green';
          ctx.fillRect(segment.x, segment.y, this.gridSize, this.gridSize);
        });
      },
      drawFood() {
        const ctx = this.$refs.gameCanvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(this.food.x, this.food.y, this.gridSize, this.gridSize);
      },
      updateGame() {
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

        // Check if snake hits the wall or itself
        if (
          head.x < 0 || head.x >= this.canvasSize || // 宽度检测
          head.y < 0 || head.y >= this.canvasHeight || // 高度检测
          this.isSnakeCollision(head)
        ) {
          return this.gameOver();
        }

        this.snake.unshift(head);

        // Check if snake eats food
        if (head.x === this.food.x && head.y === this.food.y) {
          this.score++;
          this.food = this.randomPosition(); // 随机生成新的食物位置
        } else {
          this.snake.pop();
        }

        this.draw();
      },
      isSnakeCollision(head) {
        return this.snake.some(segment => segment.x === head.x && segment.y === head.y);
      },
      draw() {
        const ctx = this.$refs.gameCanvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
        this.drawSnake();
        this.drawFood();
      },
      gameOver() {
        clearInterval(this.gameInterval);
        alert(`遊戲結束！你的分數是: ${this.score}`);
        this.gameStarted = false;
      },
      handleKeydown(event) {
        if (event.key === 'w' && this.dy === 0) {
          this.dx = 0;
          this.dy = -this.gridSize;
        } else if (event.key === 's' && this.dy === 0) {
          this.dx = 0;
          this.dy = this.gridSize;
        } else if (event.key === 'a' && this.dx === 0) {
          this.dx = -this.gridSize;
          this.dy = 0;
        } else if (event.key === 'd' && this.dx === 0) {
          this.dx = this.gridSize;
          this.dy = 0;
        }else if (event.key === 'Enter'&&!this.gameStarted) {
          this.startGame();
        }
      },
      startGame() {
      this.gameStarted = true;
      this.snake = [{ x: 160, y: 160 }];
      this.food = this.randomPosition(); // 随机生成食物的初始位置
      this.score = 0;
      this.dx = 20;
      this.dy = 0;

      // Add event listener for keydown
      window.addEventListener('keydown', this.handleKeydown);

      // Start the game interval
      this.startGameInterval();
    },
      startGameInterval() {
        if (this.gameInterval) clearInterval(this.gameInterval); // Clear any existing interval
        this.gameInterval = setInterval(this.updateGame, this.speed);  // Update game speed based on slider
      },
      checkPassword() {
      const correctPassword = 'x'; // 在这里设置正确的密码
      if (this.password === correctPassword) {
        this.isPasswordCorrect = true;
        this.password = ''; // 清空密码输入框
      } else {
        this.isPasswordCorrect = false;
      }
    },
    },
    watch: {
      // Watch for changes to speed and restart the game interval with new speed
      speed(newSpeed) {
        if (this.gameStarted) {
          this.startGameInterval();
        }
      },
    },
    mounted() {
      window.addEventListener('keydown', this.handleKeydown);
    },
    beforeDestroy() {
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
  background-color: white; /* 将背景颜色改为白色 */
}

.game-container {
  text-align: center;
}

#gameCanvas {
  border: 5px solid black;
}

#score {
  margin-top: 10px;
  font-size: 18px;
  color: black;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

input[type="range"] {
  width: 200px;
  margin: 10px;
}

.confirm-button {
  width: 120px; /* 确认按钮的宽度 */
  height: 30px; /* 确认按钮的高度 */
  font-size: 16px; /* 更改确认按钮的文字大小 */
}
</style>
