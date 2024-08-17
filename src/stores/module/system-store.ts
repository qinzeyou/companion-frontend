import { defineStore } from "pinia";
import { UserType } from "@/types/user";
import {
  getLoginUserAPI,
  getRecommendUserListAPI,
} from "@/api/service/user.ts";
import { BaseResponse } from "@/types/base-type";
import { ref } from "vue";

// 定义关于系统的store
const useSystemStore = defineStore("system", () => {
  const loginUser = ref<UserType | null>();
  // 推荐用户列表
  const userList = ref<UserType[]>([]);
  let pageNum = 1;
  const pageSize = 10;

  // 获取数据
  const loadData = async () => {
    userList.value = [];
    // 心动模式匹配
    const res = await getRecommendUserListAPI({ pageNum, pageSize });
    if (res.code == 200) {
      userList.value = [...userList.value, ...res.data.records];
      pageNum++;
    }
  };

  const setLoginUser = (val: UserType | null) => {
    loginUser.value = val;
    sessionStorage.setItem("user", JSON.stringify(val));
  };

  const getLoginUser = () => {
    getLoginUserService();
    return loginUser.value;
  };

  const getLoginUserService = () => {
    getLoginUserAPI().then((res: BaseResponse<any>) => {
      if (res.data.code == 200) {
        setLoginUser(res.data);
      } else {
        setLoginUser(null);
      }
    });
  };

  return { loginUser, userList, setLoginUser, getLoginUser, loadData };
});

// 暴露模块
export default useSystemStore;
