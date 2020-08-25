import React, { useState } from "react";
import { modalController } from "../../../../services/modal-controller";
import { cloneDeep } from "lodash";

function Dialog() {
  const [state, setState] = useState(cloneDeep(modalController));
  const aceptar = () => {
    modalController.aceptarBtn();
  };
  modalController.datosCambiados.subscribe((state: any) => {
    setState(state);
  });
  return (
    <div
      className={`modal fade ${state.customClass ? state.customClass : ""}`}
      id="exampleModal3"
      role="dialog"
      aria-labelledby="exampleModal3Label"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModal3Label">
              {state !== undefined && state.titulo ? state.titulo : ""}
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {state && state.contenido && (
            <div className="modal-body">
              {state.tipoContenido && state.tipoContenido === "imagen" ? <img src={state.contenido} alt="" /> : <div>{state.contenido}</div>}
            </div>
          )}
          <div className="modal-footer">
            {state && state.actionsShow && state.actionsShow.mostrarBtnCancelar && (
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                {state.stringCerrar}
              </button>
            )}
            {state && state.actionsShow && state.actionsShow.mostrarBtnAceptar && (
              <button type="button" className="btn btn-primary" onClick={aceptar}>
                {state.stringGuardar}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
