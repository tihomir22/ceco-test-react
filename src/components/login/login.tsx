import React from "react";
import "./Login.scss";
import logo from "../../assets/buy.png";
import $ from "jquery";
import { showSnackbar } from "../../services/snackbar-controller";
import { useHistory } from "react-router-dom";
function Login() {
  const history = useHistory();
  let inputObj = {
    nombreCampoUsuario: "nombreUsuario",
    tipoCampoUsuario: "text",
    nombreCampoContrasenya: "Contrasenya",
    tipoCampoContrasenya: "password",
  };

  const submitData = () => {
    let valorUsuario = $(`input[type=${inputObj.tipoCampoUsuario}][name=${inputObj.nombreCampoUsuario}]`).val();
    let valorContrasenya = $(`input[type=${inputObj.tipoCampoContrasenya}][name=${inputObj.nombreCampoContrasenya}]`).val();
    if (valorUsuario === "admin" && valorContrasenya === "admin") {
      showSnackbar("SUCCESS", "Login exitoso");
      history.push("/dashboard");
    } else {
      showSnackbar("ERROR", "Revise las credenciales");
    }
  };

  return (
    <div className="formLoginFlexContainer">
      <div className="inlineImgLogo">
        <img src={logo} alt="Imagen logo compra" />
      </div>
      <div className="belowLogoText">
        <span>Lets do it</span>
      </div>

      <div className="formLogin">
        <div className="form-group w-100">
          <div>
            <label htmlFor="nombreUsuario"></label>
            <input type="text" className="form-control" name="nombreUsuario" placeholder="Usuario" />
          </div>
          <div>
            <label htmlFor="Contrasenya"></label>
            <input type="password" className="form-control" name="Contrasenya" placeholder="Contraseña" />
          </div>
        </div>
        <button type="button" className="btn btn-ternary btn-lg btn-block submittingButton" onClick={submitData}>
          <i className="fa fa-sign-in" aria-hidden="true"></i> Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
