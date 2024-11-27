<template>
    <a-layout style="height: 100%;width:100vw;position: relative;padding: 0;" :style="{margin: '12px 12px 20px'}">
        <a-layout-sider style="width: 200px;">Sider</a-layout-sider>
        <a-layout-content>
            <div class="read-block" align="center">
        <div class="page-header" :style="{ padding: '0', display:flex, textAlign: 'left'}">
            <h1 class="title" :style="{ fontSize: '36px', fontWeight: '500', margin: '12px 12px 20px'}">文章標題</h1>
            <span :style="{ margin: '12px 12px 20px'}">description of the article</span>
            <a-divider :style="{ width: '100%'}"/>
        </div>
        
        <p>This is the article content.
        </p>
    </div>
        </a-layout-content>
        <a-layout-sider style="width: 200px; margin-left: 1px;"></a-layout-sider>
    </a-layout>
    
</template>
<style scoped>
.page-header {
    width: 100vw;
}

.extra {
    margin-top: 100px;
    /* 在标题与 extra 之间添加间距 */
}

.read-block {
    max-width: 50vw;
    position: relative;
    text-align: left;
    height: 100vh;
}
</style>
<script>
export default {
    name: 'ArticleRead',
};
</script>