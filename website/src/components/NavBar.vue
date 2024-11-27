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
            <a-menu-item key="/articles" @click="navigateTo('/articles')"><icon-book />文章</a-menu-item>
            <a-menu-item key="/about" @click="navigateTo('/about')"><icon-info />關於</a-menu-item>

        </a-menu>
        <div class="menu-right" align="right">
            <div :style="{ padding: '20px' }">
                
            <a-trigger trigger="click" position="left" auto-fit-position :unmount-on-close="false">
                <icon-search />
                <template #content>
                    <div class="trigger-search">
                        <div align="center">
                            <a-input-search :style="{ width: '320px' }" align="right"
                                placeholder="Please enter something" />
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
    name: 'NavBar',
    computed: {
        currentSelectedKey() {
            return this.$route.path.startsWith('/articles') ? '/articles' : this.$route.path;
        }
    },
    methods: {
        navigateTo(path) {
            this.$router.push(path); // 使用 Vue Router 的 push 方法实现导航
        },
    },
};
</script>