<template>
    <header>
        <router-link to="/">
            <h1>{{ title }}</h1>
        </router-link>
        <h2>{{ subtitle }}</h2>
    </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Prismic from 'prismic-javascript';
import { prismicEndpoint } from '../../prismicConfig';

const title = ref('');
const subtitle = ref('');

onMounted(async () => {
    await fetchHeaderData();
});

const fetchHeaderData = async () => {
    const apiID = 'header';

    try {
        const res = await Prismic.api(prismicEndpoint);
        const data = await res.query(Prismic.Predicates.at('document.type', apiID));

        if (data.results.length > 0) {
            const document = data.results[0].data;
            title.value = document.title[0].text || '';
            subtitle.value = document.subtitle[0].text || '';
        }
    } catch (error) {
        console.error('Fetch error', error);
    }
}
</script>

<style scoped lang="scss">
header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px 20px 120px 20px;

    h2 {
        color: $grey;
    }

}
</style>