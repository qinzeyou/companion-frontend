<script lang="ts" setup>
import { registerAPI } from "@/api/service/user.ts";
import OtherLayout from "@/pages/other/index.vue";

const router = useRouter();
// 注册表单数据
const registerForm = ref({
    userAccount: '',
    password: '',
    checkPassword: '',
})

// 校验密码
const validatorPassword = () => {
    if (registerForm.password !== registerForm.checkPassword) {
        return '确认密码错误，请重新填写';
    }
};
// 注册
const onRegister = async () => {
    const res = await registerAPI(registerForm.value);
    if (res.code == 200) {
        router.push('/login');
    }
};
</script>

<template>
    <BaseHeaderNotSearch :title="'注册'"/>
    <OtherLayout>
        <template #content>
            <div class="login">
                <van-form class="form" @submit="onRegister">
                    <van-cell-group inset>
                        <van-field
                            v-model="registerForm.userAccount"
                            name="账号"
                            label="账号"
                            placeholder="请填写账号"
                            :rules="[{ required: true, message: '请填写账号' }]"
                        />
                        <van-field
                            v-model="registerForm.password"
                            type="password"
                            name="密码"
                            label="密码"
                            placeholder="请填写密码"
                            :rules="[{ required: true, message: '请填写密码' }, {  validator: validatorPassword, message: '请输入正确内容' }]"
                        />
                        <van-field
                            v-model="registerForm.checkPassword"
                            type="password"
                            name="确认密码"
                            label="确认密码"
                            placeholder="请确认密码"
                            :rules="[{ required: true, message: '请确认密码' }, {  validator: validatorPassword, message: '密码错误，请重新填写' }]"
                        />
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                            注册
                        </van-button>
                    </div>
                </van-form>
                <a class="text" href="/login">去登录</a>
            </div>
        </template>
    </OtherLayout>
</template>

<style lang="scss" scoped>
.text {
    display: inline-block;
    margin: 20px 0;
    float: left;
}
</style>
