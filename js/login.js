$(document).ready(function () {
  $(`#botonIniciarSesion`).prop("disabled", true);

  const fields = {
    inputUsername: false,
    inputPassword: false,
  };

  const validateField = (input, campo) => {
    if ($(input).val()) {
      fields[campo] = true;
    } else {
      fields[campo] = false;
    }
  };

  const validateForm = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = $(target).attr("name");

    switch (name) {
      case "inputUsername":
        validateField(target, "inputUsername");
        break;
      case "inputPassword":
        validateField(target, "inputPassword");
        break;
    }

    if (
      fields["inputUsername"] &&
      fields["inputPassword"]
    ) {
      $(`#botonIniciarSesion`).prop("disabled", false);
    }
    
  };

  $("#formulario input").on("blur", validateForm);

  $(`#botonIniciarSesion`).click(function(event){
    event.preventDefault();
		window.location.href = '/catalogo.html';
  });

});
