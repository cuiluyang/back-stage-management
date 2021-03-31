<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
        <a :href="$route.path">{{$route.name}}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted(){
    console.log("router",this.$route);
  },
  components: {},
  methods: {},
};
</script>

