<template>
  <div class="homepage">
    <div class="hero">
      <div class="hero__image" :style="{ 'background-image': 'url(' + bgImage + ')' }"></div>
      <HeaderComp />
    </div>

    <div class="items__container">
      <div class="items">
        <SingleItem v-for="item in items" :key="item.id" :item="item" @click="openOverlay(item)" />
      </div>
      <div class="discover">
        <span title="Go to Archive" aria-label="Discover All">
          <router-link to="/archive">Discover All</router-link>
        </span>
      </div>
    </div>
    <OverlayComp :item="selectedItem" :showOverlay="showOverlay" @close="closeOverlay" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Prismic from 'prismic-javascript';
import { prismicEndpoint } from '../../prismicConfig';
import { useRouter } from 'vue-router';

import HeaderComp from '@/components/HeaderComp.vue';
import OverlayComp from '@/components/OverlayComp.vue';
import SingleItem from '@/components/SingleItem.vue';

const bgImage = ref('');
const items = ref([]);
const selectedItem = ref(null);
const showOverlay = ref(false);
const router = useRouter();

onMounted(async () => {
  await fetchHomeData();
  await fetchItems();

  window.scrollTo(0, 0);

  const itemId = router.currentRoute.value.params.id;
  if (itemId) {
    const selectedItem = items.value.find((item) => item.id === itemId);
    if (selectedItem) {
      openOverlay(selectedItem);
    }
  }
});

const openOverlay = (item) => {
  selectedItem.value = item;
  showOverlay.value = true;
  document.body.style.overflow = 'hidden';
  router.push({ name: 'HomeItemDetail', params: { id: item.id } });
};

const closeOverlay = () => {
  selectedItem.value = null;
  showOverlay.value = false;
  document.body.style.overflow = 'auto';
  router.push('/');
};

const fetchHomeData = async () => {
  const apiID = 'home';

  try {
    const response = await Prismic.api(prismicEndpoint);
    const data = await response.query(Prismic.Predicates.at('document.type', apiID));

    if (data.results.length > 0) {
      const document = data.results[0].data;
      bgImage.value = document['hero-img'].url || '';
    }
  } catch (error) {
    console.error('Fetch error', error);
  }
};

const fetchItems = async () => {
  const apiID = 'projects';
  try {
    const response = await Prismic.api('https://gigastudio-test.cdn.prismic.io/api/v2');
    const data = await response.query(Prismic.Predicates.at('document.type', apiID), {
      pageSize: 3,
    });

    if (data.results.length > 0) {
      items.value = data.results.map((item) => ({
        id: item.id,
        price: `${item.data.price},00€`,
        title: item.data['item-title'][0].text,
        image: {
          url: item.data['item-image'].url,
        },
      }));
    }
  } catch (error) {
    console.error('Fetch error', error);
  }
};

</script>

<style lang="scss">
.homepage {
  padding-bottom: 120px;
  // animation: enter 0.8s ease;

  // @keyframes enter {
  //   0% {opacity: 0;}
  //   100% {opacity: 1;}
  // }

  .hero {
    min-height: 100vh;

    @media(max-width: $break-sm) {
      height: calc(var(--vh, 1vh) * 100);
    }

    &__image {
      height: 85vh;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-color: #EECD7E;

      @media(max-width: $break-sm) {
        height: 80vh;
      }
    }
  }

  .items__container {
    .items {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 20px;

      @media(max-width: $break-md) {
        overflow: scroll;
        width: 100vw;

        .item {
          width: 40vw;
        }
      }

      @media(max-width: $break-sm) {
        .item {
          width: 80vw;
        }
      }


    }

    .discover {
      padding: 16px;
      text-align: center;
    }
  }
}
</style>
