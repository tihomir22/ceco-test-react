import React, { useState, useEffect } from "react";
import { ProductModel } from "../../micro-comps/product-card/interfaces/product.model";
import ProductCard from "../../micro-comps/product-card/product-card";
import axios from "axios";
import { cloneDeep } from "lodash";
import "./default-view.scss";
import { showSnackbar } from "../../../services/snackbar-controller";

function DefaultView() {
  let [state, setState] = useState({
    trendingProducts: [],
    removeLimit: false,
    baseURL: "http://localhost:3001",
  });
  useEffect(() => {
    loadTrendingProducts(6);
  }, []);

  function quitarLimitePorPagina() {
    let cerrarBtnSpan = document.querySelector(".closebtn");
    if (cerrarBtnSpan && cerrarBtnSpan.parentElement) {
      cerrarBtnSpan.parentElement.style.display = "none";
    }
    loadTrendingProducts(100);
  }

  function ordenarPorVentas(productoA: ProductModel, productoB: ProductModel): number {
    if (productoA.ventas !== undefined && productoB.ventas !== undefined) {
      if (productoA.ventas > productoB.ventas) return -1;
      if (productoA.ventas < productoB.ventas) return 1;
    }
    return 0;
  }

  function loadTrendingProducts(maxTrendingProducts?: number): void {
    if (!maxTrendingProducts) {
      setState(Object.assign(state, { maxTrendingProducts: state.removeLimit ? 100 : 6 }));
    }

    axios
      .get(`${state.baseURL}/products`)
      .then((data) => {
        let listaOrdenada: Array<ProductModel> = data.data.sort(ordenarPorVentas);
        listaOrdenada.length =
          maxTrendingProducts !== undefined && maxTrendingProducts < listaOrdenada.length ? maxTrendingProducts : listaOrdenada.length;
        setState(cloneDeep(Object.assign(state, { trendingProducts: listaOrdenada })));
      })
      .catch((error) => {
        showSnackbar("ERROR", error);
      });
  }

  return (
    <div>
      <div className="badge badge-pill badge-primary m-2">
        Mostrando los 6 productos más vendidos
        <span className="closebtn" onClick={() => quitarLimitePorPagina()}>
          &times;
        </span>
      </div>
      <div className="productList">
        {state.trendingProducts.map((product: ProductModel) => {
          return (
            <div className="productThumb" key={product.id}>
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                precio={product.precio}
                ventas={product.ventas}
                image={product.image}
                refreshItems={loadTrendingProducts}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DefaultView;
