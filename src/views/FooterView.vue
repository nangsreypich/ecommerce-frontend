<template>
  <div class="container">
    <footer
      class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
    >
      <div class="col-md-4 d-flex align-items-center">
        <a
          href="/"
          class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
        >
          <svg class="bi" width="30" height="24">
            <use xlink:href="#bootstrap"></use>
          </svg>
        </a>
        <span class="mb-3 mb-md-0 text-body-secondary"
          >© 2024 EFK Ecommerce, Inc</span
        >
      </div>

      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3">
          <a class="text-body-secondary" href="#">
            <i class="fab fa-twitter" style="font-size: 24px"></i>
          </a>
        </li>
        <li class="ms-3">
          <a class="text-body-secondary" href="#">
            <i class="fab fa-instagram" style="font-size: 24px"></i>
          </a>
        </li>
        <li class="ms-3">
          <a class="text-body-secondary" href="#">
            <i class="fab fa-facebook" style="font-size: 24px"></i>
          </a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>
