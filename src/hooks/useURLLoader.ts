import {ref} from 'vue'
import axios from 'axios'
function useURLLoader <T> (url: string) {
    const result = ref <T | null>(null);
    const loading = ref(true);
    const loader = ref(false);
    const error = ref(null);
    axios.get(url).then((rowData)=>{
        loading.value=false;
        loader.value=true;
        result.value=rowData.data;
    }).catch((e)=>{
        error.value=e;
        loading.value=false;
    })
    return  {loading,loader,result,error}
}
export default useURLLoader;