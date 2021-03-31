<template>
  <el-dialog
    :title="dialogInfo.isAdd ? '添加菜单' : '编辑菜单'"
    :visible.sync="dialogInfo.isShow"
    width="65%"
    :before-close="cancel"
  >
    <el-form label-width="80px">
      <el-form-item label="上级分类">
        <el-tree
          :data="[{id:0,catename:'顶级分类',children:[...getSortList]},]"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-expand-all="true"
          :check-strictly="true"
          :default-checked-keys="checkedKeys"
          :props="defaultProps"
          @check-change="handleClick"
        >
        </el-tree>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="form.catename"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :file-list="fileList"
          :limit="1"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="onChang"
          :on-exceed="onExceed"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
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
import { postSortAdd, getSortInfo, postEditSort } from "@/axios/sort";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      imgUrl: "",
      fileList: [],
      defaultProps: {
        children: "children",
        label: "catename",
      },
      checkedKeys: [],
    };
  },
  props: ["dialogInfo"],
  computed: {
    ...mapGetters({
      getSortList: "sort/getSortList",
    }),
  },
  mounted() {},
  components: {},
  methods: {
    ...mapActions({
      getSortListAction: "sort/getSortListAction",
    }),
    
handleClick(data,checked, node){
  console.log(data,checked);
	if(checked){
		this.$refs.tree.setCheckedNodes([data]);
	}
},
    // 预览的回调函数
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 移除触发的钩子函数
    handleRemove(file, fileList) {
      console.log(fileList);
    },
    // 预览触发的钩子函数
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleDownload(file) {
      console.log(file);
    },
    // 文件发生变化触发的钩子函数
    onChang(flie, fileList) {
      console.log(fileList, "文件列表");
      this.imgUrl = flie.raw;
    },

    // 封装关闭弹窗函数
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //封装清空函数
    reset() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.fileList = [];
      this.checkedKeys= [];
    },
    //   封装添加逻辑
    submit() {
      this.form.pid = this.$refs.tree.getCheckedKeys()[0]
      this.form.img = this.imgUrl;
      let file = new FormData();
      for (let i in this.form) {
        file.append(i, this.form[i]);
      }
      console.log(this.form)
      postSortAdd(file).then((res) => {
        if (res.data.code == 200) {
          console.log("@@",res.data)
          this.$message.success(res.data.msg);
          this.cancel();
          this.getSortListAction();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装获取一条角色信息方法
    lookUp(id) {
      getSortInfo({ id }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.checkedKeys = [this.form.pid]
          this.fileList = this.form.img
            ? [{ url: this.$imgUrl + this.form.img }]
            : [];
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装编辑提交逻辑
    edit() {
      console.log(this.form);
      postEditSort(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSortListAction();
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
