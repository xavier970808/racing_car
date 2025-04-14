<template>
    <div class="menu">
        <a-menu mode="horizontal" theme="light" :selected-keys="[currentSelectedKey]">
            <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
                <div :style="{
                    width: '80px',
                    height: '30px',
                    background: 'var(--color-fill-3)',
                    cursor: 'text',
                }" />
            </a-menu-item>
            <a-menu-item key="/" @click="navigateTo('/')"><icon-home />首頁</a-menu-item>
            <a-menu-item key="/標頭檔" @click="navigateTo('/標頭檔')"><icon-info />標頭檔</a-menu-item>
            <a-menu-item key="/輸入輸出" @click="navigateTo('/輸入輸出')"><icon-info />輸入輸出</a-menu-item>
            <a-menu-item key="/基本資料型態" @click="navigateTo('/基本資料型態')"><icon-info />基本資料型態</a-menu-item>
            <a-menu-item key="/變數命名原則" @click="navigateTo('/變數命名原則')"><icon-info />變數命名原則</a-menu-item>
            <a-menu-item key="/運算子" @click="navigateTo('/運算子')"><icon-info />運算子</a-menu-item>
            <a-menu-item key="/常數const" @click="navigateTo('/常數const')"><icon-info />常數const</a-menu-item>


        </a-menu>
        <div class="menu-right" align="right">
            <div :style="{ padding: '20px' }">
                
            <a-trigger trigger="click" position="left" auto-fit-position :unmount-on-close="false">
                <icon-search />
                <template #content>
                    <div class="trigger-search">
                        <div align="center">
                            <a-input-search type="search" v-model.lazy.trim="search"  align="right" placeholder="輸入書籍名稱"/>
                            <li v-for="item in filterProducts" :key="item.id"></li>
                        </div>
                    </div>
                </template>
            </a-trigger>
            </div>
        </div>

    </div>
</template>
<style scoped>
.menu {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
    padding: 0px;
}

.trigger-search {
    padding: 10px;
    width: 350px;
    background-color: var(--color-bg-popup);
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
</style>
<script>
export default {
    name: 'NavBar',  // 定義 Vue 元件的名稱

    data() {
        return {
            data: [],  // 用來存儲顯示的產品或文章資料
            keywords: ''  // 儲存使用者輸入的搜尋關鍵字
        }
    },

    computed: {
        // 計算屬性：獲取當前選中的路由
        currentSelectedKey() {
            // 檢查當前路徑是否以 '/articles' 開頭，如果是則返回 '/articles'，否則返回完整路徑
            return this.$route.path.startsWith('/articles') ? '/articles' : this.$route.path;
        },

        // 計算屬性：根據關鍵字過濾產品或文章
        filterProducts() {
            // 根據空格分割關鍵字為陣列
            const strArr = this.keywords.split(' ');
            const arr = []; // 用來存儲過濾結果的陣列
            
            // 遍歷每個關鍵字，過濾資料
            strArr.forEach((str) => {
                this.data.forEach((item) => {
                    // 檢查每個項目的標題或作者是否包含關鍵字
                    if (item.title.includes(str) || item.author.includes(str)) {
                        arr.push(item);  // 如果有匹配的項目，將其加入結果陣列
                    }
                });
            });

            // 移除過濾結果中的重複項目，將陣列轉換為 Set 再轉回陣列
            return [...new Set(arr)];
        }
    },

    methods: {
        // 方法：處理路由導航
        navigateTo(path) {
            // 使用 Vue Router 的 push 方法進行導航
            this.$router.push(path);
        },

        // 方法：處理搜尋輸入
        handleSearch(value) {
            if (value) {
                // 如果搜尋框有輸入值，模擬根據該值獲取資料
                this.data = [...Array(5)].map((_, index) => ({ 
                    title: `${value}-${index}`,  // 根據搜尋值和索引生成標題
                    author: `Author ${index}`     // 根據索引生成作者名稱
                }));
                console.log(this.data);  // 輸出模擬的資料以便於除錯
            } else {
                // 如果搜尋框為空，重置資料陣列
                this.data = [];
            }
        }
    }
}
</script>