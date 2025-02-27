<template>
  <main>
    <div class="container my-5">
      <div v-if="successMessage" class="alert alert-success mt-3">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
      <div class="p-5 text-center bg-body-tertiary rounded-3">
        <svg class="bi mt-4 mb-3" style="color: var(--bs-indigo);" width="100" height="100">
          <use xlink:href="#bootstrap"></use>
        </svg>
        <h1 class="text-body-emphasis">Explore With Our Products</h1>
        <p class="col-lg-8 mx-auto fs-5 text-muted">
          Stay up to date with Google company news and products. Discover stories about our culture, philosophy, and how
          Google technology is impacting others.
        </p>
        <div class="d-inline-flex gap-2 mb-5">
          <button class="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
            <RouterLink class="dropdown-item" to="/contact">Contact Us</RouterLink>
          </button>
          <button class="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
            <RouterLink class="dropdown-item" to="/background">About Us</RouterLink>
          </button>
        </div>
      </div>
    </div>

    <!-- content-3 -->
    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <!-- Loop through books -->
          <div class="col" v-for="book in books.data" :key="book.id">
            <div class="card shadow-sm">
              <img :src="book.image" class="bd-placeholder-img card-img-top" width="100%" height="225">
              <div class="card-body">
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                  content. This content is a little bit longer.</p>
                <h5 class="card-title">{{ book.title }}</h5>
                <p class="card-text">{{ book.author }}</p>
                <p class="card-text"><small>{{ book.published_date }}</small></p>
                <p class="card-text">{{ book.isbn }}</p>
                <p class="card-text">{{ book.created_at }}</p>

                <!-- Replace the custom class with Bootstrap's button-group class -->
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <RouterLink :to="'/books/' + book.slug" class="btn btn-success mx-2 rounded-start">
                      View Details
                    </RouterLink>
                    <button @click="handleAddToCart(book.id)" class="btn btn-danger rounded-start mx-2">
                      Add to Cart
                    </button>
                  </div>
                </div>


              </div>
            </div>
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

  </main>
</template>


<script>
import axios from "axios";
import { useAuthStore } from '@/stores/authStore';

export default {
  name: "books",
  data() {
    return {
      books: { data: [] },
      successMessage: '',
      errorMessage: '',
      authStore: useAuthStore(),
    };
  },
  mounted() {
    this.getBooks(); // Initial fetch
  },
  methods: {
    // Modify to handle pagination
    getBooks(url = "https://phplaravel-1420867-5295533.cloudwaysapps.com/api/products") {
      axios.get(url).then((res) => {
        this.books = res.data;
      });
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
          `https://phplaravel-1420867-5295533.cloudwaysapps.com/api/cart/add/${productId}`, // Hard-coded URL
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
  },
};
</script>


<style>
/* Fix for buttons with rounded left and right corners */
.btn-group>.btn:not(:last-child):not(.dropdown-toggle),
.btn-group>.btn.dropdown-toggle-split:first-child,
.btn-group>.btn-group:not(:last-child)>.btn {
  border-top-right-radius: 0.25rem;
  /* Adjust to your desired radius */
  border-bottom-right-radius: 0.25rem;
  /* Adjust to your desired radius */
}

/* Fix for buttons with rounded left corners */
.btn-group>.btn:nth-child(n+3),
.btn-group> :not(.btn-check)+.btn,
.btn-group>.btn-group:not(:first-child)>.btn {
  border-top-left-radius: 0.25rem;
  /* Adjust to your desired radius */
  border-bottom-left-radius: 0.25rem;
  /* Adjust to your desired radius */
}
</style>