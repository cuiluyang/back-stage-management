<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" plain size="small" @click="add">添加</el-button>
    <!-- 列表组件 -->
    <v-list @edit="edit"></v-list>
    <!-- 弹窗组件 -->
    <v-dialog ref="dialog" :dialogInfo="dialogInfo" @cancel="cancel" ></v-dialog>
  </div>
</template>

<script>
import vList from "./list";
import vDialog from "./dialog";
import {mapActions } from "vuex";
import ElBread from '../../common/elBread.vue';
export default {
  data() {
    return {
      dialogInfo: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  components: {
    vList,
    vDialog
  },
  mounted() {
    this.getBannerListAction()
  },
  methods: {
    ...mapActions({
      getBannerListAction: "banner/getBannerListAction",
    }),
    add() {
      this.dialogInfo = {
        isShow: true,
        isAdd: true,
      };
    },
    edit(e) {
      this.dialogInfo = {
        isShow: true,
        isAdd: false,
      };
      this.$refs.dialog.lookUp(e);
    },
    // 修改dialogInfo.isShow
    cancel(boor) {
      this.dialogInfo.isShow = boor;
    },
  },
};
</script>

<style lang="" scoped>
</style>
