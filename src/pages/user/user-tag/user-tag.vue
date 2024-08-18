<script lang="ts" setup>
import {UserType} from "@/types/user";
import {TagType, postAddUserTag} from "@/types/tag";
import {getLoginUserAPI} from "@/api/service/user.ts";
import {addUserTagAPI, removeUserTagAPI} from "@/api/service/user-tag";
import {hotTagPageAPI, searchTagListAPI} from "@/api/service/tag";
import {showSuccessToast} from "vant/es";
import {showConfirmDialog} from "vant";
import PickColors from "vue-pick-colors";
import {navTo} from "@/utils";

// 当前登录信息
const loginUser = ref<UserType>({} as UserType);
// 其他标签数据：非用户身上的标签
const otherTagData = ref<TagType[]>();
// 搜索标签关键词
const searchText = ref<string>("");
// 控制添加弹出层显示
const showAddTagPopup = ref<boolean>(false);
// 用户添加标签到自身的请求体
const addUserTagForm = ref<postAddUserTag>({
    tagId: 0,
    weight: 1,
    color: "#ff4500",
    textColor: "#ff4500",
});
// 用户选中的标签名称
const selectTagName = ref("");

// 获取当前登录用户信息
const getCurrentUserData = async () => {
    const res = await getLoginUserAPI();
    if (res.code == 200 && res.data) {
        loginUser.value = res.data;
    } else {
        navTo('/login');
    }
};
// 用户添加标签点击事件
const addUserTag = async () => {
    const res = await addUserTagAPI(addUserTagForm.value);
    if (res.code == 200) {
        showSuccessToast("添加成功");
        showAddTagPopup.value = false;
        await getCurrentUserData();
        await getHotTagPageData();
    }
};
// 用户移除身上的单个标签
const removeUserTag = (tagId: number) => {
    showConfirmDialog({
        // title: '标题',
        message: "确认移除该标签吗？",
    }).then(async () => {
        const res = await removeUserTagAPI(tagId);
        if (res.code == 200) {
            showSuccessToast("移除成功");
            await getCurrentUserData();
            await getHotTagPageData();
        }
    });
};
// 获取推荐标签分页数据
const getHotTagPageData = async () => {
    const res = await hotTagPageAPI({pageNum: 1, pageSize: 10});
    if (res.code == 200) {
        otherTagData.value = res.data.records;
    }
};
// 搜索按钮点击事件
const onClickButton = async () => {
    const res = await searchTagListAPI({tagName: searchText.value});
    if (res.code == 200) {
        otherTagData.value = res.data;
    }
};
// 其他标签点击事件
const otherTagClick = (tag: TagType) => {
    // 显示弹出层
    addUserTagForm.value.tagId = tag.id;
    selectTagName.value = tag.tagName;
    showAddTagPopup.value = true;
};

onMounted(async () => {
    await getCurrentUserData();
    await getHotTagPageData();
});
</script>

<template>
    <main class="loginUser-tag">
        <BasePersonCard :user="loginUser"/>
        <div class="show-tag">
            <van-divider
                    :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
            >
                我的标签
            </van-divider>
            <div class="my-tag">
                <van-row :gutter="[0, 20]">
                    <van-col
                            span="6"
                            v-for="tag in loginUser.userTags"
                            :key="tag.id"
                            style="text-align: center"
                    >
                        <van-tag
                                closeable
                                plain
                                type="primary"
                                size="medium"
                                @close="removeUserTag(tag.id)"
                        >{{ tag.tagName }}
                        </van-tag
                        >
                    </van-col>
                </van-row>
            </div>
            <van-divider
                    :style="{ color: '#ee0a24', borderColor: '#ee0a24', padding: '0 16px' }"
            >
                热门标签
            </van-divider>
            <!-- 搜索框 -->
            <div class="card">
                <van-search
                        show-action
                        v-model="searchText"
                        placeholder="请输入搜索关键词"
                >
                    <template #action>
                        <div @click="onClickButton">搜索</div>
                    </template>
                </van-search>
                <div class="hot-tag">
                    <van-row :gutter="[0, 20]">
                        <van-col
                                span="6"
                                v-for="tag in otherTagData"
                                :key="tag.id"
                                style="text-align: center"
                        >
                            <van-tag
                                    plain
                                    type="danger"
                                    size="medium"
                                    @click="otherTagClick(tag)"
                            >{{ tag.tagName }}
                            </van-tag
                            >
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>
        <van-popup
                closeable
                close-icon="close"
                v-model:show="showAddTagPopup"
                position="bottom"
                :style="{ height: '60%' }"
        >
            <div style="padding: 50px 0">
                <van-form>
                    <van-cell-group inset>
                        <van-field
                                v-model="selectTagName"
                                disabled
                                label="标签名称"
                                placeholder="标签名称"
                        />
                        <van-field label="排序权重">
                            <template #input>
                                <van-stepper
                                        :min="1"
                                        :max="100"
                                        v-model="addUserTagForm.weight"
                                />
                            </template>
                        </van-field>
                        <van-field
                                style="display: flex; align-items: center"
                                label="文字颜色"
                        >
                            <template #input>
                                <van-field
                                        v-model="addUserTagForm.textColor"
                                        placeholder="请输入十六进制颜色"
                                />
                                <pick-colors
                                        v-model:value="addUserTagForm.textColor"
                                        :z-index="9999"
                                />
                            </template>
                        </van-field>
                        <van-field label="背景颜色" placeholder="标签背景颜色">
                            <template #input>
                                <van-field
                                        v-model="addUserTagForm.color"
                                        placeholder="请输入十六进制颜色"
                                />
                                <pick-colors
                                        v-model:value="addUserTagForm.color"
                                        :z-index="9999"
                                />
                            </template>
                        </van-field>
                    </van-cell-group>
                    <div style="margin: 16px">
                        <van-button round block type="primary" @click="addUserTag">
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
