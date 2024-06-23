import React from 'react';
import './TableProducts.scss'
import { useNavigate } from 'react-router-dom';



const TableRecomendations = ({products})=> {
    const navigate = useNavigate();
    const handleCreate = (product) =>{
        navigate('/NewPromotion', { state: { product }});
    }

    return(
            <div className="products-table">
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Categoría</th>
                    <th>Ventas</th>
                    <th>Accion</th>
                </tr>
                </thead>
                <tbody>
                {products.map((products, index) => (
                    <tr key={products.product.id}>
                    <td>{products.product.nombre}</td>
                    <td>{products.product.marca.nombre}</td>
                    <td>{products.product.categoria.nombre}</td>
                    <td>{products.ventaCount}</td>
                    <td><button className="movements-btn" onClick={()=>handleCreate(products.product)}>Crear promocion</button></td>
                    </tr>
                ))}
                </tbody>

            </table>
            </div>
        )
}
export default TableRecomendations;