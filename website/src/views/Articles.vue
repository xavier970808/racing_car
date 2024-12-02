<template>

  <div class="articles-container" width="100vw">
    <a-layout-header style="display: flex; justify-content: space-between; align-items: center; padding: 24px; height: 64px; background: #fff;">
      <h1 style="padding:24px;">文章列表</h1>
      <a-button type="primary" style="margin-left:24px;" href="/articles/create">新增文章</a-button>
    </a-layout-header>
    <a-row width="100vw" justify="center">
      <a-col flex="3" class="content">
        <a-list class="list-demo-action-layout" :bordered="false" :data="dataSource"
          :pagination-props="paginationProps">
          <template #item="{ item }">
            <a-list-item class="list-demo-item" action-layout="vertical">
              <template #actions>
                <span><icon-user /> author </span>
                <span><icon-heart />83</span>
                <span><icon-star />{{ item.index }}</span>
                <span><icon-message />Reply</span>
              </template>
              <template #extra>
                <div class="image-area">
                  <img alt="arco-design" :src="item.imageSrc" />
                </div>
              </template>
              <a-list-item-meta>
                <template #title>
                  <h2>{{ item.title }}</h2>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-col>
      <a-col class="right-col" flex="1" padding="24px">
        <a-card title="隨機推薦文章">
          <a-card :style="{ marginBottom: '20px' }" title="Inner Card Title">
            <template #extra>
              <a-link>More</a-link>
            </template>
            Inner Card Content
          </a-card>
          <a-card title="Inner Card Title">
            <template #extra>
              <a-link>More</a-link>
            </template>
            Inner Card Content
          </a-card>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { reactive } from 'vue'

const names = ['Socrates', 'Balzac', 'Plato'];
const imageSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp',
];
const dataSource = new Array(15).fill(null).map((_, index) => {
  return {
    index: index,
    title: names[index % names.length],
    description:
      'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
    imageSrc: imageSrc[index % imageSrc.length],
  };
});
export default {
  name: 'Articles',
  setup() {
    return {
      dataSource,
      paginationProps: reactive({
        defaultPageSize: 10,
        total: dataSource.length
      })
    }
  },
};
</script>
<style scoped>

.content {
  padding: 24px;

}

.right-col {
  margin-top: 40px;
  padding: 0 24px;
}

.list-demo-action-layout .image-area {
  width: 160px;
  height: 100px;
  border-radius: 2px;
  overflow: hidden;

}

.list-demo-action-layout .list-demo-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}

.articles-container {
  position: relative;
  width: 100%;
  margin: 0px auto;
  padding: 0 24px;
}

@media (max-width: 800px) {
  .list-demo-action-layout .image-area {
    width: 101px;
    height: 62px;
  }

  .articles-container {
    margin: 0;
    padding: 0;
  }

  .right-col {
    display: none;
  }
}
</style>