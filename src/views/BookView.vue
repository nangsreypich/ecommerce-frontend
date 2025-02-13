<template>
   <main class="container">
  <div class="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
    <div class="col-lg-6 px-0">
  <h1 class="display-4 fst-italic">  <a class="text-body-secondary d-inline" href="#">
      <i class="fab fa-facebook" style="font-size: 50px"></i>
    </a>
    Explore Book's Details in EFK Books Facebook Page  
  </h1>
</div>

  </div>

<div class="row g-5">
 <div class="col-md-4">
  <article class="blog-post">
    <!-- Option Menu for Desktop -->
    <div class="d-none d-md-block menu-desktop">
      <ul class="list-unstyled">
        <li><a href="#">All</a></li>
        <li><a href="#">Grammar Master</a></li>
        <li><a href="#">ABC</a></li>
      </ul>
    </div>

    <!-- Option Menu for Mobile/Tablets -->
    <div class="d-block d-md-none menu-mobile">
      <ul class="list-unstyled">
        <li><a href="#">All</a></li>
        <li><a href="#">Grammar Master</a></li>
        <li><a href="#">ABC</a></li>
      </ul>
    </div>
  </article>
</div>


  <div class="col-md-8">
    <div class="position-sticky" style="top: 2rem;">
      <div>
        <h4 class="fst-italic">All Books</h4>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <a class="d-block link-body-emphasis text-decoration-none" href="#">
              <img src="/src/assets/images/book-master2.jpg" class="img-fluid" alt="Image description" />
              <h6 class="mt-3">Example blog post title</h6>
            </a>
          </div>
          <div class="col">
            <a class="d-block link-body-emphasis text-decoration-none" href="#">
              <img src="/src/assets/images/book-master2.jpg" class="img-fluid" alt="Image description" />
              <h6 class="mt-3">This is another blog post title</h6>
            </a>
          </div>
          <div class="col">
            <a class="d-block link-body-emphasis text-decoration-none" href="#">
              <img src="/src/assets/images/book-master2.jpg" class="img-fluid" alt="Image description" />
              <h6 class="mt-3">Longer blog post title: This one has multiple lines!</h6>
            </a>
          </div>
          <div class="col">
            <a class="d-block link-body-emphasis text-decoration-none" href="#">
              <img src="/src/assets/images/book-master2.jpg" class="img-fluid" alt="Image description" />
              <h6 class="mt-3">Example blog post title</h6>
            </a>
          </div>
          <div class="col">
            <a class="d-block link-body-emphasis text-decoration-none" href="#">
              <img src="/src/assets/images/book-master2.jpg" class="img-fluid" alt="Image description" />
              <h6 class="mt-3">This is another blog post title</h6>
            </a>
          </div>
          <div class="col">
            <a class="d-block link-body-emphasis text-decoration-none" href="#">
              <img src="/src/assets/images/book-master2.jpg" class="img-fluid" alt="Image description" />
              <h6 class="mt-3">Longer blog post title: This one has multiple lines!</h6>
            </a>
          </div>
          <div class="col">
            <a class="d-block link-body-emphasis text-decoration-none" href="#">
              <img src="/src/assets/images/book-master2.jpg" class="img-fluid" alt="Image description" />
              <h6 class="mt-3">Longer blog post title: This one has multiple lines!</h6>
            </a>
          </div>
          <div class="col">
            <a class="d-block link-body-emphasis text-decoration-none" href="#">
              <img src="/src/assets/images/book-master2.jpg" class="img-fluid" alt="Image description" />
              <h6 class="mt-3">Example blog post title</h6>
            </a>
          </div>
          <div class="col">
            <a class="d-block link-body-emphasis text-decoration-none" href="#">
              <img src="/src/assets/images/book-master2.jpg" class="img-fluid" alt="Image description" />
              <h6 class="mt-3">This is another blog post title</h6>
            </a>
          </div>
          <div class="col">
            <a class="d-block link-body-emphasis text-decoration-none" href="#">
              <img src="/src/assets/images/book-master2.jpg" class="img-fluid" alt="Image description" />
              <h6 class="mt-3">Longer blog post title: This one has multiple lines!</h6>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</main>
</template>

<style scoped>

/* Flex display for mobile and tablet sizes */
.menu-mobile ul {
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
}

.menu-mobile li {
  flex: 1;
  text-align: center;
}

/* Hover effect for links */
.menu-desktop a, .menu-mobile a {
  text-decoration: none;
  color: #007bff;
  padding: 5px 10px;
  display: block;
  text-align: center;
}

.menu-desktop a:hover, .menu-mobile a:hover {
  background-color: #007bff;
  color: white;
}

/* Desktop Menu Styling */
.menu-desktop ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-desktop li {
  padding: 8px 0;
  text-align: center;
}

.menu-desktop li a {
  text-decoration: none;
  color: #333;
}

.menu-desktop li a:hover {
  color: #007bff;
  color: #ffffff;
}

/* Ensure mobile menu stays responsive */
@media (max-width: 768px) {
  .menu-mobile ul {
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;
  }
  
  .menu-mobile li {
    flex: 1;
    text-align: center;
  }
}

</style>