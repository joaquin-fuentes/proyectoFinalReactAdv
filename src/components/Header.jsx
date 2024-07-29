import React from "react";

const Header = () => {
  return (
    <div className=" p-3 text-end d-flex align-items-center  justify-content-around justify-content-md-end ">
      <span className="me-md-4 bg-dark rounded-circle text-light p-2 ">M</span>
      <span className="me-md-4">Nombre Usuario</span>
      <span className="me-md-4">Salir</span>
    </div>
  );
};

export default Header;
