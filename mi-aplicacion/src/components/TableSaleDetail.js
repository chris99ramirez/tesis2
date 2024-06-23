import React from 'react';
import './ProductTable.scss'; 

function TableSaleDetail({ products }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Número</th>
          <th>Nombre de producto</th>
          <th>Marca</th>
          <th>Cantidad</th>
          <th>Unidad</th>
          <th>Monto Unitario (S/.)</th>
          <th>Monto Parcial (S/.)</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{product.promocion ? product.promocion.descripcion : product.producto.nombre}</td>
            <td>{product.promocion ? "Promoción" : product.producto.marca.nombre}</td>
            <td>{product.cantidad}</td>
            <td>{product.producto ? product.producto.unidad.nombre : "Unidad"}</td>
            <td>
              {product.promocion 
                ? (product.promocion.precio).toFixed(2) 
                : (product.producto.precioVenta).toFixed(2)}
            </td>
            <td>
              {product.promocion 
                ? (product.cantidad * product.promocion.precio).toFixed(2)
                : (product.cantidad * product.producto.precioVenta).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableSaleDetail;

