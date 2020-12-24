<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>{{count}}</h1>
  <h1>{{double}}</h1>
  <h1>{{greeting}}</h1>
  <p>{{error1}}</p>
 <!-- 异步加载asyncshow组件，可以设置加载和未加载状态-->
  <Suspense>
    <template #default>
      <DogShow></DogShow>
    </template>
    <template #fallback>
      <h1>Loading....</h1>
    </template>
  </Suspense>
  <h1>X:{{x}}</h1>
  <h1>Y:{{y}}</h1>
  <modal :isOpen="modalIsOpen" @close-modal="onModalClose"></modal>
  <h1 v-if="loading">loading...</h1>
  <img v-if="loader" :src="result.message">
  <button @click="openModal">openmodal</button>
  <button @click="increase">+1</button><br>
  <button @click="updateGreeting">greeting</button>
  <ul>
    <li v-for="num in number" :key="num">
      <h1>{{num}}</h1>
    </li>
  </ul>
  <h1>{{person.name}}</h1>
</template>
<script lang="ts">
import {ref,computed,reactive,toRefs,onMounted,onUpdated,onRenderTriggered,watch,onErrorCaptured} from 'vue';
import useMousePosition from "@/hooks/useMousePosition";
import useURLLoader from "@/hooks/useURLLoader";
import modal from "./components/modal.vue"
import AsyncShow from "./components/AsyncShow.vue"
import DogShow from "./components/DogShow.vue"
interface DataProps {
   count: number;
   double: number;
   increase: () => void;
   number: number[];
   person: {name?: string};
}
interface DogResult{
   message: string;
   status: string;
}
export default ({
  name: 'App',
  components:{
    modal
  },
  setup(){        //最开始加载时的方法，比create更早，这时候还没有this
   /* const count = ref(0)
    const increase= ()=> {
        count.value++;
    }
    const double = computed(()=>{
        return  count.value*2;
    })
    return {
      count,
      increase,
      double
    }*/
    onMounted(()=>{                           //初始化执行方法
      console.log('mouted')
    })
    onUpdated(()=>{                           //更新数据会执行的方法
      console.log('update')
    })
    onRenderTriggered((event)=>{      //vue3.0提供的debugger调试方法，可以看到更新的内容变化
      console.log(event)
    })
    const error1 = ref(null)
    onErrorCaptured((e: any)=>{
      error1.value=e;
    })
    //data对象逻辑控制
   const data: DataProps = reactive({
     count:0,
     double: computed(()=>data.count*2),
     increase:()=>{data.count++},
     number:[0,1,2],
     person:{}
   })
    data.number[0]=5;
    data.person.name = 'luchang';
    const {x,y} = useMousePosition();     //将方法写在ts文件里调用，方便复用
    //使用axios调取狗狗图片接口
    const {loading,loader,result,error} = useURLLoader <DogResult> ('https://dog.ceo/api/breeds/image/random');
    watch(result,()=>{
        console.log(result.value)       //由于默认给result为空，所以无法使用补全代码功能，最好用泛型约束一下
       if(result.value){                 //由于是联合类型，需要判断是否为空，不为空则打印
         console.log(result.value.message)
       }
    })
    //点击greeting按钮，页面标题改变
    const greeting = ref('');
    const updateGreeting = () => {
      greeting.value+='hello';
    }
    watch([greeting,()=>data.count],(newValue,oldValue)=>{              //使用监听函数可以一直监听变量是否变化，而不是初始化执行一次就不再执行
      console.log('newvalue',newValue);
      console.log('oldvalue',oldValue);
      document.title='update'+greeting.value
    })
    const refData = toRefs(data)      //需要将data中的属性转换为响应式的对象，就是ref格式的，需要reactive和toRefs配合使用
    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }
    return {
     ...refData,onMounted,onUpdated,onRenderTriggered,updateGreeting,greeting,
      x,y,loading,loader,result,error,
      modalIsOpen,openModal,onModalClose,AsyncShow,DogShow,onErrorCaptured,error1
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
