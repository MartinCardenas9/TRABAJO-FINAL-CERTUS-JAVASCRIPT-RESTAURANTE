$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  products.forEach((product) => {
    if (id == product.id) {
      $("#product-img").attr("src", product.img);
      $("#product-title").text(product.title);
      $("#product-price").text(`Precio : S/ ${product.price}`);
      $("#product-store").text(`Tipo : ${product.store}`);
    }
  });
});
