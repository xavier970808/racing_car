<template>
    <div id="app">
      <div id="game-container">
        <canvas ref="gameCanvas"></canvas>
      </div>
      <button @click="generateMaze">生成随机迷宫</button>
      <div v-if="timerActive" class="timer">
        <p>生成时间: {{ timeTaken }} 秒</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        mazeWidth: 20,  // 迷宫宽度（格数）
        mazeHeight: 20, // 迷宫高度（格数）
        blockSize: 30,  // 每个格子的大小
        maze: [],       // 迷宫数据
        startX: 0,      // 起点X位置
        startY: 0,      // 起点Y位置
        endX: 0,        // 终点X位置
        endY: 0,        // 终点Y位置
        timerActive: false, // 计时器是否激活
        timeTaken: 0,   // 生成迷宫所用时间
        startTime: null, // 计时器开始时间
        timerInterval: null, // 用于清除计时器的间隔ID
      };
    },
    mounted() {
      this.canvas = this.$refs.gameCanvas;
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = this.mazeWidth * this.blockSize;
      this.canvas.height = this.mazeHeight * this.blockSize;
  
      // 初始生成迷宫
      this.generateMaze();
    },
    methods: {
      // 生成随机迷宫
      generateMaze() {
        // 激活计时器
        this.startTimer();
  
        // 生成迷宫
        this.maze = this.createEmptyMaze();
        this.carveMaze(0, 0);
  
        // 设置起点和终点
        this.startX = 0; // 起点X
        this.startY = 0; // 起点Y
        this.endX = this.mazeWidth - 1; // 终点X
        this.endY = this.mazeHeight - 1; // 终点Y
  
        // 确保迷宫中有从起点到终点的路径
        this.ensurePathExists();
  
        // 绘制迷宫
        this.drawMaze();
  
        // 停止计时器
        this.stopTimer();
      },
  
      // 创建一个空迷宫
      createEmptyMaze() {
        const maze = [];
        for (let y = 0; y < this.mazeHeight; y++) {
          const row = [];
          for (let x = 0; x < this.mazeWidth; x++) {
            row.push(1); // 1 表示墙壁
          }
          maze.push(row);
        }
        return maze;
      },
  
      // 使用递归分割生成迷宫
      carveMaze(x, y) {
        const directions = [
          [0, -1],  // 上
          [1, 0],   // 右
          [0, 1],   // 下
          [-1, 0],  // 左
        ];
  
        // 打开当前格子
        this.maze[y][x] = 0;
  
        // 打乱方向顺序
        for (let i = 0; i < directions.length; i++) {
          const dir = directions[Math.floor(Math.random() * directions.length)];
          const nx = x + dir[0] * 2;
          const ny = y + dir[1] * 2;
  
          // 检查边界和是否已经访问过
          if (nx >= 0 && ny >= 0 && nx < this.mazeWidth && ny < this.mazeHeight && this.maze[ny][nx] === 1) {
            // 打开墙壁
            this.maze[y + dir[1]][x + dir[0]] = 0;
            this.carveMaze(nx, ny);
          }
        }
      },
  
      // 确保起点到终点之间有路径
      ensurePathExists() {
        // 使用 DFS 确保从起点到终点之间有路径
        const stack = [[this.startX, this.startY]];
        const visited = Array.from({ length: this.mazeHeight }, () => Array(this.mazeWidth).fill(false));
        visited[this.startY][this.startX] = true;
  
        // 定义四个方向：上、右、下、左
        const directions = [
          [0, -1],  // 上
          [1, 0],   // 右
          [0, 1],   // 下
          [-1, 0],  // 左
        ];
  
        while (stack.length > 0) {
          const [x, y] = stack.pop();
          for (let dir of directions) {
            const nx = x + dir[0];
            const ny = y + dir[1];
            if (nx >= 0 && ny >= 0 && nx < this.mazeWidth && ny < this.mazeHeight && !visited[ny][nx] && this.maze[ny][nx] === 0) {
              visited[ny][nx] = true;
              stack.push([nx, ny]);
            }
          }
        }
  
        // 如果终点不可达，则在迷宫中清除一条路径
        if (!visited[this.endY][this.endX]) {
          this.maze[this.endY][this.endX] = 0;
          stack.push([this.endX, this.endY]);
  
          while (stack.length > 0) {
            const [x, y] = stack.pop();
            for (let dir of directions) {
              const nx = x + dir[0];
              const ny = y + dir[1];
              if (nx >= 0 && ny >= 0 && nx < this.mazeWidth && ny < this.mazeHeight && this.maze[ny][nx] === 1) {
                this.maze[ny][nx] = 0;
                stack.push([nx, ny]);
              }
            }
          }
        }
      },
  
      // 绘制迷宫到 canvas
      drawMaze() {
        for (let y = 0; y < this.mazeHeight; y++) {
          for (let x = 0; x < this.mazeWidth; x++) {
            if (this.maze[y][x] === 1) {
              this.ctx.fillStyle = '#000';  // 墙壁是黑色
            } else {
              this.ctx.fillStyle = '#fff';  // 空白是白色
            }
            this.ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize, this.blockSize);
          }
        }
  
        // 绘制起点（绿色）
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.startX * this.blockSize, this.startY * this.blockSize, this.blockSize, this.blockSize);
  
        // 绘制终点（红色）
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.endX * this.blockSize, this.endY * this.blockSize, this.blockSize, this.blockSize);
      },
  
      // 开始计时器
      startTimer() {
        this.timerActive = true;
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
          this.timeTaken = ((Date.now() - this.startTime) / 1000).toFixed(2);
        }, 10); // 每 10 毫秒更新一次
      },
  
      // 停止计时器
      stopTimer() {
        clearInterval(this.timerInterval);
        this.timerActive = false;
      }
    }
  };
  </script>
  
  <style scoped>
  #app {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  #game-container {
    position: relative;
  }
  
  canvas {
    border: 10px solid #000;
    background-color: #fff;
  }
  
  .timer {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  </style>
  