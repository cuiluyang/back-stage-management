<template>
  <el-dialog
    :title="dialogInfo.isAdd ? '添加菜单' : '编辑菜单'"
    :visible.sync="dialogInfo.isShow"
    width="65%"
    :before-close="cancel"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色编号">
        <el-select v-model="form.roleid" placeholder="请选择">
          <el-option
            v-for="item in getRoleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理员名称">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="dialogInfo.isAdd" type="primary" @click="submit"
        >提 交</el-button
      >
      <el-button v-else type="primary" @click="edit">编 辑</el-button>
      <el-button @click="cancel">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { postUserAdd, getUserInfo, postEditUser } from "@/axios/user";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  props: ["dialogInfo"],
  mounted() {
    this.getRoleListAction();
  },
  computed: {
    ...mapGetters({
      getRoleList: "role/getRoleList",
      getPageSize: "user/getPageSize"
    }),
  },
  components: {},
  methods: {
    ...mapActions({
      getUserListAction: "user/getUserListAction",
      getRoleListAction: "role/getRoleListAction",
    }),
    // 封装关闭弹窗函数
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //封装清空函数
    reset() {
      this.form = {
        roleid: 12,
        username: "",
        password: "",
        status: 1,
      };
    },
    //   封装添加逻辑
    submit() {
      postUserAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getUserListAction([this.getPageSize,1]);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装获取一条角色信息方法
    lookUp(uid) {
      getUserInfo({ uid }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = ''
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装编辑提交逻辑
    edit() {
      console.log(this.form);
      postEditUser(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getUserListAction([this.getPageSize,1]);
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
