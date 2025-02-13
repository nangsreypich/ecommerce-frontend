import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BackgroundView from "../views/AboutView.vue";
import StudentView from "../views/Students/View.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import studentCreate from "../views/Students/Create.vue";
import studentEdit from "../views/Students/Edit.vue";
import ContactUsView from "../views/ContactUsView.vue";
import BookView from "../views/Books/View.vue";
import BookDetail from "../views/Books/Details.vue";
import CartView from "../views/Books/Cart.vue";
import CheckoutView from "../views/Orders/Checkout.vue"
import OrderHistoryView from "../views/Orders/OrderHistory.vue"

// Import the store
import { useAuthStore } from "../stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/background", name: "background", component: BackgroundView },
    { path: "/contact", name: "contact", component: ContactUsView },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isLoggedIn) {
          next({ name: "students" });
        } else {
          next();
        }
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isLoggedIn) {
          next({ name: "students" });
        } else {
          next();
        }
      },
    },
    {
      path: "/students",
      name: "students",
      component: StudentView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isLoggedIn) {
          next();
        } else {
          next({ name: "login", query: { redirect: to.fullPath } });
        }
      },
    },
    { path: "/students/create", name: "studentCreate", component: studentCreate },
    { path: "/students/:id/edit", name: "studentEdit", component: studentEdit },
    {
      path: "/books",
      name: "books",
      component: BookView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        next();
      },
    },
    {
      path: "/books/:slug",
      name: "bookDetail",
      component: BookDetail,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        next();
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        authStore.checkAuth();
        if (authStore.isLoggedIn) {
          next();
        } else {
          next({ name: "login", query: { redirect: to.fullPath } });
        }
      },
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isLoggedIn) {
          next();
        } else {
          next({ name: "login", query: { redirect: to.fullPath } });
        }
      },
    },
    {
      path: "/order-history", name: "orderHistory", component: OrderHistoryView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isLoggedIn) {
          next();
        } else {
          next({ name: "login", query: { redirect: to.fullPath } });
        }
      }
    },
  ],
});

// Add a global beforeEach hook to handle redirection after login
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.name === "login" && from.name === "cart" && authStore.isLoggedIn) {
    const redirectTo = to.query.redirect || "/";
    next({ path: redirectTo });
  } else {
    next();
  }
});

export default router;
