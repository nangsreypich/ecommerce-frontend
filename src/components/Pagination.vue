<!-- src/components/Pagination.vue -->
<template>
    <nav>
      <ul class="pagination">
        <li v-for="page in totalPages" :key="page" @click="changePage(page)">
          {{ page }}
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      data: Object,
    },
    computed: {
      totalPages() {
        return this.data?.last_page || 1;
      },
    },
    methods: {
      changePage(page) {
        this.$emit("page-changed", page);
      },
    },
  };
  </script>
  