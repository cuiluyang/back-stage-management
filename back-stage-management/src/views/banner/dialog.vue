<template>
  <el-dialog
    :title="dialogInfo.isAdd ? '添加菜单' : '编辑菜单'"
    :visible.sync="dialogInfo.isShow"
    width="65%"
    :before-close="cancel"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
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
import { postBannerAdd, getBannerInfo, postEditBanner } from "@/axios/banner";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        title: "",
        img: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      imgUrl: "",
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  props: ["dialogInfo"],
  components: {},
  methods: {
    ...mapActions({
      getBannerListAction: "banner/getBannerListAction",
    }),
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
        title: "",
        img: "",
        status: 1,
      };
      this.imgUrl = "";
      this.fileList = [];
    },
    //   封装添加逻辑
    submit() {
      this.form.img = this.imgUrl;
      let file = new FormData();
      console.log(this.form);
      for (let key in this.form) {
        file.append(key, this.form[key]);
      }
      postBannerAdd(file).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data);
          this.$message.success(res.data.msg);
          this.cancel();
          this.getBannerListAction();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装获取一条角色信息方法
    lookUp(id) {
      getBannerInfo({ id }).then((res) => {
        console.log("一条",res);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.fileList = res.data.list.img ? [{url:this.$imgUrl + res.data.list.img}] : []
          console.log(this.form,"form");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装编辑提交逻辑
    edit() {
      this.form.img = this.imgUrl ? this.imgUrl : this.form.img;
      console.log(this.form);
      let file = new FormData();
      for (let key in this.form) {
        file.append(key, this.form[key]);
      }
      postEditBanner(this.form).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getBannerListAction();
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
