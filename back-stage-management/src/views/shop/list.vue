<template>
  <el-table
    :data="getGoodsList"
    style="width: 100%; height: 84%; margin-bottom: 20px"
    row-key="menuId"
    border
    default-expand-all
  >
    <el-table-column prop="id" label="角色编号"> </el-table-column>
    <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
    <el-table-column prop="price" label="价格"> </el-table-column>
    <el-table-column prop="market_price" label="市场价格"> </el-table-column>
    <el-table-column prop="img" label="图片">
      <template slot-scope="item">
        <img id="imgUrl" :src="$imgUrl + item.row.img" alt="">
      </template>
      
    </el-table-column>
    <el-table-column prop="isnew" label="是否热卖"> </el-table-column>
    <el-table-column prop="ishot" label="是否推荐"> </el-table-column>
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
import { postDelGoods } from "@/axios/goods";
export default {
  data() {
    return {
      tableData: [],
    };
  },

  computed: {
    ...mapGetters({
      getGoodsList: "goods/getGoodsList",
    }),
  },
  components: {},
  mounted() {},
  methods: {
    ...mapActions({
      getGoodsListAction: "goods/getGoodsListAction",
    }),
    //封装编辑函数
    edit(id) {
      this.$emit("edit", id);
    },
    //封装删除函数
    del(id) {
      console.log(id);
      postDelGoods(id).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getGoodsListAction();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
#imgUrl{
  width: 80px;
}
</style>
