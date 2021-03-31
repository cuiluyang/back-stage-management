<template>
  <div>
    <el-table
      :data="getSpecsList"
      style="width: 100%; height: 84%; margin-bottom: 20px"
      row-key="menuId"
      border
      default-expand-all
    >
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="scope" >
        <el-tag v-for="(item) in scope.row.attrs" :key="item" 
          type="success"
          disable-transitions
          >{{item}}</el-tag
        >
      </template>
      </el-table-column>
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
  </div>
</template>

<script>
// 引入辅助函数
import { mapGetters, mapActions } from "vuex";
import { postDelSpecs } from "@/axios/specs";
export default {
  data() {
    return {
      tableData: [],
    };
  },

  computed: {
    ...mapGetters({
      getSpecsList: "specs/getSpecsList",
    }),
  },
  components: {},
  mounted() {},
  methods: {
    ...mapActions({
      getSpecsListAction: "specs/getSpecsListAction",
    }),
    aaaaaa() {
      console.log(this.getSpecsList);
    },
    //封装编辑函数
    edit(id) {
      this.$emit("edit", id);
    },
    //封装删除函数
    del(id) {
      postDelSpecs(id).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsListAction();
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
