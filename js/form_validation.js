$(document).ready(function () {
  $(`#botonEnviar`).prop("disabled", true);

  const expressions = {
    inputUsuario: /^[a-zA-Z0-9_]{4,16}$/,
    inputNombre: /^[A-Za-z\s]{4,50}$/,
    inputContrasena:
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,50}$/,
    inputCorreo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    inputCelular: /^[+51]+[0-9]{9}$/,
  };

  const fields = {
    inputUsuario: false,
    inputNombre: false,
    inputContrasena: false,
    inputRepetirContrasena: false,
    inputCorreo: false,
    inputCelular: false,
    inputCuidad: false,
  };

  const validateField = (expression, input, field) => {
    if (expression.test($(input).val())) {
      $(`#${field}`).addClass("is-valid").removeClass("is-invalid");
      fields[field] = true;
    } else {
      $(`#${field}`).addClass("is-invalid").removeClass("is-valid");
      fields[field] = false;
    }
  };

  const validateCity = (target, field) => {
    if ($(target).val() !== "") {
      $("#inputCuidad").addClass("is-valid").removeClass("is-invalid");
      fields[field] = true;
    } else {
      $("#inputCuidad").addClass("is-invalid").removeClass("is-valid");
      fields[field] = false;
    }
  };

  const validatePassword = (input, field) => {
    let inputContrasena = $("#inputContrasena").val();
    if ($(input).val() === inputContrasena && isNaN($(input).val())) {
      $(`#${field}`).addClass("is-valid").removeClass("is-invalid");
      fields[field] = true;
    } else {
      $(`#${field}`).addClass("is-invalid").removeClass("is-valid");
      fields[field] = false;
    }
  };

  const validarFormulario = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = $(target).attr("name");

    switch (name) {
      case "inputUsuario":
        validateField(expressions.inputUsuario, target, "inputUsuario");
        break;
      case "inputNombre":
        validateField(expressions.inputNombre, target, "inputNombre");
        break;
      case "inputContrasena":
        validateField(expressions.inputContrasena, target, "inputContrasena");
        break;
      case "inputRepetirContrasena":
        validatePassword(target, "inputRepetirContrasena");
        break;
      case "inputCorreo":
        validateField(expressions.inputCorreo, target, "inputCorreo");
        break;
      case "inputCelular":
        validateField(expressions.inputCelular, target, "inputCelular");
        break;
      case "inputCuidad":
        validateCity(target, "inputCuidad")
        break;
    }

    if (fields["inputUsuario"] && fields["inputNombre"] && fields["inputContrasena"] && fields["inputRepetirContrasena"] && fields["inputCorreo"] && fields["inputCelular"] &&
      fields["inputCuidad"]
    ) {
      $(`#botonEnviar`).prop('disabled', false);
    }

  };

  $("#formulario input").on("blur", validarFormulario);
  $("#formulario select").on("blur", validarFormulario);

  $(`#botonEnviar`).click(function(event){
    event.preventDefault();
		window.location.href = '/index.html';
  });
});
