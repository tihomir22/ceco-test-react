import React, { useState } from "react";
import { ProductModel, ButtonActionModel } from "./interfaces/product.model";
import { modalController } from "../../../services/modal-controller";
import { useHistory } from "react-router-dom";
import { cloneDeep } from "lodash";
import { showSnackbar } from "../../../services/snackbar-controller";
import "./product-card.scss";
import axios from "axios";
export interface EstadoProducto {
  productoRecibido: ProductModel | any;
  accionesProducto: Array<ButtonActionModel>;
  textLimitForPipeActualValue: number;
  textLimitForPipeDefaultValue: number;
  textLimitDisabled: number;
}

function ProductCard(props: ProductModel) {
  const history = useHistory();
  const [state, setState] = useState<EstadoProducto>({
    productoRecibido: null,
    accionesProducto: [
      {
        color: "primary",
        icon: "eye",
        descripcion: "Ver imagen pantalla completa",
        action: () => {
          modalController.openDialog({
            titulo: `Visualizando ${props.title}`,
            contenido: props.image,
            tipoContenido: "imagen",
            stringCerrar: "Cerrar",
            stringGuardar: "Eliminar",
            customClass: "fullScreenModal",
            actionsShow: { mostrarBtnAceptar: false, mostrarBtnCancelar: true },
          });
        },
      },
      {
        color: "secondary",
        icon: "pencil",
        descripcion: "Editar el producto seleccionado",
        action: () => {
          history.push("dashboard/fichaProducto/" + props.id);
        },
      },
      {
        color: "danger",
        icon: "ban",
        descripcion: "Eliminar el producto seleccionado",
        action: () => {
          modalController
            .openDialog({
              titulo: `Seguro que seas eliminar ${props.title} ?`,
              tipoContenido: "texto",
              stringCerrar: "Cerrar",
              stringGuardar: "Eliminar",
              actionsShow: {
                mostrarBtnAceptar: true,
                mostrarBtnCancelar: true,
              },
              contenido: "",
              customClass: "",
            })
            .then((data) => {
              eliminarProducto(props);
            });
        },
      },
    ],
    textLimitForPipeActualValue: 150,
    textLimitForPipeDefaultValue: 150,
    textLimitDisabled: -1,
  });

  function toggleMostrarMasMostrarMenos(): void {
    if (estamosMostrandoMas()) {
      setState(cloneDeep(Object.assign(state, { textLimitForPipeActualValue: state.textLimitDisabled })));
    } else {
      setState(cloneDeep(Object.assign(state, { textLimitForPipeActualValue: state.textLimitForPipeDefaultValue })));
    }
  }

  function estamosMostrandoMas(): boolean {
    return state.textLimitForPipeActualValue === state.textLimitForPipeDefaultValue;
  }

  function eliminarProducto(producto: ProductModel) {
    axios
      .delete(`http://localhost:3001/products/${producto.id}`)
      .then((data) => {
        showSnackbar("SUCCESS", "Eliminado con exito " + producto.title);
        if (props && props.refreshItems) {
          props.refreshItems();
        }
      })
      .catch((error) => {
        showSnackbar("ERROR", error);
      });
  }

  function mostrarMenos(descripcion: string) {
    return descripcion.substr(0, state.textLimitForPipeActualValue);
  }

  return (
    <div>
      {props !== undefined && (
        <div className="card text-left cardProducto">
          <div className="contenedorAcciones">
            {state.accionesProducto.map((accion, index) => {
              return (
                <a
                  key={index}
                  className={`btn btn-${accion.color ? accion.color : "primary"} expandir-flex mx-2 mt-2`}
                  role="button"
                  onClick={() => accion.action()}
                >
                  {accion.icon !== undefined && <i className={`fa fa-${accion.icon}`} aria-hidden="true"></i>}
                </a>
              );
            })}
          </div>
          <img className="card-img-top" src={props.image} />
          <div className="card-body">
            <h4 className="card-title">{props.title}</h4>
            <p className="card-text">
              {estamosMostrandoMas() ? mostrarMenos(props.description) + "..." : props.description}
              {props.description.length > state.textLimitForPipeActualValue && (
                <span className="pointerMe text-primary" onClick={toggleMostrarMasMostrarMenos}>
                  {estamosMostrandoMas() ? "Mostrar más" : "Mostrar menos"}
                </span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
