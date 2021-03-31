<template>
  <el-table
    :data="getSortList"
    style="width: 100%; height: 84%; margin-bottom: 20px"
    row-key="id"
    border
    default-expand-all
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="分类编号"> </el-table-column>
    <el-table-column prop="catename" label="分类名称"> </el-table-column>
    <el-table-column prop="img" label="图片">
      <template slot-scope="item" >
        <img  v-if="item.row.id != 0" id="sortImg" :src="item.row.img ? $imgUrl + item.row.img : ''" alt="">
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
</template>

<script>
// 引入辅助函数
import { mapGetters, mapActions } from "vuex";
import { postDelSort } from "@/axios/sort";
export default {
  data() {
    return {
      tableData: [],
    };
  },

  computed: {
    ...mapGetters({
      getSortList: "sort/getSortList",
    }),
  },
  components: {},
  mounted() {
    
  },
  methods: {
    ...mapActions({
      getSortListAction: "sort/getSortListAction",
    }),
    //封装编辑函数
    edit(id) {
      this.$emit("edit", id);
    },
    //封装删除函数
    del(id) {
      console.log(id);
      postDelSort(id).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSortListAction();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>

#sortImg{
  width: 100px;
  margin: 0 auto;
}
</style>
