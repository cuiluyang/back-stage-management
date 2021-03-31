<template>
  <el-dialog
    :title="dialogInfo.isAdd ? '添加菜单' : '编辑菜单'"
    :visible.sync="dialogInfo.isShow"
    width="65%"
    :before-close="cancel"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="一级分类">
        <el-select
          v-model="form.first_cateid"
          placeholder="请选择"
          @change="changeCate"
        >
          <el-option
            v-for="(item, index) in getSortList"
            :key="index"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="form.second_cateid" placeholder="请选择">
          <el-option
            v-for="(item, index) in secondSortList"
            :key="index"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
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
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="商品规格">
        <el-select
          @change="changeSpecs"
          v-model="form.specsid"
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in getSpecsList"
            :key="index"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格属性">
        <el-select v-model="form.specsattr" placeholder="请选择">
          <el-option
            v-for="(item, index) in attrsArr"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品">
        <el-switch
          v-model="form.isnew"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-form-item label="热卖推荐">
        <el-switch
          v-model="form.ishot"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
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
import { postGoodsAdd, getGoodsInfo, postEditGoods } from "@/axios/goods";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: "",
        ishot: "",
        status: "",
      },
      attrsArr: [],
      secondSortList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      imgUrl: "",
      fileList: [],
    };
  },
  props: ["dialogInfo"],
  computed: {
    ...mapGetters({
      getSortList: "sort/getSortList",
      getSpecsList: "specs/getSpecsList",
    }),
  },
  mounted() {
    this.getSortListAction();
    this.getSpecsListAction();
  },
  components: {},
  methods: {
    ...mapActions({
      getGoodsListAction: "goods/getGoodsListAction",
      getSortListAction: "sort/getSortListAction",
      getSpecsListAction: "specs/getSpecsListAction",
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
    //封装修改一级分类函数
    changeCate(n) {
      let index = this.getSortList.findIndex(
        (val) => val.id == this.form.first_cateid
      );
      this.secondSortList = this.getSortList[index].children;
    },
    // 封装修改商品规格函数
    changeSpecs(n) {
      let index = this.getSpecsList.findIndex(
        (val) => val.id == this.form.specsid
      );
      this.attrsArr = this.getSpecsList[index].attrs;
      console.log(this.attrsArr);
    },
    onSpecsid(id) {
      console.log(id);
    },
    // 封装关闭弹窗函数
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    //封装清空函数
    reset() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: "",
        ishot: "",
        status: "",
      };
      (this.attrsArr = []), (this.secondSortList = []);
    },
    //   封装添加逻辑
    submit() {
      this.form.img = this.imgUrl;
      let file = new FormData();
      for (let i in this.form) {
        file.append(i, this.form[i]);
      }
      postGoodsAdd(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.cancel();
          this.getGoodsListAction();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装获取一条角色信息方法
    lookUp(id) {
      getGoodsInfo({ id }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.changeSpecs(this.form.specsid);
          this.changeCate(this.form.first_cateid);
          this.fileList = this.form.img
            ? [{ url: this.$imgUrl + this.form.img }]
            : [];
          console.log("this.fileList",this.fileList);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装编辑提交逻辑
    edit() {
      this.form.img = this.imgUrl ? this.imgUrl : this.form.img
      console.log(this.form,"form");
      let file = new FormData();
      for(let i in this.form){
        file.append(i,this.form[i])
      }
      postEditGoods(file).then((res) => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getGoodsListAction();
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
