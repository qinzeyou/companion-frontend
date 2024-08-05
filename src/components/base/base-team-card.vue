<!--
基础队伍展示card
-->
<script lang="ts" setup>
import {JoinTeamParams, TeamType} from "@/types/team";
import BaseResponse = BaseType.BaseResponse;
import {delTeamAPI, postJoinTeamAPI, postQuitTeamAPI} from "@/api/service/team.ts";
import { inject } from 'vue';
import {teamStatusEnum} from "@/constant/teamStatus.ts";

interface Props {
    team: TeamType, // 队伍数据
    showJoinTeamList?: boolean, // 加入队伍列表显示
    showOperationPanel?: boolean, // 操作面板显示
    showDissolveBtn?: boolean, // 解散按钮显示
    showLogoutBtn?: boolean, // 退出按钮显示
}

const props = withDefaults(defineProps<Props>(), {
    showJoinTeamList: true,
    showOperationPanel: false,
    showDissolveBtn: false,
    showLogoutBtn: true
});
// 刷新页面函数
const reload:any = inject("reload");
// 请求数据
const fromData = ref<JoinTeamParams>({
    teamId: props.team.id,
    password: ""
});
// 控制弹窗
const showDialog = ref<boolean>(false);

// 加入队伍按钮响应事件
const onJoinTeamBtn = async () => {
    // 如果队伍是加密状态，则弹窗给用户输入密码
    if (props.team.status == 2) {
        showDialog.value = true;
    } else {
        // 反之直接加入
        joinTeam();
    }
}
// 加入队伍请求
const joinTeam = async () => {
    const res = await postJoinTeamAPI(fromData.value);
    if (res.code == 200) {
        // 重新刷新页面
        reload();
    }
}

// 解散队伍响应事件
const onDissolve = async (teamId: number) => {
    const res = await delTeamAPI(teamId);
    if (res.code == 200 && res.data) {
        reload()
    }
}
// 退出队伍响应事件
const onLogout = async (teamId: number) => {
    await postQuitTeamAPI(teamId);
}

// 暴露给父组件使用
defineExpose({
    onDissolve,
    onLogout
})
</script>

<template>
    <div class="team-card">
        <van-dialog v-model:show="showDialog" title="入队密码" show-cancel-button @confirm="joinTeam">
            <van-cell-group inset>
                <van-field v-model="fromData.password" label="入队密码" placeholder="请输入入队密码"/>
            </van-cell-group>
        </van-dialog>
        <p class="team-status">
            {{ teamStatusEnum[team.status] }}
        </p>
        <!--        队伍封面盒子-->
        <div class="cover-box">
            <img class="team-cover" src="@/assets/images/team-cover-default.png" alt="">
        </div>
        <!--        队伍内容介绍-->
        <div class="content">
            <!--            队伍基本信息介绍-->
            <div class="description">
                <div class="title">
                    <van-tag plain type="primary">名称</van-tag>
                    <van-tag plain type="primary">描述</van-tag>
                </div>
                <div class="team-desc">
                    <p>{{ team.name }}</p>
                    <p class="team-description">{{ team.description }}</p>
                </div>
            </div>
            <!--            已加入用户列表展示-->
            <div v-show="showJoinTeamList" class="join-user-list">
                <van-space>
                    <van-image
                        v-if="team.joinUserList && team.joinUserList.length >= 1"
                        v-for="user in team.joinUserList"
                        :key="user.id"
                        round
                        width="35px"
                        height="35px"
                        :src="user.avatarUrl"
                    />
                    <div class="join-team" @click="onJoinTeamBtn" v-if="(team.maxNum != team.joinUserCount) && !team.hasJoin">+</div>
                </van-space>
            </div>
            <div v-show="showOperationPanel" class="operation-panel">
                <van-button plain type="danger" size="mini" v-show="showDissolveBtn" @click="onDissolve(team.id)">解散</van-button>
                <van-button plain type="warning" size="mini" @click="onLogout(team.id)">退出</van-button>
                <van-button plain type="success" size="mini">进入</van-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.team-card {
  display: flex;
  width: 100%;
  min-height: 120px;
  background-color: white;
  border-radius: 10px;
}
// 队伍状态
.team-status {
    position: absolute;
    font-size: 12px;
    text-align: center;
    width: 30px;
    color: white;
    padding: 2px;
    background-color: #ff7500;
    box-shadow: 2px 2px 3px #ccc;
}
.cover-box {
  flex: 2;
  padding: 20px;
}

.team-cover {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}

.content {
  flex: 8;
  justify-content: left;
  margin-top: 20px;

  .description {
    display: flex;
    font-size: 12px;

    :deep(.van-tag) {
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 15px;
    }

    .title {
      flex: 2;
    }

    .team-desc {
      font-family: 华文楷体;
      flex: 8;

      .team-description {
        width: 100px; /* 固定宽度 */
        white-space: nowrap; /* 超出宽度不换行 */
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        overflow: hidden; /* 多余部分隐藏 */
      }
    }

  }

  .join-user-list {
    display: flex;

    .user-avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }

    .join-team {
      display: inline-block;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #f6f6f6;
      font-size: 30px; /* 字号 */
      line-height: 35px; /* 使加号垂直居中 */
      text-align: center; /* 文字居中 */
      color: $text-secondary; /* 字体颜色 */
    }
  }
}

</style>
