// Importing CSS files (order matters: library styles first, custom styles last)
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/main.css'; // Custom styles should go last

// Importing Vue and necessary libraries
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import axios from 'axios';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);

// Create and use Pinia store
app.use(createPinia());
// Set up router
app.use(router);

// Mount the app to the DOM
app.mount('#app');

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
