<template>
    <div class="item" :style="{ 'background-image': 'url(' + item.image.url + ')' }">
        <h3>{{ item.title }}</h3>
        <p>{{ item.price }}</p>
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue';

defineProps({
    item: Object
})

</script>
  
<style scoped lang="scss">
.item {
    aspect-ratio: 0.71;
    width: 100%;
    height: 100%;
    padding: 18px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;

    @media(max-width: $break-sm) {
        aspect-ratio: 0.8;
    }

    h3 {
        word-break: break-word;
    }
}
</style>
  