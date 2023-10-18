<template>
  <footer class="footer">
    <div class="footer__title">
      <router-link to="/">
        <span v-if="title">{{ title }}</span>
      </router-link>
    </div>
    <div class="footer__links">
      <a :href="ig" target="_blank">Instagram</a>
      <a :href="fb" target="_blank">Facebook</a>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Prismic from 'prismic-javascript';
import { prismicEndpoint } from '../../prismicConfig';

const ig = ref('');
const fb = ref('');
const title = ref('');

onMounted(async () => {
  await fetchFooterData();
});

const fetchFooterData = async () => {
  const apiID = 'footer';

  try {
    const response = await Prismic.api(prismicEndpoint);
    const data = await response.query(Prismic.Predicates.at('document.type', apiID));

    if (data.results.length > 0) {
      const document = data.results[0].data;
      title.value = document.title[0]?.text || '';
      ig.value = document.ig.url || '';
      fb.value = document.fb.url || '';
    }

  } catch (error) {
    console.error('Fetch error', error)
  }
};

</script>

<style scoped lang="scss">
.footer {
  padding: 20px;
  margin-top: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media(max-width: $break-sm) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  &__links {
    display: flex;
    gap: 20px;

    a {

      color: $grey;
    }
  }
}
</style>
