<script setup>
import { useAuthStore } from "@/stores/authStore";
import { computed, onMounted, onUnmounted, nextTick } from "vue";
import { RouterLink } from "vue-router";

const authStore = useAuthStore();

// Make state reactive
const isAuthenticated = computed(() => authStore.isLoggedIn);
const userName = computed(() => authStore.userName || "");

// Check authentication on mount
onMounted(() => {
  authStore.checkAuth();
});

function toggleSubmenu(e) {
  e.preventDefault();
  const nextMenu = e.currentTarget.nextElementSibling;
  nextMenu.classList.toggle("show");
}

function preventDropdownClose(e) {
  e.stopPropagation();
}

function setupDropdownToggle() {
  const submenuLinks = document.querySelectorAll(".dropdown-submenu > a");
  const dropdownMenus = document.querySelectorAll(".dropdown-menu");

  submenuLinks.forEach((submenu) => {
    submenu.addEventListener("click", toggleSubmenu);
  });

  dropdownMenus.forEach((dropdown) => {
    dropdown.addEventListener("click", preventDropdownClose);
  });

  // Cleanup function (must be in `setup()`)
  return () => {
    submenuLinks.forEach((submenu) => {
      submenu.removeEventListener("click", toggleSubmenu);
    });

    dropdownMenus.forEach((dropdown) => {
      dropdown.removeEventListener("click", preventDropdownClose);
    });
  };
}

// Run after DOM is rendered
let cleanupFunction;
onMounted(() => {
  nextTick(() => {
    cleanupFunction = setupDropdownToggle();
  });
});

// Cleanup event listeners on unmount
onUnmounted(() => {
  if (cleanupFunction) cleanupFunction();
});
</script>


<template>
  <div>
    <header>
      <div class="wrapper">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <RouterLink to="/" class="navbar-brand">
              <img src="/src/assets/images/logo.png" alt="Logo" style="height: 60px;" />
              EFK Ecommerce
            </RouterLink>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                <li class="nav-item mx-3">
                  <RouterLink class="nav-link active" to="/">Home</RouterLink>
                </li>
                <li class="nav-item dropdown mx-3">
                  <RouterLink class="nav-link dropdown-toggle" to="#" id="aboutDropdown" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    About
                  </RouterLink>
                  <ul class="dropdown-menu" aria-labelledby="aboutDropdown">
                    <RouterLink class="dropdown-item" to="/background">Background</RouterLink>
                    <li class="dropdown-submenu">
                      <RouterLink class="dropdown-item dropdown-toggle" to="#">Teamwork</RouterLink>
                      <ul class="dropdown-menu">
                        <li>
                          <RouterLink class="dropdown-item" to="#">Board member</RouterLink>
                        </li>
                        <li>
                          <RouterLink class="dropdown-item" to="#">Teacher</RouterLink>
                        </li>
                        <li>
                          <RouterLink class="dropdown-item" to="#">Staff</RouterLink>
                        </li>
                        <li>
                          <RouterLink class="dropdown-item" to="#">Intern</RouterLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li class="nav-item mx-3">
                  <RouterLink class="nav-link" to="/books">Book</RouterLink>
                </li>
                <!-- <li class="nav-item mx-3">
                  <RouterLink class="nav-link" to="/orders">Order</RouterLink>
                </li> -->
                <li class="nav-item mx-3">
                  <RouterLink class="nav-link" to="/cart">Cart</RouterLink>
                </li>
                <li class="nav-item mx-3">
                  <RouterLink class="nav-link" to="/order-history">Orders</RouterLink>
                </li>
                <li class="nav-item mx-3">
                  <RouterLink class="nav-link" to="/contact">Contact Us</RouterLink>
                </li>
              </ul>

              <div v-if="isAuthenticated">
                <span class="navbar-text text-white ms-lg-3">
                  Welcome, {{ userName }}
                </span>
                <button class="btn btn-outline-danger ms-lg-3" @click="authStore.logout">
                  Logout
                </button>
              </div>

              <div v-else>
                <RouterLink class="btn btn-outline-success ms-lg-3" to="/register">Register</RouterLink>
                <RouterLink class="btn btn-outline-danger ms-lg-3" to="/login">Login</RouterLink>
              </div>

            </div>
          </div>
        </nav>
      </div>
    </header>
    <div class="vh-1000 d-flex flex-column">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from './views/FooterView.vue'; // Import Footer component
import { useAuthStore } from "@/stores/authStore"; // Adjust the path if needed

export default {
  name: 'App',
  components: {
    Footer,
  },
  setup() {
    const authStore = useAuthStore();

    return {
      authStore,
    };
  },
};
</script>

<style scoped>
/* Ensure second-level dropdown appears below */
.dropdown-menu .dropdown-submenu {
  position: relative;
  width: 100%;
  /* Full width to align properly */
}

.dropdown-menu .dropdown-submenu>.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  /* Show below instead of right */
  left: 0;
  /* Align with parent */
  min-width: 200px;
  z-index: 1000;
}

/* Keep submenu open when clicked */
.dropdown-menu .dropdown-submenu>.dropdown-menu.show {
  display: block;
}

/* Ensure dropdown stays open when interacting */
@media (max-width: 991px) {
  .dropdown-menu .dropdown-submenu>.dropdown-menu {
    position: static;
    width: 100%;
  }
}
</style>
