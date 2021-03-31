<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="手机号" prop="username">
      <el-input
        type="text"
        v-model="ruleForm.username"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { postUserLogin } from "../axios/user";
import { mapActions } from 'vuex'
export default {
  data() {
    var checkusername = (rule, value, callback) => {
      var re = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else if (value.match(re) == null) {
        callback(new Error("请填写正确的手机号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        // username: [{ validator: checkusername, trigger: "blur" }],
        // password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions(['getUserInfoAction']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postUserLogin(this.ruleForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getUserInfoAction(res.data.list)
              
              this.$router.push('/home')
            } else {
              this.$message.error(res.data.msg);
            }
            
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>