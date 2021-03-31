<template>
  <div>
        <!-- 面包屑 -->
    <el-bread></el-bread>
    <el-button type="primary" plain size="small" @click="tianjia"
      >添加</el-button
    >
    <v-dialog ref="diainfo" :dialogInfo="dialogInfo" @close="close" @cancel="cancel" ></v-dialog>
    <v-table ref="tabinfo" @edit="edit" ></v-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import vDialog from './dialog' 
import vTable from './table' 
export default {
  data() {
    return {
      tableData: [
        {
          type: 21,
          title: "系统管理",
          pid: 0,
          icon: "",
          url: "",
          state: true,
          children: [
            {
              type: 22,
              title: "菜单管理",
              pid: 21,
              icon: "",
              url: "/menu",
              state: true,
            },
            {
              type: 28,
              title: "角色管理",
              pid: 21,
              icon: "",
              url: "/role",
              state: true,
            },
            {
              type: 30,
              title: "管理员管理",
              pid: 21,
              icon: "",
              url: "/user",
              state: true,
            },
          ],
        },
        {
          type: 26,
          title: "商城管理",
          pid: 0,
          icon: "",
          url: "",
          state: true,
          children: [
            {
              type: 31,
              title: "商品分类",
              pid: 26,
              icon: "",
              url: "/sort",
              state: true,
            },
            {
              type: 32,
              title: "商品规格",
              pid: 26,
              icon: "",
              url: "/specs",
              state: true,
            },
            {
              type: 33,
              title: "商品管理",
              pid: 26,
              icon: "",
              url: "/goods",
              state: true,
            },
          ],
        },
      ],
      
      dialogInfo:{
        isShow:false,//控制组件的显示隐藏
        isAdd:true//判断添加编辑页面
      }

    };
  },
  computed:{
  },
  mounted(){
    this.MENU_LIST()
  },
  components: {
    vDialog,
    vTable
  },
  methods: {
    ...mapMutations({
      MENU_LIST:'menu/MENU_LIST'
    }),
    cancel(e){
      this.dialogInfo.isShow = false
    },
    close(e){
      this.dialogInfo.isShow = e
      this.$refs.tabinfo.updataMenu()
    },
    tianjia(){
      this.dialogInfo.isShow = true
      this.dialogInfo.isAdd = true
      this.$refs.diainfo.reset()

    },
    edit(e){
      this.dialogInfo.isShow = true
      this.dialogInfo.isAdd = false
      this.$refs.diainfo.lookup(e)

    }

  },
};
</script>

<style lang="" scoped>
</style>
