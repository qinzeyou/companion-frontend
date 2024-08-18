<script lang="ts" setup>

</script>

<template>
    <div class="box">
        <div class="login-box">
            <div class="head">
                <img src="@/assets/images/other.png" alt="logo">
                <p>寻找志同道合的好友</p>
            </div>
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box {
    height: calc(100vh - 46px);
    background-color: $baseBgc;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-box {
    width: 85%;
    background-color: white;
    border-radius: 20px;
    text-align: center;
    overflow: hidden;
    background-image:linear-gradient(to top, #fff1eb ,#ace0f9 100%);
    padding: 10px;
}

.head {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--bottom-line);
    margin-bottom: 20px;
    img {
        width: 45px;
        height: 45px;
        background-position: center;
        background-size: cover;
        margin-bottom: 20px;
    }
    p {
        margin-left: 10px;
        font-size: 20px;
        margin-bottom: 20px;
    }
}
</style>
