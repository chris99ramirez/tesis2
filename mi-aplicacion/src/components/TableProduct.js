import React from 'react';
import './TableProducts.scss'
import { useNavigate } from 'react-router-dom';



const TableProducts = ({products})=> {
    const navigate = useNavigate();

    const handleButtonClick = (product) => {
        navigate('/Movements', { state: { product }});
    };
    const handleButtonClickDetail = (product) => {
        if (product.idPromocion) {
            console.log(product)
            const idPromocion = product.idPromocion;
            navigate('/PromotionDetail', { state: { idPromocion }});
        } else {
            navigate('/Detail', { state: { product }});
        }
    };
    return(
            <div className="products-table">
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Categoría</th>
                    <th>Detalle</th>
                    <th>Movimientos</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                    <td>{product.nombre}</td>
                    <td>{product.marca.nombre}</td>
                    <td>{product.categoria.nombre}</td>
                    <td><button className="details-btn" onClick={()=>handleButtonClickDetail(product)}>Ver detalle</button></td>
                    <td><button
                                    className="movements-btn"
                                    onClick={() => handleButtonClick(product)}
                                    disabled={!!product.idPromocion}
                                >Ver movimientos</button></td>
                    </tr>
                ))}
                </tbody>
 
            </table>
            </div>
        )
}
export default TableProducts;