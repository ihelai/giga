<template>
  <div class="archive">
    <HeaderComp />

    <div class="archive__items">
      <SingleItem v-for="item in archiveItems" :key="item.id" :item="item" @click="openOverlay(item)" />
    </div>

    <OverlayComp :item="selectedItem" :showOverlay="showOverlay" @close="closeOverlay" />
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import Prismic from 'prismic-javascript';
import SingleItem from '@/components/SingleItem.vue';
import HeaderComp from '@/components/HeaderComp.vue';
import OverlayComp from '@/components/OverlayComp.vue';
import { prismicEndpoint } from '../../prismicConfig';
import { useRouter } from 'vue-router';

const archiveItems = ref([]);
const selectedItem = ref(null);
const showOverlay = ref(false);
const router = useRouter();

onMounted(async () => {
  await fetchArchiveItems();

  window.scrollTo(0, 0);
  // router.options.scrollBehavior = () => ({ x: 0, y: 0 });

  const itemId = router.currentRoute.value.params.id;
  if (itemId) {
    const selectedItem = archiveItems.value.find((item) => item.id === itemId);
    if (selectedItem) {
      openOverlay(selectedItem);
    }
  }
});

const fetchArchiveItems = async () => {
  const apiID = 'projects';

  try {
    const response = await Prismic.api(prismicEndpoint);
    const data = await response.query(Prismic.Predicates.at('document.type', apiID));

    if (data.results.length > 0) {
      archiveItems.value = data.results.map((item) => ({
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

const openOverlay = (item) => {
  showOverlay.value = true;
  selectedItem.value = item;
  document.body.style.overflow = 'hidden';
  router.push({ name: 'ArchiveItemDetail', params: { id: item.id } });
}

const closeOverlay = () => {
  showOverlay.value = false;
  selectedItem.value = null;
  document.body.style.overflow = 'auto';
  router.push('/archive');

}

</script>

<style scoped lang="scss">
.archive {
  // animation: enter 0.8s ease;

  // @keyframes enter {
  //   0% {opacity: 0;}
  //   100% {opacity: 1;}
  // }
  
  &__items {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media(max-width: $break-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media(max-width: $break-sm) {
      grid-template-columns: repeat(1, 1fr);
    }

  }
}
</style>
  