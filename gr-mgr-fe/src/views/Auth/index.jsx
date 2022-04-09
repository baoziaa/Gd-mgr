import { defineComponent, reactive } from "vue";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons-vue";
import { message, Modal, Input } from "ant-design-vue";
import { result } from "@/helpers/utils";
import { getCharacterInfoById } from "@/helpers/character";
import { auth, resetPassword } from "@/service";
import store from "@/store";
import { useRouter } from "vue-router";
import { setToken } from "@/helpers/token";

// 用这个组件包一下defineComponent写配置项有提示,鼠标移上去会对这个属性有提示
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined
  },
  setup() {
    // 组件初始化的时候会执行一次

    const router = useRouter();

    // 注册用的表单数据
    const regForm = reactive({
      // reactive定义响应式数据的集合
      account: "",
      password: "",
      inviteCode: ""
    });

    const forgetPassword = () => {
      Modal.confirm({
        title: "请输入需要重置的账户,等待管理员的审核",
        content: (
          <div>
            <Input class="__forget_password_account" />
          </div>
        ),
        onOk: async () => {
          // 取到Input框的el值
          const el = document.querySelector(".__forget_password_account");
          let account = el.value;

          // console.log(account);
          const res = await resetPassword.add(account);

          result(res)
            .success(({ msg }) => {
              message.success(msg);
            });



        }
      });
    };

    // 注册逻辑
    const register = async () => {
      // 注册的时候做的事情
      //   console.log(regForm);
      if (regForm.account === "") {
        // 账户为空的时候弹框
        message.info("请输入账户");
        return;
      }

      if (regForm.password === "") {
        // 密码为空的时候弹框
        message.info("请输入密码");
        return;
      }

      if (regForm.inviteCode === "") {
        // 邀请码为空的时候弹框
        message.info("请输入邀请码");
        return;
      }
      // res 是 response的缩写 响应 res.data = { data } 通过结构的方式去拿到data
      // 调用了auth下面的register发送了一个http请求,带过去一个账户、密码和邀请码
      const res = await auth.register(regForm.account, regForm.password, regForm.inviteCode);

      result(res) // 调用result函数,传递给它一个res
        .success(data => {
          message.success(data.msg);
        })
        .fail(data => {
          message.error(data.msg);
        });
      // console.log(res);
    };
    // 登录用的表单数据
    const loginForm = reactive({
      // reactive定义一组响应式数据的集合
      account: "",
      password: ""
    });
    // 登录逻辑
    const login = async () => {
      if (loginForm.account === "") {
        // 账户为空的时候弹框
        message.info("请输入账户");
        return;
      }

      if (loginForm.password === "") {
        // 密码为空的时候弹框
        message.info("请输入密码");
        return;
      }

      const res = await auth.login(loginForm.account, loginForm.password);

      

      result(res).success( async ({ msg, data: { user, token } }) => {
        message.success(msg);
        // 设置token
        setToken(token);

        await store.dispatch('getCharacterInfo'); //拿到用户角色的信息
        
        store.commit("setUserInfo", user);
        store.commit("setuserCharacter", getCharacterInfoById(user.character));
        // console.log(store.state);
        // 从store.state里获取到管理员角色和当前成员的角色
        const { userInfo, characterInfo } = store.state;
        
        // 如果是管理员角色替换到/dashboard页面,反义替换到/records
        if (characterInfo[0]._id === userInfo.character) {
          router.replace("/dashboard");
        }

          router.replace("/records");

      });
    };

    return {
      // 注册相关的数据
      regForm, // 返回表单数据
      register, // 返回方法

      // 登录相关的数据
      loginForm,
      login,
      forgetPassword,
    };
  }
});
