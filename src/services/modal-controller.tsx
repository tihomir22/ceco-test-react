import $ from "jquery";
import "bootstrap";
import { ModalModel } from "./interfaces/ModalModel";
import {  Subject } from "rxjs";
import { cloneDeep } from "lodash";
export let modalController = {
  titulo: "",
  stringGuardar: "Guardar",
  tipoContenido: "texto",
  stringCerrar: "cerrar",
  customClass: "",
  contenido: "",
  actionsShow: { mostrarBtnAceptar: true, mostrarBtnCancelar: true },
  cerrarManualmente: {
    resolve: () => {},
    reject: () => {},
  },
  datosCambiados: new Subject(),
  openDialog(dialogObj: ModalModel) {
    modalController.datosCambiados.next(cloneDeep(Object.assign(modalController, dialogObj)));
    $("#exampleModal3").modal();
    return new Promise((resolve, reject) => {
      modalController.cerrarManualmente.resolve = resolve;
      modalController.cerrarManualmente.reject = reject;
    });
  },
  aceptarBtn(): void {
    $("#exampleModal3").modal("hide");
    modalController.cerrarManualmente.resolve();
  },
};
