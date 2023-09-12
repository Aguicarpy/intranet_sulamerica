export function validate(user) {
    let errors = {};
    if (!user.email) {
      errors.email = "Ingresa su email";
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(user.email)) {
      errors.email = "Ingrese un correo electrónico válido";
    }


    if (!/\d/.test(user.password)) {
      errors.password = "Ingresa una contraseña válida";
    }
    if (user.password.length < 6 || user.password.length > 15) {
      errors.password = "La contraseña debe tener entre 6 y 15 caracteres";
    }
    if (!user.password) {
      errors.password = "Ingrese una contraseña válida";
    }
    return errors;
  }