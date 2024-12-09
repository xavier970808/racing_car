<script>
import { reactive } from 'vue';
import { IconUpload, IconFileAudio, IconClose, IconFaceFrownFill } from '@arco-design/web-vue/es/icon';
export default {
    setup() {
        const form = reactive({
            name: '',
            post: '',
            isRead: false,
        });
        const handleSubmit = (data) => {
            console.log(data);
        };
        const getCustomUploadIcon = () => {
            return {
                retryIcon: () => h(IconUpload),
                cancelIcon: () => h(IconClose),
                fileIcon: () => h(IconFileAudio),
                removeIcon: () => h(IconClose),
                errorIcon: () => h(IconFaceFrownFill),
                fileName: (file) => {
                    return `文件名： ${file.name}`
                },
            };
        };
        return {
            form,
            handleSubmit,
            getCustomUploadIcon,
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
                    <a-input v-model="form.post" placeholder="please enter your post..." />
                </a-form-item>
                <a-form-item label="上傳圖片" field="image">
                    <a-upload limit="1" draggable="1"
                        action="https://watershed-differential-mon-tracked.trycloudflare.com/uploadpic"
                        accept=".jpg, .jpeg, .png"
                        :custom-icon="getCustomUploadIcon">
                        <template #upload-button>
                            <div style="
            width: 100%;
    padding: 50px 0;
    color: var(--color-text-1);
    text-align: center;
    background-color: var(--color-fill-1);
    border: 1px dashed var(--color-neutral-3);
    border-radius: var(--border-radius-small);">
                                <div>
                                    <icon-upload />
                                    點擊或拖曳文件上傳
                                </div>
                            </div>
                        </template>
                    </a-upload>
                </a-form-item>
                <a-form-item label="上傳文章 (markdown)" field="markdown">
                    <a-upload limit="1" draggable="1" upload="/uploadmd" @before-upload="beforeUploadMd" accept=".md">
                        <template #upload-button>
                            <div style="
            width: 100%;
    padding: 50px 0;
    color: var(--color-text-1);
    text-align: center;
    background-color: var(--color-fill-1);
    border: 1px dashed var(--color-neutral-3);
    border-radius: var(--border-radius-small);">
                                <div>
                                    <icon-upload />
                                    點擊或拖曳文件上傳
                                </div>
                            </div>
                        </template>
                    </a-upload>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">Submit</a-button>
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