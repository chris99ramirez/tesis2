import React from 'react';
import './TableMovement.scss';
import { useNavigate } from 'react-router-dom';


const getEstadoPromocion = (promo) => {
    const today = new Date().toISOString().split('T')[0]; 

    if (promo.estado === 0) {
        return 'Cancelado';
    } else if (promo.estado === 1) {
        if (today >= promo.fechaInicio && today <= promo.fechaFin) {
            return 'Activo';
        } else if (today > promo.fechaFin) {
            return 'Vencido';
        } else {
            return 'Creado';
        }
    } else {
        return 'Desconocido'; 
    }
};


const getTipoPromocion = (promo) => {
    if (promo.tipoPromocion === 0) {
        return 'Combo';
    } else if (promo.tipoPromocion === 1) {
        return 'Descuento';
    } else {
        return 'Desconocido'; 
    }
};

const PromotionsTable = ({ promotions }) => {
    const navigate = useNavigate();


    const handleDetailClick = (idPromocion) => {
        navigate('/PromotionDetail', { state: { idPromocion }});

    };
    return (
        <div className="products-table">
            <table>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Descripcion</th>
                        <th>Tipo de promoción</th>
                        <th>Fecha de inicio</th>
                        <th>Fecha de expiración</th>
                        <th>Estado</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    {promotions.map((promo, index) => (
                        <tr key={promo.idPromocion}>
                            <td>{index + 1}</td>
                            <td>{promo.descripcion}</td>
                            <td>{getTipoPromocion(promo)}</td>
                            <td>{promo.fechaInicio}</td>
                            <td>{promo.fechaFin}</td>
                            <td>{getEstadoPromocion(promo)}</td>
                            <td><button className="details-btn" onClick={() => handleDetailClick(promo.idPromocion)}>Ver detalle</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PromotionsTable;
