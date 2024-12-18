<template>
    <div class="menu">
        <a-trigger trigger="click" position="top" :unmount-on-close="true" class="menu-trigger" :popup-translate="[0, 20]">
            <icon-menu />
            <template #content>
                <a-menu mode="vertical" theme="light" :selected-keys="[currentSelectedKey]" class="menu-left">
                    <a-menu-item key="/" @click="navigateTo('/')">
                        <icon-home />首頁
                    </a-menu-item>
                    <a-menu-item key="/articles" @click="navigateTo('/articles')">
                        <icon-book />文章
                    </a-menu-item>
                    <a-menu-item key="/about" @click="navigateTo('/about')">
                        <icon-info /> 關於
                    </a-menu-item>
                    <a-sub-menu key="/0">
                        <template #icon><icon-apps></icon-apps></template>
                        <template #title>game</template>
                        <a-menu-item key="/snake" @click="navigateTo('/snake')">snake</a-menu-item>
                        <a-menu-item key="/maze" @click="navigateTo('/maze')">迷宮</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </template>
        </a-trigger>

        <div :style="{
            width: '80px',
            height: '30px',
            background: 'var(--color-fill-3)',
            cursor: 'text',
        }" />
        <div class="menu-right" align="right">
            <div :style="{ padding: '20px 10px' }">
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
            <div :style="{ padding: '20px 0px' }">
                <a-trigger trigger="click" position="top" auto-fit-position :unmount-on-close="false">
                    <IconUser />
                    <template #content>
                        <div class="trigger-user">
                            <div align="center" :style="{ padding: '10px' }">
                                <a-avatar :style="{ backgroundColor: '#3370ff', marginBottom: '10px' }">
                                    <IconUser />
                                </a-avatar>
                                <br />
                                <label :style="{ marginBottom: '300px' }">Username</label>
                                <br />
                                <a-button type="primary" size="small" :style="{ marginTop: '10px' }">登入</a-button>
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
    justify-content: space-between;
    align-items: center;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
    padding: 10px;
    background-color: var(--color-bg-2);
}

.menu-trigger {
    padding: 10px;
}

.menu-left {
    width: 100vw;
    
}

.menu-right {
    display: flex;
    padding: 0px;
}

.trigger-search {
    padding: 10px;
    width: 350px;
    background-color: var(--color-bg-popup);
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.trigger-user {
    padding: 10px;
    width: 250px;
    background-color: var(--color-bg-popup);
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
</style>
<script>
import { IconRight } from '@arco-design/web-vue/es/icon';

export default {
    name: 'MobileNavBar',
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