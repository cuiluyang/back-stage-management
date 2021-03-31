<template>
  <el-dialog
    :title="dialogInfo.isAdd ? '添加菜单' : '编辑菜单'"
    :visible.sync="dialogInfo.isShow"
    width="65%" :before-close="cancel"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.rolename"></el-input>
      </el-form-item>
      <el-form-item>
        <el-tree
          :data="getMenuList"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-checked-keys="checkedKeys"
          :props="defaultProps"
        >
        </el-tree>
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
import { postRoleAdd, getRoleInfo, postEditRole } from "@/axios/role";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      checkedKeys:[]
    };
  },
  props: ["dialogInfo"],
  computed: {
    ...mapGetters({
      getMenuList: "menu/getMenuList",
    }),
  },
  mounted() {
    this.menuListAction();
  },
  components: {},
  methods: {
    ...mapActions({
      getRoleListAction: "role/getRoleListAction",
      menuListAction: "menu/menuListAction",
    }),
    // 封装关闭弹窗函数
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //封装清空函数
    reset() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    //   封装添加逻辑
    submit() {
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      console.log(this.form.menus);
      postRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getRoleListAction();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装获取一条角色信息方法
    lookUp(id) {
      getRoleInfo({ id }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.checkedKeys = this.form.menus.split(',')
          this.form.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装编辑提交逻辑
    edit() {
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      console.log(this.form.menus);
      postEditRole(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getRoleListAction();
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
