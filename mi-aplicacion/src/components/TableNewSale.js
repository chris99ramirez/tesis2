import React from 'react';
import './ProductTable.scss'; 

function TableNewSale({ products ,handleQuantityChange,onRemove}) {
  return (
    <table  className="product-table">
      <thead>
        <tr>
          <th></th>
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
            <td className="remove-cell" onClick={() => onRemove(product.idProducto)}>X</td>
            <td>{product.nombre}</td>
            <td>{product.marca.nombre}</td>
            <td>
              <input 
                type="number" 
                value={product.cantidad} 
                min={product.unidad.simbolo === 'kg' ? 0.1 : 1}
                step={product.unidad.simbolo === 'kg' ? 0.1 : 1}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
              />
            </td>
            <td>{product.unidad.nombre}</td>
            <td>{(product.precioVenta).toFixed(2)}</td>
            <td>{(product.cantidad * product.precioVenta).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableNewSale;
