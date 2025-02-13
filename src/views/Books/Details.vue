<template>
    <div class="container" style="max-width: 900px">
        <div v-if="successMessage" class="alert alert-success mt-3">
            {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="alert alert-danger mt-3">
            {{ errorMessage }}
        </div>
        <main>
            <div v-if="book">
                <h1>{{ book.title }}</h1>
                <!-- Fallback image if 'book.image' is not available -->
                <img :src="book.image || '/path/to/default-image.jpg'" class="card-img-top" alt="Book image"
                    style="max-width: 100%; height: auto; margin-bottom: 20px;">
                <p>{{ book.price }}</p>
                <p>{{ book.description }}</p>
                <button @click="handleAddToCart(book.id)" class="btn btn-success rounded-start mx-2">
                    Add to Cart
                </button>
                <RouterLink to="/books" class="btn btn-danger mx-2">Back</RouterLink>
            </div>
            <div v-else>
                <p>Loading book details...</p>
            </div>
        </main>
    </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from '@/stores/authStore';

export default {
    name: "BookDetails",
    data() {
        return {
            book: null, // Initialize book to null
            successMessage: '',
            errorMessage: '',
            authStore: useAuthStore(),
        };
    },
    mounted() {
        const slug = this.$route.params.slug;
        if (slug) {
            this.fetchBookDetails(slug);
        } else {
            this.errorMessage = "No book found.";
        }
    },
    methods: {
        fetchBookDetails(slug) {
            axios.get(`http://127.0.0.1:8081/api/products/${slug}`)
                .then((res) => {
                    if (res.data) {
                        this.book = res.data; // Ensure the book data is set
                    } else {
                        this.errorMessage = "Book details not found.";
                    }
                })
                .catch((error) => {
                    this.errorMessage = "Error fetching book details.";
                    console.error("Error fetching book details:", error);
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
                    `http://127.0.0.1:8081/api/cart/add/${productId}`,
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
