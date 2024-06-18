//定义关于系统的store
import {defineStore} from 'pinia'
import {UserType} from "@/types/user";
import {getLoginUserAPI} from "@/api/service/user.ts";

const useSystemStore = defineStore("system", () => {
    // 当前登录的用户信息
    let loginUser = ref<UserType | undefined>(JSON.parse(JSON.stringify(localStorage.getItem("user"))));
    // 登录状态，true为已登录，false为未登录
    let loginState = ref<boolean>(false);

    // 存储当前登录用户信息
    const setLoginUser = (value: UserType): void => {
        value = JSON.parse(JSON.stringify(value));
        loginUser.value = value;
        localStorage.setItem("user", JSON.stringify(value));
    }

    // 清除当前登录的用户信息
    const removeLoginUser = ():void => {
        loginUser.value = undefined;
        localStorage.removeItem("user");
    }

    // 获取当前登录用户信息
    const getLoginUser = async () => {
        const res:BaseType.BaseResponse<UserType> = (await getLoginUserAPI()).data;
        if (res.code == 200) {
            loginUser.value = res.data;
            loginState.value = true;
        } else {
            loginState.value = false;
        }
    }

    // 获取登录状态
    const getLoginState = async () => {
        await getLoginUser();
        return loginState.value;
    }

    return {
        loginUser,
        loginState,
        setLoginUser,
        removeLoginUser,
        getLoginUser,
        getLoginState
    }
})

//暴露这个useCounter模块
export default useSystemStore;
