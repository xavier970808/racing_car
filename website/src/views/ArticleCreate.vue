<script>
import { h, reactive, ref } from 'vue';
export default {
    setup() {
        const type = ref('text');
        const form = reactive({
            name: '',
            post: '',
            isRead: false,
        });
        const handleSubmit = (data) => {
            console.log(data);
        };
        return {
            form,
            handleSubmit,
            type,
        };
    },
}
</script>

<template>
    <!--
    <form  action="https://watershed-differential-mon-tracked.trycloudflare.com/uploadpic/" method="post" enctype="multipart/form-data">
        <input type="file" name="upload" />
        <input type="submit" value="Submit" />
    </form>
    -->
    <a-layout>
        <a-layout-header
            style="display: flex; justify-content: space-between; align-items: center; padding: 24px; height: 64px; background: #fff;">
            <h1 style="padding:24px;">新增文章</h1>
        </a-layout-header>
        <a-layout-content class="form-content" align="center">
            <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
                <a-form-item field="post" label="標題">
                    <a-input v-model="form.name" placeholder="請輸入標題" />
                </a-form-item>
                <a-form-item label="上傳圖片" field="image">
                    <a-upload limit="1" draggable="1"
                        action="/uploadf"
                        accept=".jpg, .jpeg, .png"/>
                </a-form-item>
                <a-form-item label="上傳文章 (markdown)" field="markdown">
                    <br/>

                    <br/>
                    <a-upload limit="1" draggable="1" action="https://comic-produced-seeds-oxide.trycloudflare.com/uploadmd" accept=".md"/> 
                    

                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">提交</a-button>
                </a-form-item>
            </a-form>
        </a-layout-content>
    </a-layout>
</template>
<style scoped>
.form-content {
    padding: 24px;
    margin-right: 24px;
}
</style>