<template>
  <el-dialog
    :title="dialogInfo.isAdd ? '添加菜单' : '编辑菜单'"
    :visible.sync="dialogInfo.isShow"
    width="65%"
    :before-close="cancel"
  >
    <el-form ref="form" label-width="80px">
      <el-form-item label="规格名称">
        <el-input v-model="form.specsname"></el-input>
      </el-form-item>

      <el-form-item
        v-for="(item, index) in attrArr"
        :label="'属性' + index"
        :key="item.key"
        :prop="'attrArr.' + index + '.value'"
      >
        <el-input v-model="item.value"></el-input>

        <el-button @click.prevent="removeDomain(item)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain">新增属性</el-button>
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
import { postSpecsAdd, getSpecsInfo, postEditSpecs } from "@/axios/specs";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      attrArr: [
        {
          value: "",
        },
      ],
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
      getSpecsListAction: "specs/getSpecsListAction",
      menuListAction: "menu/menuListAction",
    }),

    removeDomain(item) {
      var index = this.attrArr.indexOf(item);
      if (index !== -1) {
        this.attrArr.splice(index, 1);
      }
    },
    addDomain() {
      this.attrArr.push({
        value: "",
        key: Date.now(),
      });
    },

    // 封装关闭弹窗函数
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //封装清空函数
    reset() {
      this.form = {
        specsname: "",
        menus: "",
        status: 1,
      };
      this.attrArr=[
        {
          value: "",
        },
      ]
    },
    //   封装添加逻辑
    submit() {
      //整理数据给this.form.attrs赋值
      this.form.attrs = this.attrArr.map((val)=>val.value).join(',')
      console.log(this.form.attrs);
      postSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getSpecsListAction();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装获取一条角色信息方法
    lookUp(id) {
      getSpecsInfo({ id }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          this.attrArr = this.form.attrs.map((val)=>({value:1}))
          this.form.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装编辑提交逻辑
    edit() {
      postEditSpecs(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsListAction();
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
