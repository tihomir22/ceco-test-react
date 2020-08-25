import React, { useState, useEffect } from "react";
import { showSnackbar } from "../../../services/snackbar-controller";
import { cloneDeep } from "lodash";
import { useHistory } from "react-router-dom";
import Axios, { AxiosResponse } from "axios";
import { ProductModel } from "../../micro-comps/product-card/interfaces/product.model";
import "./ficha-producto.scss";
function FichaProducto({ match }: any) {
  const history = useHistory();
  let defaultState = {
    cargandoDatos: false,
    form: {
      formGroupID: 0,
      formGroupTitle: "",
      formGroupDesc: "",
      formGroupPrecio: 0,
      formGroupImagen: "",
    },
  };
  let [estado, setState] = useState(cloneDeep(defaultState));
  useEffect(() => {
    if (!esNuevo()) {
      recuperarProducto(match.params.id);
    }
  }, []);

  function nuevo() {
    history.push("/dashboard/fichaProducto/nuevo", []);
    setState(cloneDeep(defaultState));
  }

  function handleImageChange(e: any) {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    let pattern = /image-*/;
    let reader = new FileReader();
    if (file && !file.type.match(pattern)) {
      showSnackbar("ERROR", "Formato no valido");
      return;
    }
    reader.onload = (e) => {
      _handleReaderLoaded(e);
    };
    reader.readAsDataURL(file);
  }

  function _handleReaderLoaded(e: any) {
    let reader = e.target;
    Object.assign(estado.form, { formGroupImagen: reader.result });
    console.log(estado);
    setState(cloneDeep(estado));
  }

  function esNuevo(): boolean {
    return match.params.id === "nuevo";
  }

  function actualizarFormulario(event: any) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.id;

    Object.assign(estado.form, { [name]: value });
    setState(cloneDeep(estado));
  }

  function isFormValid(): boolean {
    return Object.keys(estado.form).every((entry) => {
      return (estado.form as any)[entry] !== "";
    });
  }

  function eliminarProducto() {
    Axios.delete("http://localhost:3001/products/" + estado.form.formGroupID).then(
      (data) => {
        showSnackbar("SUCCESS", "Eliminado con exito");
        history.push("/dashboard/fichaProducto/nuevo");
        setState(cloneDeep(defaultState));
      },
      (error) => {
        showSnackbar("ERROR", error);
      }
    );
  }

  function guardarNuevo() {
    if (isFormValid()) {
      Axios.post("http://localhost:3001/products/", {
        id: estado.form.formGroupID,
        title: estado.form.formGroupTitle,
        description: estado.form.formGroupDesc,
        precio: estado.form.formGroupPrecio,
        image: estado.form.formGroupImagen,
      } as ProductModel)
        .then((data: AxiosResponse<ProductModel>) => {
          showSnackbar("SUCCESS", "Creado con exito!");
          history.push("/dashboard/fichaProducto/" + data.data.id);
        })
        .catch((error) => {
          showSnackbar("ERROR", error);
        });
    } else {
      showSnackbar("ERROR", "Todos los campos son obligatorios!");
    }
  }

  function guardarCambios() {
    if (isFormValid()) {
      Axios.put("http://localhost:3001/products/" + estado.form.formGroupID, {
        id: estado.form.formGroupID,
        title: estado.form.formGroupTitle,
        description: estado.form.formGroupDesc,
        precio: estado.form.formGroupPrecio,
        image: estado.form.formGroupImagen,
      } as ProductModel).then(
        (data) => {
          showSnackbar("SUCCESS", "Actualizado con exito!");
        },
        (error) => {
          showSnackbar("ERROR", error);
        }
      );
    } else {
      showSnackbar("ERROR", "Todos los campos son obligatorios!");
    }
  }

  function recuperarProducto(productId: number) {
    setState(cloneDeep(Object.assign(estado, { cargandoDatos: true })));
    Axios.get(`http://localhost:3001/products/${productId}`).then(
      (data: AxiosResponse<ProductModel>) => {
        setState(
          cloneDeep(
            Object.assign(estado, {
              cargandoDatos: false,
              form: {
                formGroupID: data.data.id,
                formGroupTitle: data.data.title,
                formGroupDesc: data.data.description,
                formGroupPrecio: data.data.precio,
                formGroupImagen: data.data.image,
              },
            })
          )
        );
      },
      (error) => {
        showSnackbar("ERROR", error.message);
        setState(
          cloneDeep(
            Object.assign(estado, {
              cargandoDatos: false,
            })
          )
        );
      }
    );
  }

  return (
    <div>
      <div>
        {estado.cargandoDatos === true && (
          <div className="loadingComp">
            <div>
              <div className="spinner-grow" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              Cargando...
            </div>
          </div>
        )}
        <div className="contenedorFlexProducto">
          <div>
            <img className="img-fluid" src={estado.form.formGroupImagen} alt="" />
          </div>

          <div className="form-group p-3" id="formGroupProduct">
            <div>
              <label htmlFor="formGroupID">ID</label>
              <input
                type="number"
                className="form-control"
                id="formGroupID"
                placeholder="Identificador"
                value={estado.form.formGroupID}
                disabled={!esNuevo()}
                onChange={actualizarFormulario}
              />
              <label htmlFor="formGroupTitle">Nombre</label>
              <input
                type="text"
                id="formGroupTitle"
                className="form-control"
                placeholder="Nombre del producto"
                value={estado.form.formGroupTitle}
                onChange={actualizarFormulario}
              />
              <label htmlFor="formGroupDesc">Descripción</label>
              <textarea
                id="formGroupDesc"
                className="form-control"
                placeholder="Descripción del producto"
                value={estado.form.formGroupDesc}
                onChange={actualizarFormulario}
              ></textarea>

              <label htmlFor="formGroupPrecio">Precio en €</label>
              <input
                type="number"
                id="formGroupPrecio"
                className="form-control"
                placeholder="Precio"
                value={estado.form.formGroupPrecio}
                onChange={actualizarFormulario}
              />
              <div>
                <label htmlFor="formGroupImagen">Imagen del producto</label>
              </div>
              <input name="imageUrl" type="file" id="formGroupImagen" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="d-flex text-white mt-2">
              <button
                type="button"
                className="btn btn-primary flex-fill mx-2"
                onClick={() => {
                  esNuevo() ? guardarNuevo() : guardarCambios();
                }}
              >
                <i className="fa fa-floppy-o" aria-hidden="true"></i> Guardar
              </button>
              <button type="button" className="btn btn-secondary flex-fill mx-2" onClick={nuevo}>
                <i className="fa fa-plus" aria-hidden="true"></i> Nuevo
              </button>
              <button type="button" className="btn btn-ternary flex-fill mx-2" onClick={eliminarProducto}>
                <i className="fa fa-ban" aria-hidden="true"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FichaProducto;
