<template>
  <div>
    <main class="container" style="max-width: 900px;">
      <section>
        <h1>Cart Page</h1>

        <!-- Success/Error Message -->
        <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <!-- Cart Items -->
        <div v-if="cartItems.length > 0">
          <div v-for="cart in cartItems" :key="cart.cart_id" class="col-12">
            <div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img :src="cart.image" class="img-fluid rounded-start" alt="product image" />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">
                      Product Name: <b>{{ cart.title }}</b>
                    </h5>
                    <p class="card-text">
                      Price: <b>${{ cart.price }}</b> | Quantity: <b>{{ cart.quantity }}</b>
                    </p>
                    <RouterLink v-if="cart.slug" :to="'/books/' + cart.slug" class="btn btn-success mx-2">
                      View Details
                    </RouterLink>
                    <button @click="removeFromCart(cart.cart_id)" class="btn btn-danger">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty Cart Message -->
        <div v-else>
          <p>Your cart is empty. Add some products!</p>
        </div>

        <!-- Checkout Button -->
        <div v-if="cartItems.length > 0">
          <router-link to="/checkout" class="btn btn-success">Checkout</router-link>
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
const cartItems = ref([]);
const successMessage = ref("");
const errorMessage = ref("");

// Check authentication and fetch cart items
const checkAuthenticationAndFetchCart = async () => {
  if (!authStore.token) {
    await authStore.checkAuth(); // Check if the user is authenticated
  }

  // If still no token, handle accordingly
  if (!authStore.token) {
    errorMessage.value = "You need to log in to view your cart.";
    return;
  }

  fetchCartItems(); // Fetch cart items if authenticated
};

// Fetch cart items from the API
const fetchCartItems = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8081/api/cart", {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    cartItems.value = response.data.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    errorMessage.value = error.response?.data?.message || "Failed to fetch cart items.";
    setTimeout(() => (errorMessage.value = ""), 3000);
  }
};

// Remove item from cart
const removeFromCart = async (cartId) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8081/api/cart/delete/${cartId}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });

    if (response.status === 200) {
      successMessage.value = "Product removed from cart successfully.";
      fetchCartItems(); // Refresh cart after removing item
      setTimeout(() => (successMessage.value = ""), 3000);
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    errorMessage.value = error.response?.data?.message || "Failed to remove product.";
    setTimeout(() => (errorMessage.value = ""), 3000);
  }
};


onMounted(checkAuthenticationAndFetchCart);
</script>
