<script lang="ts" setup>
import { AddTeamParams } from "@/types/team";
import { postAddTeamAPI } from "@/api/service/team.ts";
import { getLoginUserAPI } from "@/api/service/user.ts";
import { getCurrentDate, getCurrentTime } from "@/utils";
import { UserType } from "@/types/user";
import { TeamStatusEnum } from "@/enums/enum";
import { postUploadFileAPI } from "@/api/service/system";

// 路由函数
const router = useRouter();
// 初始化数据
const initData: AddTeamParams = {
    userId: 0,
    name: "",
    description: "",
    maxNum: 0,
    expireTime: "",
    status: 0,
    password: "",
    teamCover: ""
}
// 控制时间选择弹出层的显示
const showPicker = ref(false);
// 表单数据
const formData = ref<AddTeamParams>({ ...initData });
// 当前登录用户数据
const loginUser = ref<UserType>();
// 时间控件中的日期
const currentDate = ref(getCurrentDate());
// 时间控件中的时间
const currentTime = ref(getCurrentTime());
// 时间控件最小选择时间
const minDate = new Date();

// 获取当前登录用户数据
const getLoginUser = async () => {
    const res = await getLoginUserAPI();
    if (res.code == 200 && res.data != null) {
        loginUser.value = res.data;
        formData.value.userId = loginUser.value!.id;
    } else {
        router.push({
            path: "/login",
            replace: true
        })
    }
}
// 添加队伍响应事件
const onAddTeam = async () => {
    // 发起请求
    const res = await postAddTeamAPI(formData.value);
    // 判断请求结果，成功则跳转到队伍页面
    if (res.code == 200) {
        router.push({
            path: "/team",
            replace: true
        })
    }
}
// 选择时间确认回调函数
const onConfirmDateTime = () => {
    formData.value.expireTime = `${currentDate.value.join('-')} ${currentTime.value.join(':')}`
    showPicker.value = false
};

// 上传文件响应
const uploadFile = async (event: Event) => {
    const inputElement = event.target as HTMLInputElement; 
    if (inputElement.files && inputElement.files.length > 0) {  
        const file = inputElement.files[0]; // 获取选中的文件
        const form = new FormData();
        form.append("file", file);
        // 将文件上传至服务器
        const res = await postUploadFileAPI(form);
        if (res.code == 200) formData.value.teamCover = res.data;
    }
}

// 页面渲染完成触发的钩子函数
onMounted(async () => {
    await getLoginUser()
})
</script>

<template>
    <div class="team-add-page">
        <div class="team-cover-box">
            <p v-if="formData.teamCover == ''">队伍封面</p>
            <input type="file" @change="uploadFile">
            <img v-if="formData.teamCover != ''" class="cover" :src="formData.teamCover" alt="">
            <div class="bg"></div>
        </div>
        <van-form>
            <van-cell-group inset>
                <!-- 队伍名称 -->
                <van-field v-model="formData.name" name="name" label="队伍名称" placeholder="队伍名称"
                    :rules="[{ required: true, message: '请填写队伍名称' }]" />
                <!-- 队伍描述 -->
                <van-field v-model="formData.description" rows="2" autosize label="描述" type="textarea" placeholder="请输入描述"
                    maxlength="512" show-word-limit />
                <!-- 最大人数 -->
                <van-field name="stepper" label="最大人数">
                    <template #input>
                        <van-stepper v-model="formData.maxNum" min="3" max="20" />
                    </template>
                </van-field>
                <!-- 组队结束时间 -->
                <van-field v-model="formData.expireTime" is-link readonly name="datePicker" label="时间选择"
                    placeholder="点击选择时间" @click="showPicker = true" />
                <van-popup v-model:show="showPicker" position="bottom">
                    <van-picker-group title="组队结束时间" :tabs="['选择日期', '选择时间']" @confirm="onConfirmDateTime"
                        @cancel="showPicker = false">
                        <van-date-picker v-model="currentDate" :min-date="minDate" />
                        <van-time-picker v-model="currentTime" />
                    </van-picker-group>
                </van-popup>
                <!-- 队伍状态 -->
                <van-field name="radio" label="单选框">
                    <template #input>
                        <van-radio-group v-model="formData.status" direction="horizontal">
                            <van-radio v-for="status in TeamStatusEnum" :key="status.value" :name="status.value">{{
                                status.desc
                            }}</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <!-- 密码框：队伍状态为加密，需要设置加入队伍的密码 -->
                <van-field v-show="formData.status == 2" v-model="formData.password" type="password" name="密码" label="密码"
                    placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <!-- 提交按钮 -->
            <div style="margin: 16px;">
                <van-button round block @click="onAddTeam" type="primary">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<style lang="scss" scoped>
.team-add-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.team-cover-box {
    box-sizing: border-box;
    background-color: white;
    border-radius: 10px;
    height: 150px;
    width: 90%;
    box-sizing: border-box;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 999;
    }

    p {
        font-size: 35px;
        color: black;
        letter-spacing: 0.5em;
    }

    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url("@/assets/images/team-cover-default.png");
        background-position: center;
        background-size: cover;
        opacity: .8;
        z-index: 1;
    }

    .cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 100;
    }
}</style>
