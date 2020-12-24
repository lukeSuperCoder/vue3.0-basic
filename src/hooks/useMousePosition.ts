//获取鼠标坐标
import {onMounted,onUnmounted, ref} from "vue";
function useMousePosition() {
    const x = ref(0);
    const y = ref(0);
    const MouseUpdate = (e: MouseEvent)=>{
        x.value = e.pageX;
        y.value = e.pageY;
    }
    onMounted(()=>{
        document.addEventListener("click", MouseUpdate)
    })
    onUnmounted(()=>{
        document.removeEventListener("click", MouseUpdate)
    })
    return {x,y}
}
export default useMousePosition;
