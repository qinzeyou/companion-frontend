import {defineStore} from 'pinia'
import {UserType} from "@/types/user";
import {getLoginUserAPI} from "@/api/service/user.ts";


// 定义关于系统的store
const useSystemStore = defineStore("system", () => {
    const loginUser = ref<UserType | null>();

    const setLoginUser = (val: UserType | null) => {
        loginUser.value = val;
        sessionStorage.setItem("user", JSON.stringify(val));
    }

    const getLoginUser = () => {
        getLoginUserService();
        return loginUser.value;
    }

    const getLoginUserService = () => {
        getLoginUserAPI().then((res: BaseType.BaseResponse<any>) => {
            if (res.data.code == 200) {
                setLoginUser(res.data)
            } else {
                setLoginUser(null)
            }
        })
    };

    return { loginUser, setLoginUser, getLoginUser }
});

// 暴露模块
export default useSystemStore;
