<script lang="ts" setup>
import {UserType} from "@/types/user";
import {getLoginUserAPI, updateUserAPI} from "@/api/service/user.ts";
import {showNotify, showToast} from "vant";
import {postUploadFileAPI} from "@/api/service/system.ts";

// 表单数据
const form = ref<UserType>(<UserType>{});
const uploadFiles = ref<{ url: string }[]>([])
// 性别单选框选项
const genderOptions = <{ key: number, value: string }[]>[
    {key: 0, value: '男'},
    {key: 1, value: '女'},
    {key: 2, value: '保密'},
]
// 获取当前登录用户信息
const getLoginUserInfo = async () => {
    const res = await getLoginUserAPI();
    if (res.code == 200) {
        Object.assign(form.value, {...res.data})
        uploadFiles.value = [];
        // 将用户头像显示到上传文件的表单控件中
        uploadFiles.value.push({ url: form.value.avatarUrl })
    }
}

// 修改用户信息响应
const onUpdateUser = async () => {
    const res = await updateUserAPI(form.value);
    if (res.code) {
        await getLoginUserInfo();
        showNotify({type: "success", message: "修改成功"})
    }
};
// 上传文件响应事件
const afterRead = async (file) => {
    const formData = new FormData();
    formData.append("file", file.file);
    // 将文件上传至服务器
    const res = await postUploadFileAPI(formData);
    if (res.code == 200) form.value.avatarUrl = res.data;
};

// 页面加载完成触发钩子函数
onMounted(async () => {
    await getLoginUserInfo();
})
</script>

<template>
    <van-form class="form-box">
        <van-cell-group inset>
            <van-field
                    v-model="form.username"
                    rows="2"
                    type="textarea"
                    autosize
                    name="昵称"
                    label="简介"
                    placeholder="简介"
            />
            <van-field
                v-model="form.profile"
                name="昵称"
                label="昵称"
                placeholder="昵称"
                :rules="[{ required: true, message: '请填写昵称' }]"
            />
            <van-field
                    v-model="form.userAccount"
                    name="账号"
                    label="账号"
                    placeholder="账号"
                    disabled
            />
            <van-field
                    v-model="form.phone"
                    name="电话"
                    label="电话"
                    placeholder="电话"
            />
            <van-field name="radio" label="性别">
                <template #input>
                    <van-radio-group v-model="form.gender" direction="horizontal">
                        <van-radio v-for="option in genderOptions" :key="option.key" :name="option.key">{{
                            option.value
                            }}
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field
                    v-model="form.email"
                    name="邮箱"
                    label="邮箱"
                    placeholder="邮箱"
            />
            <van-field name="avatarUrl" label="头像">
                <template #input>
                    <van-uploader name="file" v-model="uploadFiles" :after-read="afterRead" multiple :max-count="1"/>
                </template>
            </van-field>
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" @click="onUpdateUser">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<style scoped>
.form-box {
    margin-top: 20px;
}
</style>
