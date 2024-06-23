import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TableSalesList = ({sales})=> {
    const navigate = useNavigate();


    const handleButtonClickDetail = (sale) => {
        navigate('/SalesDetail', {
            state: {
              clientPrevio: sale.cliente , 
              montoTotalPrevio: sale.totalFinal.toFixed(2),
              idVentas:sale.idVentas,
              estado:sale.estado
            }
          });
    };
    const transformSalesData = (sales) => {
        return sales.map(sale => {
            const fechaHora = new Date(sale.fechaVenta);
            return {
                ...sale,
                fecha: fechaHora.toLocaleDateString(), 
                hora: fechaHora.toLocaleTimeString() 
            };
        });
    };
    const transformedSales = transformSalesData(sales);

    return(
        
            <div className="products-table">
            <table>
                <thead>
                <tr>
                    <th>Numero</th>
                    <th>Fecha de registro</th>
                    <th>Hora de registro</th>
                    <th>Monto total (S/.)</th>
                    <th>Cliente</th>
                    <th>Estado</th>
                    <th>Detalle</th>
                </tr>
                </thead>
                {transformedSales.map((sale, index) => (
                    <tr key={sale.id}>
                    <td>{index+1}</td>
                    <td>{sale.fecha}</td>
                    <td>{sale.hora}</td>
                    <td>{sale.totalFinal.toFixed(2)}</td>
                    <td>{sale.cliente.nombre}</td>
                    <td>{sale.estado === 1 ? 'Activo' : 'Cancelado'}</td>
                    <td><button className="details-btn" onClick={()=>handleButtonClickDetail(sale)}>Ver detalle</button></td>
                    </tr>
                ))}
            </table>
            </div>
        )
}
export default TableSalesList;