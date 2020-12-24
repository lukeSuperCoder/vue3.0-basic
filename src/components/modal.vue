<template>
    <teleport to="#modal">           <!--通过teleport组件，使modal组件脱离出app传送到指定的位置-->
        <div id="center" v-if="isOpen">
            <h2><slot>我是一个自定义对话框</slot></h2>
            <button @click="buttonClick">close</button>
        </div>
    </teleport>
</template>

<script>
    import {defineComponent} from  'vue'
    export default defineComponent({
        props:{
            isOpen: Boolean
        },
        emits:{
            'close-modal': null
        },
        setup(prop,context){
            const buttonClick = () =>{              //将close-modal事件注册进buttonClick方法
                context.emit('close-modal')
            }
            return{
                buttonClick
            }
        }
    })
</script>

<style scoped>
    #center{
        width: 200px;
        height: 200px;
        border: 2px solid black;
        background: white;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-left: -100px;
        margin-top: -100px;
    }
</style>