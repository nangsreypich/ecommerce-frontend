<template>
  <div>
    <main class="container" style="max-width: 900px;">
      <section>
        <h2>Order History</h2>

        <!-- Success/Error Messages -->
        <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <div v-if="!authStore.token" class="alert alert-warning">
          You need to <router-link to="/login">log in</router-link> to view your orders.
        </div>

        <div v-for="order in orders.data" :key="order.id" class="card mb-3" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="order.product_details[0].image" class="img-fluid rounded-start" alt="Product Image" v-if="order.product_details.length > 0" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Order #{{ order.id }}</h5>
                <p class="card-text"><b>Payment ID:</b> {{ order.payment_id }}</p>
                <p class="card-text"><b>Total Price:</b> ${{ order.total_price }}</p>
                <p><b>Products:</b></p>
                <ul>
                  <li v-for="(product, index) in order.product_details" :key="index">
                    <a :href="'/products/' + product.slug" class="text-decoration-none">
                      {{ product.name }}
                    </a>
                    - Quantity: {{ product.quantity }}
                    - Price: ${{ product.price }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="pagination justify-content-center mt-4">
          <button @click="getOrders(orders.pagination.prev_page_url)" :disabled="!orders.pagination.prev_page_url" class="btn btn-secondary mx-1">
            Previous
          </button>
          <button @click="getOrders(orders.pagination.next_page_url)" :disabled="!orders.pagination.next_page_url" class="btn btn-secondary mx-1">
            Next
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const orders = ref({ data: [], pagination: {} });
const successMessage = ref("");
const errorMessage = ref("");

// Fetch orders
const getOrders = async (url = "https://phplaravel-1420867-5295533.cloudwaysapps.com/api/order/history") => {
  if (!authStore.token) return;

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });

    orders.value = response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    errorMessage.value = error.response?.data?.message || "Failed to fetch orders.";
    setTimeout(() => (errorMessage.value = ""), 3000);
  }
};

onMounted(getOrders);
</script>
