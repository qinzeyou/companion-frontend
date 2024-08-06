<script lang="ts" setup>
import { UserType } from "@/types/user";
import { TagType, postAddUserTag } from "@/types/tag";
import { getLoginUserAPI } from "@/api/service/user.ts";
import { showToast } from "vant/lib/toast";
import { hotTagPageAPI, removeUserTagAPI } from "@/api/service/tag";
import { showSuccessToast } from "vant/es";
import { showConfirmDialog } from 'vant';

// 当前登录信息
const loginUser = ref<UserType>({} as UserType);
// 其他标签数据：非用户身上的标签
const otherTagData = ref<TagType[]>();
// 搜索标签关键词
const searchText = ref<string>();
// 控制添加弹出层显示
const showAddTagPopup = ref<boolean>(false);
// 用户添加标签到自身的请求体
const addUserTagForm = ref<postAddUserTag>({
    tagId: 0,
    weight: 1
});
const username = ref('');
const selectTagName = ref('');

// 获取当前登录用户信息
const getCurrentUserData = async () => {
    const res = await getLoginUserAPI();
    if (res.code == 200 && res.data) {
        loginUser.value = res.data;
    }
}
// 用户移除身上的单个标签
const removeUserTag = (tagId: number) => {
    showConfirmDialog({
        // title: '标题',
        message:
            '确认移除该标签吗？',
    }).then(async () => {
       const res = await removeUserTagAPI({tagId});
        if (res.code == 200) {
            showSuccessToast("移除成功");
            await getCurrentUserData();
        }
    })
}
// 获取推荐标签分页数据
const getHotTagPageData = async () => {
    const res = await hotTagPageAPI({ pageNum: 1, pageSize: 10 });
    if (res.code == 200) {
        otherTagData.value = res.data.records;
    }
}
// 搜索按钮点击事件
const onClickButton = () => showToast(searchText.value);
// 其他标签点击事件
const otherTagClick = (tag: TagType) => {
    // 显示弹出层
    addUserTagForm.value.tagId = tag.id;
    selectTagName.value = tag.tagName;
    showAddTagPopup.value = true;
}


onMounted(async () => {
    await getCurrentUserData();
    await getHotTagPageData();
})
</script>

<template>
    <main class="loginUser-tag">
        <van-card :title="loginUser.username" :desc="loginUser.profile" :thumb="loginUser.avatarUrl"
            style="background-color: white">
            <template #tags>
                <van-row v-if="loginUser.tags" class="tag-row" :gutter="[10, 10]">
                    <van-col v-for="item in loginUser.userTags" :key="item.tag.id">
                        <van-tag plain type="danger" :color="item.tag.color ? item.tag.color : ''"
                            :text-color="item.tag.textColor ? item.tag.textColor : ''">{{ item.tag.tagName }}</van-tag>
                    </van-col>
                </van-row>
            </template>
            <template #footer>
                <van-button size="mini" type="primary">联系我</van-button>
            </template>
        </van-card>
        <div class="show-tag">
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
                我的标签
            </van-divider>
            <div class="my-tag">
                <van-row :gutter="[0, 20]">
                    <van-col span="6" v-for="item in loginUser.userTags" :key="item.tag.id" style="text-align: center">
                        <van-tag closeable plain type="primary" size="medium" @close="removeUserTag(item.tag.id)">{{
                            item.tag.tagName }}</van-tag>
                    </van-col>
                </van-row>
            </div>
            <van-divider :style="{ color: '#ee0a24', borderColor: '#ee0a24', padding: '0 16px' }">
                热门标签
            </van-divider>
            <!-- 搜索框 -->
            <div class="card">
                <van-search show-action background="none" v-model="searchText" placeholder="请输入搜索关键词">
                    <template #action>
                        <div @click="onClickButton">搜索</div>
                    </template>
                </van-search>
                <div class="hot-tag">
                    <van-row :gutter="[0, 20]">
                        <van-col span="6" v-for="tag in otherTagData" :key="tag.id" style="text-align: center">
                            <van-tag plain type="danger" size="medium" @click="otherTagClick(tag)">{{ tag.tagName
                            }}</van-tag>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>
        <van-popup closeable close-icon="close" v-model:show="showAddTagPopup" position="bottom" :style="{ height: '50%' }">
            <div style="padding: 50px 0;">
                <van-form>
                    <van-cell-group inset>
                        <van-field v-model="selectTagName" disabled label="标签名称" placeholder="标签名称" />
                        <van-field label="排序权重">
                            <template #input>
                                <van-stepper :min="1" :max="100" v-model="addUserTagForm.weight" />
                            </template>
                        </van-field>
                        <van-field v-model="username" label="文字颜色" placeholder="标签文字颜色" />
                        <van-field v-model="username" label="背景" placeholder="标签背景颜色" />
                    </van-cell-group>
                    <div style="margin: 16px;">
                        <van-button round block type="primary" native-type="submit">
                            添加
                        </van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>
    </main>
</template>

<style scoped>
.loginUser-tag {
    padding: 10px;
}

.hot-tag {
    margin-top: 10px;
    margin-bottom: 20px;
}
</style>
