<template>
  <div class="container mt-3">
    <!-- Success/Error Message -->
    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
    <div class="row">
      <div v-for="(book, index) in books.data" :key="index" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
        <div class="card p-2 shadow-sm">
          <img :src="book.image" class="card-img-top" alt="Book image">
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <p class="card-text">{{ book.author }}</p>
            <p class="card-text"><small>{{ book.published_date }}</small></p>
            <p class="card-text">{{ book.isbn }}</p>
            <p class="card-text">{{ book.created_at }}</p>
            <RouterLink :to="'/books/' + book.slug" class="btn btn-success mx-2">
              View Details
            </RouterLink>
            <button @click="handleAddToCart(book.id)" class="btn btn-danger rounded-start mx-2">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination justify-content-center mt-4">
      <button @click="getBooks(books.prev_page_url)" :disabled="!books.prev_page_url" class="btn btn-secondary mx-1">
        Previous
      </button>
      <button @click="getBooks(books.next_page_url)" :disabled="!books.next_page_url" class="btn btn-secondary mx-1">
        Next
      </button>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { useAuthStore } from '@/stores/authStore';

export default {
  name: "Books",
  data() {
    return {
      books: { data: [] }, 
      successMessage: '',
      errorMessage: '',
      authStore: useAuthStore(),
    };
  },
  mounted() {
    this.getBooks();
  },
  methods: {
    async getBooks(url = "https://phplaravel-1420867-5295533.cloudwaysapps.com/api/products") {
      try {
        const response = await axios.get(url);
        this.books = response.data;
      } catch (error) {
        this.errorMessage = 'Failed to fetch books. Please try again.';
        console.error('Error fetching books:', error);
      }
    },

    async handleAddToCart(productId) {
      const token = this.authStore.token;
      if (!token) {
        this.errorMessage = "You need to log in to add items to the cart.";
        return;
      }
      this.addToCart(productId);
    },

    async addToCart(productId) {
      const token = this.authStore.token;
      if (!token) {
        this.errorMessage = "You need to log in to add items to the cart.";
        return;
      }

      try {
        const response = await axios.post(
          `https://phplaravel-1420867-5295533.cloudwaysapps.com/api/cart/add/${productId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json"
            }
          }
        );

        this.successMessage = response.data.message || "Product added to cart successfully!";
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Something went wrong. Please try again!";
        console.error("Error adding product to cart:", error);
      }
    }
  }
};
</script>
