<template>

  <div class="articles-container" width="100vw">
    <a-layout>
      <a-layout-header
        style="display: flex; justify-content: space-between; align-items: center; padding: 24px; height: 64px; background: #fff;">
        <h1 style="padding:24px;">文章列表</h1>
        <a-button type="primary" style="margin-left:24px;" href="/articles/create"><icon-pen
            style="margin-right: 5px;" /> 新增文章</a-button>
      </a-layout-header>
      <a-layout-content>
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
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import axios from 'axios'

const paginationProps = reactive({
      defaultPageSize: 10,
      total: 0 // 初始时设置为 0
    });

// 定义一个异步函数以获取数据
const fetchUserData = async (dataSource) => {
  try {
    const postData = {};
    const response = await axios.post('http://localhost:8080/api/getArticles', postData);

    //const response = await axios.post('/api/getArticles', postData);
    dataSource.value = response.data;
// 更新 paginationProps 的 total 属性
paginationProps.total = response.data.length;
  } catch (error) {
    console.error('获取文章信息时出错:', error);
  }
};

// 调用函数
export default {
  name: 'Articles',
  setup() {
    const dataSource = ref([]);
    fetchUserData(dataSource);
    return {
      dataSource,
      paginationProps,
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
  overflow: hidden;
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