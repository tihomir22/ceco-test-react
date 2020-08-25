export interface ModalModel {
  titulo: string;
  stringCerrar: string;
  stringGuardar: string;
  tipoContenido: "texto" | "imagen";
  actionsShow?: ModalActionsModel;
  contenido?: string;
  customClass?: string;
}

export interface ModalActionsModel {
  mostrarBtnCancelar: boolean;
  mostrarBtnAceptar: boolean;
}
