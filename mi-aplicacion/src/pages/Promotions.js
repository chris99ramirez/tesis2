import LayoutBasic from "../layouts/LayoutBasic";
import React, { useState,useEffect  } from 'react';
import Pagination from "../components/Paginacion";
import Spinner from "../components/Spinner";
import { useNavigate } from 'react-router-dom';
import "./Promotions.scss";
import PromotionsTable from "../components/PromotionsTable";
import { listarPromociones } from "../api/promocion";
const PRODUCTS_PER_PAGE = 8;

export default function Promotions() {
    const navigate=useNavigate();

    const [tipos,setTipos]=useState(
        [
            {
                id:0,
                nombre:"Combo"
            },
            {
                id:1,
                nombre:"Descuento"
            }
        ]
    )
    const handleNew =() =>{
        navigate('/NewPromotion');
    }
    const handleRecomendation =() =>{
        navigate('/PromotionRecomendation');
    }
    const [selectedType,setSelectedType]=useState(-1)
    const [promotions,setPromotions]=useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [filteredPromo,setFilteredPromo]=useState([])

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        console.log(event.target.value);
    };
    useEffect(() => {
        listarPromociones().then(data => {
            console.log(data)
            setPromotions(data);
            setFilteredPromo(data)
            setIsLoading(false);
        });
    }, []);



    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleSearch = () => {
        let result = promotions;
        if(selectedType){
            result = result.filter(promo => String(promo.tipoPromocion) === selectedType);
        }  
        console.log(result)
        setFilteredPromo(result);
        setCurrentPage(1); 
    };
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredPromo.length / PRODUCTS_PER_PAGE);
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const currentPromos = filteredPromo.slice(indexOfFirstProduct, indexOfLastProduct);
    return (
        <LayoutBasic>
            <div className="promotions-container">
                <div className="promotions-header">
                    <h1>Promociones creadas</h1>
                </div>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div>
                        <div className="promotions-filters">
                            <h2>Búsqueda por tipo</h2>
                            <div className="filter-item">
                                <label htmlFor="startDate">Tipo</label>
                                <select id="type" name="type" value={selectedType} onChange={handleTypeChange}>
                                    <option value="" selected>Seleccione el tipo de promoción</option>
                                    {tipos.map((tipo,index) => (
                                        <option key={index} value={tipo.id}>
                                            {tipo.nombre}
                                        </option>
                                    ))}
                                </select>
                                <button className="search-btn" onClick={handleSearch}>Buscar</button>

                            </div>
                        </div>
                        <div className="promotions-table">
                        {promotions.length > 0 ? (                            
                            <PromotionsTable promotions = {currentPromos}/>
                            ) : (
                            <div className="empty-message">
                                <p>No hay promociones creadas. <br /> Haz clic en 'Nueva promoción' para empezar.</p>
                            </div>
                            )}
                        </div>
                        <div className="promotions-pagination">
                            <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={handlePageChange} 
                            />
                            <div className="botones">
                                <button className="new-btn" onClick={handleRecomendation}>Productos recomendados</button>
                                <button className="new-btn" onClick={handleNew}>Nueva promoción </button>
                            </div>

                        </div>
                    </div>
                )}
        </div>
        </LayoutBasic>
    );
}
