import LayoutBasic from "../layouts/LayoutBasic";
import Pagination from "../components/Paginacion";
import Spinner from "../components/Spinner";
import { Navigate, useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import './SalesList.scss';
import TableSalesList from "../components/TableSalesList";
import { obtenerVentasDelDia, obtenerVentasPorFecha } from "../api/ventas";
const PRODUCTS_PER_PAGE = 8;
export default function SalesList() {
    const navigate=useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [sales, setSales] = useState([]);
    const [fechaActual, setFechaActual] = useState([]);
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
        setFechaActual(formattedDate);
        const isoDate = today.toISOString().split('T')[0];

        obtenerVentasPorFecha(isoDate).then(data => {
            setSales(data);
            setIsLoading(false);

        });
    }, []);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(sales.length / PRODUCTS_PER_PAGE);

    const [startDate, setStartDate] = useState('');


     const handlePageChange = (newPage) => {
         setCurrentPage(newPage);
     };

     const handleAdd = () => {
        navigate('/SalesNew', {
          state: {
            productosPrevios: [],
            clientPrevio: {
                nombre:'',
                dni:'',
                telefono:''
            },  
            montoTotalPrevio: 0.0
          }
        });
      };
      function formatDate(dateString) {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1); // Añadir un día
 
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
      const handleSearch = () => {
        if (startDate) {
            obtenerVentasPorFecha(startDate).then(data => {

                setFechaActual(formatDate(startDate));
                
                console.log(data);
                setSales(data);
                setCurrentPage(1); // Resetear a la primera página
            });
        }
    };
    
 
     const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
     const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
     const currentSales = sales.slice(indexOfFirstProduct, indexOfLastProduct);
 
    return (
        <LayoutBasic>
            <div className="sales-container">
                <div className="sales-header">
                    <h1>Ventas realizadas - {fechaActual}</h1>
                </div>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div>
                        <div className="sales-filters">
                            <h2>Búsqueda por fecha</h2>
                            <div className="right-section">
                                <label htmlFor="startDate">Fecha de búsqueda</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    id="startDate"
                                    name="startDate"
                                    onChange={e => setStartDate(e.target.value)}
                                    />
                                <button className="search-btn" onClick={handleSearch}>Buscar</button>

                            </div>
                        </div>
                        <div className="sales-table">
                        {sales.length > 0 ? (                            
                            <TableSalesList sales = {currentSales}/>

                            ) : (
                            <div className="empty-message">
                                <p>No hay ventas realizadas en el día. <br /> Haz clic en 'Agregar nueva venta' para empezar.</p>
                            </div>
                            )}
                        </div>
                        <div className="sales-pagination">
                            <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={handlePageChange} 
                            />
                            <button className="new-btn" onClick={handleAdd}>Agregar nueva venta</button>
                        </div>
                    </div>
                )}
        </div>
        </LayoutBasic>
    );
}
