<template>
    <div>
        <main class="container" style="max-width: 900px;">
            <section>
                <h2>Checkout</h2>
                <!-- Success/Error Message -->
                <div v-if="successMessage" class="alert alert-success">
                    {{ successMessage }}
                </div>

                <div v-if="errorMessage" class="alert alert-danger">
                    {{ errorMessage }}
                </div>

                <form @submit.prevent="checkout">
                    <div v-if="cartItems.length > 0">
                        <h3>Cart Items</h3>
                        <ul>
                            <li v-for="item in cartItems" :key="item.product_id">
                                {{ item.title }} - {{ item.quantity }} x ${{ item.price }}
                            </li>
                        </ul>
                    </div>

                    <div class="form-group">
                        <label for="address">Address</label>
                        <input type="text" v-model="address" id="address" class="form-control" required />
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="text" v-model="phone" id="phone" class="form-control" required />
                    </div>
                    <div class="form-group">
                        <label for="pincode">Pin Code</label>
                        <input type="text" v-model="pincode" id="pincode" class="form-control" required />
                    </div>

                    <button type="submit" class="btn btn-primary">Place Order</button>
                    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
                </form>
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
const address = ref("");
const phone = ref("");
const pincode = ref("");

const checkAuthenticationAndFetchCart = async () => {
  await authStore.checkAuth(); // Ensure auth state is updated

  if (!authStore.token) {
    errorMessage.value = "You need to log in to view your cart.";
    return;
  }

  fetchCartItems();
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

const checkout = async () => {
    if (!authStore.token) {
        errorMessage.value = "Please login first.";
        return;
    }

    try {
        const response = await axios.post(
            "http://127.0.0.1:8081/api/order/checkout",
            {
                address: address.value,
                phone: phone.value,
                pincode: pincode.value,
            },
            {
                headers: { Authorization: `Bearer ${authStore.token}` },
            }
        );
        if (response.status === 200) {
            successMessage.value = "Order placed successfully.";
            fetchCartItems(); // Refresh cart after placing order
            setTimeout(() => (successMessage.value = ""), 3000);
        }
    } catch (error) {
        console.error("Error placing order:", error);
        errorMessage.value = error.response?.data?.message || "Failed to place order.";
        setTimeout(() => (errorMessage.value = ""), 3000);
    }
};

onMounted(checkAuthenticationAndFetchCart);
</script>
