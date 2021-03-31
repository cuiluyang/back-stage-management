<template>
  <div>
    <el-table
      :data="getUserList"
      style="width: 100%; height: 84%; margin-bottom: 20px"
      row-key="menuId"
      border
      default-expand-all
    >
      <el-table-column prop="roleid" label="所属角色"> </el-table-column>
      <el-table-column prop="username" label="角色名称"> </el-table-column>
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
          <el-button type="primary" size="small" @click="edit(scope.$index)"
            >编辑</el-button
          >

          <el-button type="danger" size="small" @click="del(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration">页数较少时的效果</span>
      <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="getPageSize" :total="getUserCount"> </el-pagination>
    </div>
  </div>
</template>

<script>
// 引入辅助函数
import { mapGetters, mapActions } from "vuex";
import { postDelUser } from "@/axios/user";
export default {
  data() {
    return {
    };
  },

  computed: {
    ...mapGetters({
      getUserList: "user/getUserList",
      getUserCount:'user/getUserCount',
      getPageSize:'user/getPageSize',
    }),
  },
  components: {},
  mounted() {
    this.getUserListAction([this.getPageSize, 1]);
    this.getUserCountAction()
  },
  methods: {
    ...mapActions({
      getUserListAction: "user/getUserListAction",
      getUserCountAction:'user/getUserCountAction'
    }),
    submit() {
      console.log(this.getUserCount);
    },
    //点击分页器 pageSize 改变时会触发
    handleCurrentChange(val){
      this.getUserListAction([this.getPageSize, val]);
    },
    //封装编辑函数
    edit(index) {
      this.$emit("edit", this.getUserList[index].uid);
    },
    //封装删除函数
    del(index) {
      postDelUser(this.getUserList[index].uid).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getUserListAction();
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
