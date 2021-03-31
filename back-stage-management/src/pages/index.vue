

<template>
  <el-container id="box">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu :split-button="true" slot="dropdown">
          <el-dropdown-item @click.native="signOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{getUserInfo.username}}</span>
    </el-header>

    <el-container id="smallBox">
      <el-aside width="200px" >
        <el-menu router>
          <el-menu-item index="/home">
            <template  slot="title"><i class="el-icon-menu"></i>首页</template>
          </el-menu-item>


          <el-submenu v-for="item in menus" :key="item.id"  :index="item.id.toString()">
            <template slot="title"
              ><i :class="item.icon"></i>{{item.title}}</template
            >
            <el-menu-item v-for="val in item.children" :key="val.id" :index="val.url" >{{val.title}}</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-main>
        
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
#box {
  height: 100%;
}
#smallBox {
  height: calc(100% - 60px);
}
.el-breadcrumb{
  margin: 10px 0;
}
.el-header {
  background-color: #518ecb;
  color: #333;
  line-height: 60px;
}
.el-main{
  padding-bottom: 0;
}

.el-aside {
  color: #fff;
  background-color: rgb(238, 241, 246);
}
</style>

<script>
import { mapGetters , mapActions } from 'vuex'
export default {
  data() {
    return {
      menus:[]
    };
  },
  mounted() {
    if(sessionStorage.getItem('user')){
      this.menus = JSON.parse(sessionStorage.getItem('user')).menus
    }
    console.log( this.menus)
    
  },
  computed:{
    ...mapGetters(['getUserInfo'])
  },
  methods:{
    ...mapActions(['getUserInfoAction']),
    signOut(){
      this.getUserInfoAction()
      this.$router.push('/login')
      console.log("@@@@2");
    }
  }
};
</script>