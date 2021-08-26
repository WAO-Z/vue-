<template>
  <div id="login">
    <el-dialog
      title="注册"
      :visible="this.$store.state.isRegister"
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
        <el-form-item label="昵称" prop="name">
          <el-input
            type="text"
            v-model="ruleForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="account">
          <el-input v-model.number="ruleForm.account" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm">注册</el-button>
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
        let pnoneNum =
          /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/;

        if (!pnoneNum.test(value)) {
          callback(new Error("格式错误"));
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

    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
    return {
      ruleForm: {
        pass: "",
        account: "",
        name: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
        account: [{ validator: checkAccount, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.axios
        .post(`api/register`, {
          name: this.ruleForm.name,
          phone: this.ruleForm.account,
          password: this.ruleForm.pass,
        })
        .then(() => {
          this.$message({
            message: "注册成功",
            type: "success",
          });
          this.$store.state.isRegister = false;
        })
        .catch((err) => {
          alert("手机号已注册");
          console.log(err);
        });
    },
    resetForm() {
      this.$store.state.isRegister = false;
    },
  },
};
</script>

<style>
</style>