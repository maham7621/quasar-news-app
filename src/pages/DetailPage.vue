<template>
  <div class="home-page">
    <div>
      <q-toolbar>
        <q-toolbar-title>
          Detail page
        </q-toolbar-title>
      </q-toolbar>
    </div>
    <h4>{{ article.title }}</h4>
    <div>
      <q-card class="full-width-card" v-if="article">
        <!-- Published At date -->
        <q-card-subtitle v-if="article.publishedAt"><b>Published At: </b> {{ formatDate(article.publishedAt)
        }}</q-card-subtitle>

        <!-- Image section -->
        <q-img :src="article.urlToImage" basic cover class="full-width-card-image" alt="Article Image" />

        <!-- Content section -->
        <q-card-section>
          <!-- Article source -->
          <q-card-title><b>Source: {{ article.source.name }}, </b></q-card-title>

          <!-- Article description -->
          <q-card-text>{{ article.description }}</q-card-text>

          <!-- Author's name -->
          <q-card-subtitle class="article-author" v-if="article.author"><b>By: </b>{{ article.author }}</q-card-subtitle>
        </q-card-section>
      </q-card>
      <q-btn @click="goBack" label="Go Back" color="primary" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'DetailPage',
  data() {
    return {
      article: '',
    };
  },
  mounted() {
    const jsonData = this.$route.query.data;
    const dataObject = JSON.parse(jsonData);
    this.article = dataObject.key
    console.log('dyge', dataObject)
  },
  methods: {
    formatDate(dateString: string) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    goBack() {
      this.$router.go(-1); // Go back one step in the browser's history
    },
  },
});
</script>
<style scoped>
/* Full-width card styles */
.full-width-card {
  width: 100%;
  max-width: none;
  margin-bottom: 20px;
  padding: 16px;
}

.full-width-card-image {
  height: 200px;
}

.article-author {
  float: right;
}
</style>
