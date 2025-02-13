<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">Login Form</div>
      <div class="card-body">
        <div v-if="alertMessage" :class="['alert', alertType === 'success' ? 'alert-success' : 'alert-danger']"
          role="alert">
          {{ alertMessage }}
        </div>

        <form @submit.prevent="loginData">
          <div class="mb-3">
            <label class="form-label" for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="student.email" required />
          </div>
          <div class="mb-3">
            <label class="form-label" for="password">Password</label>
            <input type="password" class="form-control" id="password" v-model="student.password" required />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const authStore = useAuthStore();

const student = ref({
  email: "",
  password: "",
});

const alertMessage = ref("");
const alertType = ref("");
const router = useRouter();

async function loginData() {
  try {
    const response = await authStore.login(student.value.email, student.value.password);

    alertMessage.value = "Login successful!";
    alertType.value = "success";

    setTimeout(() => {
      router.push({ name: "home" }); // Change to home route after login
    }, 1500);
  } catch (error) {
    alertMessage.value = error.message || "An error occurred. Please try again.";
    alertType.value = "danger";
  } finally {
    setTimeout(() => {
      alertMessage.value = "";
      alertType.value = "";
    }, 3000);
  }
}

// Ensure user stays logged in on reload
onMounted(() => {
  if (authStore.isLoggedIn) {
    router.push({ name: "home" }); // Redirect to home if already logged in
  }
});
</script>
