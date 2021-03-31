<template>
  <div>
    <el-table
      :data="getMenuList"
      style="width: 100%; height:84% margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号"> </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="pid" label="上级菜单"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="item">
          <i :clsss="item.row.icon"  ></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
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
        <template slot-scope="scope" >
          <el-button type="primary" size="small" @click="bianji(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import {postDelMenmu} from '@/axios/index'
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getMenuList:'menu/getMenuList'
    }),
  },
  components: {},
  methods: {
    ...mapMutations({
      MENU_LIST:'menu/MENU_LIST'
    }),
    //更新函数
    updataMenu(){
      this.MENU_LIST()
    },
    bianji(e) {
      this.$emit("edit",e);
    },
    del(id){
      console.log('删除',id);
      postDelMenmu(id)
      .then(res=>{
        this.$message.success(res.data.msg)
        this.updataMenu()
      })
    }
  },
};
</script>

<style lang="" scoped>
</style>
