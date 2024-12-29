<template
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>

<div id="app">
  <div v-if="gameOver" class="game-over">游戏结束！</div>
  <div v-if="gameWon" class="win">恭喜你，赢了！</div>
  
  <div class="grid">
    <div v-for="(cell, index) in grid" :key="index"
         class="cell"
         :class="{'revealed': cell.revealed, 'mine': cell.mine && cell.revealed, 'flag': cell.flag, 'empty': !cell.mine && cell.revealed}"
         @click="revealCell(index)"
         @contextmenu.prevent="toggleFlag(index)">
      <span v-if="cell.revealed && !cell.mine">{{ cell.neighborMines > 0 ? cell.neighborMines : '' }}</span>
      <span v-if="cell.flag">🚩</span>
    </div>
  </div>
</div>
</template>
<style>
.grid {
  display: grid;
  grid-template-columns: repeat(10, 40px);
  grid-template-rows: repeat(10, 40px);
  gap: 5px;
}
.cell {
  width: 40px;
  height: 40px;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}
.cell.revealed {
  background-color: #f0f0f0;
}
.cell.mine {
  background-color: red;
}
.cell.flag {
  background-color: yellow;
}
.cell.empty {
  background-color: #fff;
}
.game-over {
  font-size: 20px;
  color: red;
}
.win {
  font-size: 20px;
  color: green;
}
</style>
<script>
  new Vue({
    el: '#app',
    data() {
      return {
        grid: [],
        gameOver: false,
        gameWon: false,
        gridSize: 10,
        mineCount: 20,
      };
    },
    created() {
      this.initGame();
    },
    methods: {
      initGame() {
        this.grid = [];
        this.gameOver = false;
        this.gameWon = false;
        
        // 初始化网格
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
          this.grid.push({
            revealed: false,
            mine: false,
            flag: false,
            neighborMines: 0,
          });
        }
        
        // 放置雷
        let minePositions = [];
        while (minePositions.length < this.mineCount) {
          let position = Math.floor(Math.random() * this.grid.length);
          if (!minePositions.includes(position)) {
            minePositions.push(position);
            this.grid[position].mine = true;
          }
        }
        
        // 计算每个格子的邻近地雷数
        for (let i = 0; i < this.grid.length; i++) {
          if (!this.grid[i].mine) {
            let neighbors = this.getNeighbors(i);
            this.grid[i].neighborMines = neighbors.filter(index => this.grid[index].mine).length;
          }
        }
      },
      getNeighbors(index) {
        const neighbors = [];
        const row = Math.floor(index / this.gridSize);
        const col = index % this.gridSize;
        
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < this.gridSize && newCol >= 0 && newCol < this.gridSize) {
              neighbors.push(newRow * this.gridSize + newCol);
            }
          }
        }
        
        return neighbors;
      },
      revealCell(index) {
        const cell = this.grid[index];
        if (cell.revealed || cell.flag) return;

        cell.revealed = true;

        if (cell.mine) {
          this.gameOver = true;
          alert('游戏结束，踩到地雷了！');
          return;
        }

        if (cell.neighborMines === 0) {
          const neighbors = this.getNeighbors(index);
          neighbors.forEach(neighborIndex => {
            if (!this.grid[neighborIndex].revealed) {
              this.revealCell(neighborIndex);
            }
          });
        }

        // 检查是否胜利
        if (this.grid.every(cell => cell.revealed || cell.mine)) {
          this.gameWon = true;
          alert('恭喜你，赢了！');
        }
      },
      toggleFlag(index) {
        if (this.grid[index].revealed) return;
        this.grid[index].flag = !this.grid[index].flag;
      }
    }
  });
</script>

