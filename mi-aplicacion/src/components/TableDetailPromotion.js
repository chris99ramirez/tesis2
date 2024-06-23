import React from 'react';
import './ProductTable.scss'; 

function TableDetailPromotion({ products}) {
  return (
    <table  className="product-table">
      <thead>
        <tr>
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
            <td>{product.producto.nombre}</td>
            <td>{product.producto.marca.nombre}</td>
            <td>{product.cantidad}
            </td>
            <td>{product.producto.unidad.nombre}</td>
            <td>{(product.producto.precioVenta).toFixed(2)}</td>
            <td>{(product.cantidad * product.producto.precioVenta).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableDetailPromotion;
