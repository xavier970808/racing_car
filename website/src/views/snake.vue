<template>
    <div class="game-container">
      <h1>貪食蛇遊戲</h1>
      <canvas id="gameCanvas" ref="gameCanvas" width="400" height="400"></canvas>
      <div id="score">分數: {{ score }}</div>
      
      <!-- Slider to adjust game speed -->
      <div>
        <label for="speedSlider">遊戲速度:</label>
        <input
          type="range"
          id="speedSlider"
          v-model="speed"
          min="50"
          max="300"
          step="10"
        />
        <span>{{ speed }} ms</span>
      </div>
      
      <!-- Start game button -->
      <button v-if="!gameStarted" @click="startGame">開始遊戲</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SnakeGame',
    data() {
      return {
        gridSize: 20,
        canvasSize: 400,
        snake: [{ x: 160, y: 160 }],
        food: { x: 200, y: 200 },
        dx: 20,
        dy: 0,
        score: 0,
        gameInterval: null,
        gameStarted: false,
        speed: 100, // Default speed (milliseconds per frame)
      };
    },
    methods: {
      randomPosition() {
        return Math.floor(Math.random() * (this.canvasSize / this.gridSize)) * this.gridSize;
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
        if (head.x < 0 || head.x >= this.canvasSize || head.y < 0 || head.y >= this.canvasSize || this.isSnakeCollision(head)) {
          return this.gameOver();
        }
    
        this.snake.unshift(head);
    
        // Check if snake eats food
        if (head.x === this.food.x && head.y === this.food.y) {
          this.score++;
          this.food = { x: this.randomPosition(), y: this.randomPosition() };
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
      startGame() {
        this.gameStarted = true;
        this.snake = [{ x: 160, y: 160 }];
        this.food = { x: 200, y: 200 };
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
    background-color: #f0f0f0;
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
    color: #333;
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
  </style>
  