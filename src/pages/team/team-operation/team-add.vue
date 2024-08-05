<script lang="ts" setup>
import {AddTeamParams} from "@/types/team";
import {postAddTeamAPI} from "@/api/service/team.ts";
import {getLoginUserAPI} from "@/api/service/user.ts";

const router = useRouter();

const initData = {
    "name": "",
    "description": "",
    "maxNum": 0,
    "expireTime": "",
    "status": 0,
    "password": ""
}
const showPicker = ref(false);
const formData = ref<AddTeamParams>({...initData});

onMounted(async () => {
    const res = await getLoginUserAPI();
    if (res.code != 200 || res.data == null) {
        router.push({
            path: "/login",
            replace: true
        })
    }
})

const onConfirm = ({selectedValues}:{selectedValues:any}) => {
    formData.value.expireTime = selectedValues.join('-');
    formData.value.expireTime += " 00:00:00";
    showPicker.value = false;
};

const onSubmit = async () => {
    const res = await postAddTeamAPI(formData.value);
    if (res.code == 200) {
        router.push({
            path: "/team",
            replace: true
        })
    }
}
</script>

<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                    v-model="formData.name"
                    name="name"
                    label="队伍名称"
                    placeholder="队伍名称"
                    :rules="[{ required: true, message: '请填写队伍名称' }]"
            />
            <van-field
                    v-model="formData.description"
                    rows="2"
                    autosize
                    label="描述"
                    type="textarea"
                    placeholder="请输入描述"
                    maxlength="512"
                    show-word-limit
            />
            <van-field name="stepper" label="最大人数">
                <template #input>
                    <van-stepper v-model="formData.maxNum" min="3" max="20"/>
                </template>
            </van-field>
            <van-field
                    v-model="formData.expireTime"
                    is-link
                    readonly
                    name="datePicker"
                    label="时间选择"
                    placeholder="点击选择时间"
                    @click="showPicker = true"
            />
            <van-popup v-model:show="showPicker" position="bottom">
                <van-date-picker @confirm="onConfirm" @cancel="showPicker = false"/>
            </van-popup>
            <van-field name="radio" label="单选框">
                <template #input>
                    <van-radio-group v-model="formData.status" direction="horizontal">
                        <van-radio :name="0">公开</van-radio>
                        <van-radio :name="1">私有</van-radio>
                        <van-radio :name="2">加密</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field
                    v-show="formData.status == 2"
                    v-model="formData.password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block @click="onSubmit" type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<style scoped>

</style>
