<template>
  <q-page class="row items-center justify-evenly">
    <home-component title="Example component"></home-component>
  </q-page>
</template>

<script lang="ts">
import HomeComponent from 'components/HomeComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  components: { HomeComponent },
});
</script>
