# inject-pm
独立于框架的单例注入容器，可应用于react vue 任何js 框架或项目中，实现多模块数据状态共享以及控制类的单例化,容器内只可以注入纯CLASS类  

使用方式
1.VUE下写一个class控制类,并添加一个data属性作为共享状态,属性名任意
export default class ViewPM {
    constructor(props) {
         this.data = {
             title:"hello world",
             message:"共享数据"
         };
    }
    
    changeMessage(){
       this.data.message = "共享数据变化" ;
    }
}
2.添加VUE视图1，并使用控制类共享状态
<script>
    import ViewPM from "./ViewPM";

    export default {
        data() {
            this.viewPM = Inject.getClass(ViewPM);//通过注入获得单例类
            return this.viewPM.data;
        }  
    }
</script>
<template>
  <div>{{title}}</div>
  <div @click="viewPM.changeMessage()">{{message}}</div> 
</template>  

3.添加VUE视图2，并使用控制类共享状态
<script>
    import ViewPM from "./ViewPM";

    export default {
        data() {
            this.viewPM = Inject.getClass(ViewPM);//通过注入获得单例类
            return this.viewPM.data;
        } 
    }
</script>
<template>
  <div>{{title}}</div>
  <div>{{message}}</div> 
</template>  
