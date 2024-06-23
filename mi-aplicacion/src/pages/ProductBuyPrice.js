import React from 'react';
import './ProductMovement.scss';
import LayoutBasic from '../layouts/LayoutBasic';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Spinner from "../components/Spinner";
import Pagination from "../components/Paginacion";
import { useState, useEffect } from 'react';
import TablePrices from '../components/TablePrices';
import { listarPreciosCompraProducto } from '../api/productos';
const PRODUCTS_PER_PAGE = 8;

const ProductBuyPrice = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); 
    };
    
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const [isLoading, setIsLoading] = useState(true);
    const [productInfo, setProductInfo] = useState(product);
    const [prices, setPrices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts,setFilteredProducts]=useState([])

    useEffect(() => {
        if (productInfo && productInfo.idProducto) {
            listarPreciosCompraProducto(productInfo.idProducto).then(data => {
                console.log(data);
                if (data && Array.isArray(data)) {
                    setPrices(data);
                    setFilteredProducts(data)
                } else {
                    setPrices([]);
                }
                setIsLoading(false);
            }).catch(error => {
                console.error("Error fetching prices:", error);
                setPrices([]);
                setIsLoading(false);
            });
        } else {
            setPrices([]);
            setIsLoading(false);
        }
    }, [productInfo]);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <LayoutBasic>
            <div className="products-container2">
                <div className="products-header2">
                    <div className="title-with-stock">
                        <h1>Precio de compra - {productInfo.nombre} {productInfo.marca.nombre}</h1>
                    </div>
                </div>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div>
                        <div className="products-table">
                            <TablePrices precios={currentProducts} />
                        </div>
                        <div className="products-pagination-and-back2">
                            <Pagination 
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                onPageChange={handlePageChange} 
                            />
                            <button onClick={handleBack} className="back-btn">Regresar</button>
                        </div>
                    </div>
                )}
            </div>
        </LayoutBasic>
    );
};

export default ProductBuyPrice;
