<template>
    <div align="center">
        <icon-user style="font-size: 72;"/>
        <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit" layout="vertical">
            <a-form-item field="name" label="帳號">
                <a-input v-model="form.name">
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item field="post" label="密碼">
                <a-input v-model="form.post" placeholder="please enter your post...">
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button long type="primary" html-type="submit">登入/註冊</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
import { reactive } from 'vue';

export default {
    name: 'Login',
    setup() {
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
        };
    },
};
</script>
<style scoped></style>