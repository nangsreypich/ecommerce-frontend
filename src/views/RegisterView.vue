<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">Register Form</div>
      <div class="card-body">
        <!-- Success Alert -->
        <div
          v-if="alertMessage && alertType === 'success'"
          class="alert alert-success"
          role="alert"
        >
          {{ alertMessage }}
        </div>
        
        <!-- Error Alert -->
        <div
          v-if="alertMessage && alertType === 'error'"
          class="alert alert-danger"
          role="alert"
        >
          {{ alertMessage }}
        </div>

        <form @submit.prevent="saveData">
          <div class="mb-3">
            <label class="form-label">Full Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              v-model="student.name"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              v-model="student.email"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              v-model="student.password"
            />
          </div>

          <input type="submit" value="Save" class="btn btn-success" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      alertMessage: "",
      alertType: "", // 'success' or 'error'
      student: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    saveData() {
      axios
        .post("http://127.0.0.1:8081/api/register", this.student)
        .then(({ data }) => {
          this.alertMessage = data.message;
          this.alertType = "success";

          // Clear form data
          this.student = {
            name: "",
            email: "",
            password: "",
          };

          // Clear alert after 3 seconds
          setTimeout(() => {
            this.alertMessage = "";
            this.alertType = "";
          }, 3000);
        })
        .catch((err) => {
          this.alertMessage =
            err.response?.data?.message || "An error occurred.";
          this.alertType = "error";

          // Clear alert after 3 seconds
          setTimeout(() => {
            this.alertMessage = "";
            this.alertType = "";
          }, 3000);
        });
    },
  },
};
</script>
