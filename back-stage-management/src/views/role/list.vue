<template>

  <el-table
    :data="getRoleList"
    style="width: 100%; height: 84%; margin-bottom: 20px"
    row-key="menuId"
    border
    default-expand-all
  >
  <button>asdfa</button>

    <el-table-column prop="id" label="角色编号"> </el-table-column>
    <el-table-column prop="rolename" label="角色名称"> </el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.status === 1 ? 'success' : 'danger'"
          disable-transitions
          >{{ scope.row.status === 1 ? "启用" : "未启用" }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="edit(scope.row.id)"
          >编辑</el-button
        >
        <el-button type="danger" size="small" @click="del(scope.row.id)"
          >删除</el-button
        >
        
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
// 引入辅助函数
import { mapGetters, mapActions } from "vuex";
import { postDelRole } from "@/axios/role";
export default {
  data() {
    return {
      tableData: [],
    };
  },

  computed: {
    ...mapGetters({
      getRoleList: "role/getRoleList",
    }),
  },
  components: {},
  mounted() {},
  methods: {
    ...mapActions({
      getRoleListAction: "role/getRoleListAction",
    }),
    //封装编辑函数
    edit(id) {
      this.$emit("edit", id);
    },
    //封装删除函数
    del(id) {
      postDelRole(id).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data);
          this.$message.success(res.data.msg);
          this.getRoleList = res.data.list;
          this.getRoleListAction();
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
