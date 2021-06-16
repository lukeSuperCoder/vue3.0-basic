<template>
    <div>
        <img :src="result && result.message">
    </div>
</template>

<script>
    import axios from 'axios'
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: "DogShow",
        async setup(){
            const rowData = await axios.get('https://dog.ceo/api/breeds/image/random');
            return {
                result:rowData.data
            }
        }
    })
</script>

<style scoped>

</style>