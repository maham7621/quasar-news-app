<template>
  <div class="home-page">
    <div>
      <q-toolbar>
        <q-toolbar-title>
          Home page
        </q-toolbar-title>
        <q-input v-model="searchQuery" class="home-page-search-bar" @keypress.enter="search" input="search" dense filled
          hint="Search" debounce="300"></q-input>
      </q-toolbar>
    </div>
    <h4>News Articles ({{ totalResults }})</h4>
    <div class="articles-filter">
      <q-select class="filter" v-model="selectedSource" label="Source" :options="sourceOptions" />
      <q-select class="filter" v-model="selectedDate" label="Date" :options="dateOptions" />
      <q-btn label="Apply Filters" @click="applyFilters" />
      <q-btn label="Clear Filters" @click="clearFilters" />
    </div>
    <div>
      <q-card v-for="(article, index) in articles" :key="index" class="full-width-card"
        @click="redirectToDetailPage(index)">
        <!-- Published At date -->
        <q-card-subtitle v-if="article.publishedAt"><b>Published At: </b> {{ formatDate(article.publishedAt)
        }}</q-card-subtitle>

        <!-- Image section -->
        <q-img :src="article.urlToImage" basic cover class="full-width-card-image" alt="Article Image" />

        <!-- Content section -->
        <q-card-section>
          <!-- Article title -->
          <q-card-title class="article-title"><b>{{ article.title }}:
            </b></q-card-title>

          <!-- Article description -->
          <q-card-text>{{ article.description }}</q-card-text>

          <!-- Author's name -->
          <q-card-subtitle class="article-author" v-if="article.author"><b>By: </b>{{ article.author }}</q-card-subtitle>
        </q-card-section>
      </q-card>

      <h6 v-if="!displayedArticles.length">No Articles found...</h6>
    </div>
    <!-- Pagination controls -->
    <div v-if="displayedArticles.length">
      <q-pagination v-model="currentPage" :min="1" :max="totalPages" :input="true" :prev-label="'Previous'"
        :next-label="'Next'" @input="handlePageChange"></q-pagination>
      <div class="pagination-info">
        Page {{ currentPage }} of {{ totalPages }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue'
import { Article, Source, DateOption } from '../components/models'
import { getNews, getSources } from '../services/news-service';

export default defineComponent({
  name: 'HomeComponent',
  data() {
    return {
      searchQuery: '',
      articles: [] as Article[],
      currentPage: 1,
      articlesPerPage: 10,
      totalResults: 0,
      selectedSource: '',
      selectedDate: {} as DateOption,
      sources: [] as Source[],
      dateOptions: [] as DateOption[],
    };
  },
  computed: {
    displayedArticles() {
      return this.articles
    },
    totalPages() {
      return Math.ceil(this.totalResults / this.articlesPerPage);
    },

    sourceOptions() {
      return this.sources.map((source) => ({
        label: source.name,
        value: source.id,
      }));
    },
  },
  watch: {
    currentPage(newPage) {
      console.log('newww', newPage)
      this.fetchNewArticle();
    },
  },
  async mounted() {
    await this.fetchNewArticle();
    this.sources = await getSources();
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      this.dateOptions.push({
        label: this.formatDate(date.toDateString()),
        value: this.formatDate(date.toISOString()),
      });
    }
  },

  methods: {
    async search() {
      await this.fetchNewArticle();
    },

    async fetchNewArticle() {
      const res = await getNews(this.searchQuery, this.currentPage);
      this.articles.length = 0;
      this.articles = res.articles;
      this.totalResults = res.totalResults;
    },

    formatDate(dateString: string) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    redirectToDetailPage(index: number) {
      const dataObject = { key: this.articles[index] };
      const jsonData = JSON.stringify(dataObject);
      this.$router.push({ path: '/article-detail', query: { data: jsonData } });
    },

    async handlePageChange(newPage: number) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.currentPage = newPage;
        await this.fetchNewArticle()
      }
    },
    applyFilters() {
      // Filter by source
      if (this.selectedSource) {
        this.articles = this.articles.filter(article => article.source.name === this.selectedSource);
      }

      if (this.selectedDate) {
        const selectedDate = new Date(this.selectedDate.value); // Convert selectedDate to a Date object

        this.articles = this.articles.filter(article => {
          const articleDate = new Date(article.publishedAt);
          return articleDate >= selectedDate;
        });
      }
    },

    // Clear filters
    clearFilters() {
      this.selectedSource = '';
      this.selectedDate = '';
      this.currentPage = 1;
      this.fetchNewArticle();
    }
  },
});
</script>
<style scoped>
/* Full-width card styles */
.full-width-card {
  display: block;
  margin: auto;
  width: 50%;
  max-width: none;
  margin-bottom: 20px;
  padding: 16px;
  cursor: pointer;
}

.full-width-card-image {
  height: 200px;
}

.article-author {
  float: right;
}

.articles-filter {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter {
  width: 30%;
}
</style>
