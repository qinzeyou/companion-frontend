<script lang="ts" setup>
import {UserType} from "@/types/user";
import {getLoginUserAPI, updateUserAPI} from "@/api/service/user.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
// 表单数据
const form = ref<UserType>(<UserType>{});
// 性别单选框选项
const genderOptions = <{ key: number, value: string }[]>[
    {key: 0, value: '男'},
    {key: 1, value: '女'},
    {key: 2, value: '保密'},
]

const getLoginUserInfo = async () => {
    const {data} = await getLoginUserAPI();
    if (data.code == 200) {
        Object.assign(form.value, {...data.data})
    }
}

onMounted(async () => {
    await getLoginUserInfo();
})

const onUpdateUser = async () => {
    const {data} = await updateUserAPI(form.value);
    if (data.code) {
        await getLoginUserInfo();
        showSuccessToast("修改成功");
    } else {
        showFailToast("修改失败");
    }
};
</script>

<template>
    <van-form class="form-box" @submit="onUpdateUser">
        <van-cell-group inset>
            <van-field
                    v-model="form.username"
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
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
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
