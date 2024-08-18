import { defineStore } from "pinia";
import { UserType } from "@/types/user";
import { getLoginUserAPI } from "@/api/service/user.ts";
import { BaseResponse, PageRequest } from "@/types/base-type";
import { ref } from "vue";
import { NoticeType } from "@/types/notice";
import { noticePageAPI } from "@/api/service/notice.ts";

// 定义关于系统的store
const useSystemStore = defineStore("system", () => {
  const loginUser = ref<UserType | null>();

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

  // 公告分页数据
  const noticeList = ref<NoticeType[]>([]);
  // 获取公告数据
  const getNoticeData = async (data: PageRequest) => {
    const res = await noticePageAPI(data);
    if (res.code == 200) {
      noticeList.value = res.data.records;
    }
  };

  return { loginUser, noticeList, setLoginUser, getLoginUser, getNoticeData };
});

// 暴露模块
export default useSystemStore;
