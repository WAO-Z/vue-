<template>
  <div id="login">
    <el-dialog
      title="登录"
      :visible="this.$store.state.centerDialogVisible"
      width="350px"
      center
      :show-close="false"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号码" prop="account">
          <el-input
            v-model.number="ruleForm.account"
            maxlength="11"
            placeholder="13888888888 密码：123"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm">登录</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        account: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        account: [{ validator: checkAccount, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.axios
        .post(`api/login`, {
          phone: this.ruleForm.account,
          password: this.ruleForm.pass,
        })
        .then((res) => {
          console.log(res);
          sessionStorage.setItem("token", res.data.result.token);
          this.$store.state.token = JSON.stringify(res.data.result.token);
          this.$store.state.name = res.data.result.name;
          this.$store.state.pjID = res.data.result.project_id;
          this.$message({
            message: "登录成功",
            type: "success",
          });
          this.$store.state.centerDialogVisible = false;
        })
        .catch((err) => {
          console.log(err);
          alert("密码错误");
        });
    },
    resetForm() {
      this.$store.state.centerDialogVisible = false;
    },
  },
};
</script>

<style>
</style>