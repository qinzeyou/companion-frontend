<!--
基础队伍展示card
-->
<script lang="ts" setup>
import {TeamType} from "@/types/team";

interface Props {
    team: TeamType, // 队伍数据
}

const props = defineProps<Props>();
</script>

<template>
    <div class="team-card">
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
            <div class="join-user-list">
                <van-space>
                    <img class="user-avatar" src="@/assets/images/user-avatar-default.jpg" alt="">
                    <div class="join-team">+</div>
                </van-space>
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
