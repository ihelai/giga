<template>
    <transition name="slide-up">
        <div v-if="showOverlay" class="overlay">

            <div class="overlay__title">
                <h3>{{ item.title }}</h3>
            </div>
            <div class="overlay__image">
                <img :src="item.image.url" :alt="item.title" />
            </div>
            <div class="overlay__price">
                <span>{{ item.price }}</span>
            </div>

            <div class="overlay__close" @click="closeOverlay">
                Close
            </div>
        </div>
    </transition>
</template>
  
<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
    item: Object,
    showOverlay: Boolean
})

const emit = defineEmits(['close'])

const router = useRouter();
const closeOverlay = () => {
    const from = router.currentRoute.value.query.from || '/';
    router.push({ path: from });
    emit('close');
};
</script>
  
<style scoped lang="scss">
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    height: 100vh;
    background-color: white;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
    transition: top 0.5s ease;
    padding: 20px;

    @media(max-width: $break-sm) {
        height: calc(var(--vh, 1vh) * 100);
        grid-template-columns: repeat(1, 1fr);
        padding: 0;
    }

    &__title {
        display: flex;
        align-items: flex-end;

        @media(max-width: $break-sm) {
            position: absolute;
            bottom: 20px;
            left: 20px;
            max-width: 55%;
        }
    }

    &__image {
        height: calc(100vh - 40px);

        @media(max-width: $break-sm) {
            height: 100vh;
        }

        img {
            height: 100%;
            max-width: 50vw;
            object-fit: cover;
            object-position: center;

            @media(max-width: $break-sm) {
                width: 100%;
                max-width: 100%;
            }
        }
    }

    &__price {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;

        @media(max-width: $break-sm) {
            position: absolute;
            bottom: 20px;
            right: 20px;
            max-width: 40%;
        }
    }

    &__close {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }
}

// <transition> animation
.slide-up {

    // animation
    &-enter-active,
    &-leave-active {
        transition: top 0.8s ease;
    }

    // 'from' state
    &-enter-from,
    &-leave-to {
        top: 100vh;
    }

    // 'to' state
    &-enter-to,
    &-leave-from {
        top: 0;
    }

}
</style>
  