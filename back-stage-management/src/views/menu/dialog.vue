<template>
  <el-dialog
    :title="dialogInfo.isAdd ? '添加菜单' : '编辑菜单'"
    :visible.sync="dialogInfo.isShow"
    width="65%" :before-close="close"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-select v-model="form.pid" placeholder="请选择">
          <el-option
            label="根目录"
            :value="0"
          ></el-option>
          <el-option
            v-for="item in getMenuList.filter((val) => val.pid == 0)"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio v-model="form.type" :label="1">目录</el-radio>
        <el-radio v-model="form.type" :label="2">菜单</el-radio>
      </el-form-item>
      <el-form-item label="菜单地址">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1"
     :inactive-value="2" ></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button v-if='dialogInfo.isAdd' type="primary" @click="tijiao">提 交</el-button>
      <el-button v-else type="primary" @click="edit">编 辑</el-button>
      <el-button @click="dialogInfo.isShow = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { getMenuInfo ,postEditMenu ,menuAdd } from "@/axios/index";
export default {
  data() {
    return {
      form: {
        type: 1,
        title: "",
        pid: null,
        icon: "",
        url: "",
        status: 2,
      },
    };
  },
  props: ["dialogInfo"],
  computed: {
    ...mapGetters({
      getMenuList:'menu/getMenuList'
    }),
  },
  components: {},
  methods: {
    ...mapMutations({
      MENU_ADD:'menu/MENU_ADD'
    }),
    close(){
      this.$emit('close',false)
      this.reset()
    },
    tijiao() {
      console.log(this.form);
      this.$emit('cancel',false)
      menuAdd(this.form).then(res=>{
        if(res.data.code == 200){
          this.$message.success('添加成功')
          this.close()
        }else{
          this.$message.error('添加失败')
        }
      })
    },
    lookup(id) {
      console.log("编辑",id);
      getMenuInfo({ id }).then((res) => {
        if (res.data.code === 200) {
          console.log(id, res);
          this.form = res.data.list;
          this.form.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装一个清空的函数
    reset() {
      this.form = {
        type: 1,
        title: "",
        pid: null,
        icon: "",
        url: "",
        state: 2,
      };
    },
    //编辑逻辑
    edit(){
      postEditMenu(this.form)
      .then(res=>{
        if(res.data.code === 200){
          this.$message.success(res.data.msg);
          this.close()
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    //封装一个删除函数
    del(){

    }
  },
};
</script>

<style lang="" scoped>
</style>
