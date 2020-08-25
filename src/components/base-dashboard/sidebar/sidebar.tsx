import React from "react";
import { useHistory } from "react-router-dom";
import "./sidebar.scss";

function Sidebar() {
  const history = useHistory();
  const navigate = (route: any) => {
    history.push(route, []);
  };

  return (
    <div className="sidebar-sticky bg-ternary">
      <ul className="nav flex-column">
        <li className="nav-item" onClick={() => navigate("/dashboard")}>
          <a className="nav-link active pointerMe">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Dashboard <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item" onClick={() => navigate("/dashboard/fichaProducto/nuevo")}>
          <a className="nav-link pointerMe">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-file"
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            Ficha producto
          </a>
        </li>
        <li className="nav-item" onClick={() => navigate("/")}>
          <a className="nav-link pointerMe">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="css-i6dzq1"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Salir
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
