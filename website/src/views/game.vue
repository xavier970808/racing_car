<template>
    <div id="app">
      <div class="game-container">
        <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
          <div
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            class="cell"
            :class="'cell-' + (cell || 'empty')"
          >
            {{ cell || '' }}
          </div>
        </div>
      </div>
      <div class="controls">
        <button @click="move('up')">Up</button>
        <button @click="move('down')">Down</button>
        <button @click="move('left')">Left</button>
        <button @click="move('right')">Right</button>
        <button @click="resetGame">Reset</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        grid: [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        gameOver: false,
      };
    },
    methods: {
      resetGame() {
        this.grid = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
        this.spawnNewTile();
        this.spawnNewTile();
        this.gameOver = false;
      },
      spawnNewTile() {
        const emptyCells = [];
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 4; c++) {
            if (this.grid[r][c] === 0) {
              emptyCells.push([r, c]);
            }
          }
        }
        if (emptyCells.length > 0) {
          const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          this.grid[r][c] = Math.random() < 0.9 ? 2 : 4;
        }
      },
      move(direction) {
        if (this.gameOver) return;
        
        let rotatedGrid = [...this.grid];
        switch (direction) {
          case 'up':
            rotatedGrid = this.rotateGridClockwise(rotatedGrid);
            break;
          case 'down':
            rotatedGrid = this.rotateGridClockwise(rotatedGrid);
            rotatedGrid = this.rotateGridClockwise(rotatedGrid);
            rotatedGrid = this.rotateGridClockwise(rotatedGrid);
            break;
          case 'left':
            break;
          case 'right':
            rotatedGrid = this.rotateGridClockwise(rotatedGrid);
            rotatedGrid = this.rotateGridClockwise(rotatedGrid);
            break;
        }
  
        const newGrid = this.slideAndMerge(rotatedGrid);
        if (direction === 'up' || direction === 'down') {
          this.grid = this.rotateGridClockwise(newGrid, 3);
        } else {
          this.grid = newGrid;
        }
        
        this.spawnNewTile();
        this.checkGameOver();
      },
      slideAndMerge(grid) {
        const newGrid = grid.map(row => this.slideAndMergeRow(row));
        return newGrid;
      },
      slideAndMergeRow(row) {
        const newRow = row.filter(val => val !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
          if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            newRow[i + 1] = 0;
            i++;
          }
        }
        return newRow.filter(val => val !== 0).concat(new Array(4 - newRow.length).fill(0));
      },
      rotateGridClockwise(grid, times = 1) {
        let rotatedGrid = grid;
        for (let i = 0; i < times; i++) {
          rotatedGrid = rotatedGrid[0].map((_, index) => rotatedGrid.map(row => row[index])).reverse();
        }
        return rotatedGrid;
      },
      checkGameOver() {
        const isGameOver = this.grid.flat().every(cell => cell !== 0);
        if (isGameOver) {
          this.gameOver = true;
          alert("Game Over!");
        }
      },
    },
    created() {
      this.resetGame();
    },
  };
  </script>
  
  <style scoped>
  .game-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
  
  .row {
    display: flex;
  }
  
  .cell {
    width: 80px;
    height: 80px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee4da;
    font-size: 32px;
    font-weight: bold;
  }
  
  .cell-2 {
    background-color: #eee4da;
  }
  
  .cell-4 {
    background-color: #ece0c8;
  }
  
  .cell-8 {
    background-color: #f2b179;
  }
  
  .cell-16 {
    background-color: #f59563;
  }
  
  .cell-32 {
    background-color: #f67c5f;
  }
  
  .cell-64 {
    background-color: #f65e3b;
  }
  
  .cell-128 {
    background-color: #edcf72;
  }
  
  .cell-256 {
    background-color: #edcc61;
  }
  
  .cell-512 {
    background-color: #edc850;
  }
  
  .cell-1024 {
    background-color: #edc53f;
  }
  
  .cell-2048 {
    background-color: #edc22e;
  }
  
  .controls {
    margin-top: 20px;
  }
  
  button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
  }
  </style>
  