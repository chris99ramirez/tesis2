import LayoutBasic from "../layouts/LayoutBasic";
import './Products.scss';
import React, { useState,useEffect  } from 'react';
import TableRecomendations from "../components/TableRecomendations";
import Pagination from "../components/Paginacion";
import { listarCategorias } from "../api/categoria";
import { listarMarcas } from "../api/marca";
import { listarProductosInventario, listarProductosRecomendados } from "../api/productos";
import Spinner from "../components/Spinner";
import { useNavigate } from 'react-router-dom';

const PRODUCTS_PER_PAGE = 8;
export default function PromotionRecomendation() {

    const [isLoading, setIsLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts,setFilteredProducts]=useState([])
    
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    
    const [currentPage, setCurrentPage] = useState(1);
    const [productRecomended, setProductRecomended]=useState([])
    useEffect(() => {
        listarCategorias().then(data => setCategorias(data));
        listarMarcas().then(data => setMarcas(data));
        listarProductosRecomendados().then(
            data => {
            const productosActivos = data.filter(producto => producto.product.estado === 1);

            setProductRecomended(productosActivos);
            setProducts(productosActivos)
            console.log(data);
            setIsLoading(false);

            }
        )


    }, []);
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };


     const handlePageChange = (newPage) => {
         setCurrentPage(newPage);
     };

    const navigate = useNavigate();


    
     const applyFilters = () => {
        let result = products;
        console.log(result);
    
        if (selectedCategory) {
            result = result.filter(product => String(product.product.categoria.idCategoria) === selectedCategory);
        }
    
        if (selectedBrand) {
            result = result.filter(product => String(product.product.marca.idMarca) === selectedBrand);
        }
       
        setProductRecomended(result);
        setCurrentPage(1); 
    };
    
    const totalPages = Math.ceil(productRecomended.length / PRODUCTS_PER_PAGE);

     const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
     const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
     const currentProducts = productRecomended.slice(indexOfFirstProduct, indexOfLastProduct);
 
    return (
        <LayoutBasic>
            <div className="products-container">
                <div className="products-header">
                    <h1>Productos Recomendados</h1>
                </div>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div>
                        <div className="products-filters">
                            <div className="filter-item">
                                <label htmlFor="category">Categoría</label>
                                <select id="category" name="category" value={selectedCategory} onChange={handleCategoryChange}>
                                    <option value=""selected>Seleccione la categoría</option>
                                    {categorias.map((categoria,index) => (
                                        <option key={index} value={categoria.idCategoria}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter-item">
                                <label htmlFor="brand">Marca</label>
                                <select id="brand" name="brand" value={selectedBrand} onChange={handleBrandChange}>
                                    <option value=""  selected>Seleccione la marca</option>
                                        {marcas.map((marca,index) => (
                                            <option key={index} value={marca.idMarca}>
                                                {marca.nombre}
                                            </option>
                                        ))}
                                </select>
                                
                            </div>
                            <button className="search-btn" onClick={applyFilters}>Buscar</button>

                        </div>
                        <div className="products-table">
                            <TableRecomendations products = {currentProducts}/>
                        </div>
                        <div className="products-pagination">
                            <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={handlePageChange} 
                            />
                        </div>
                    </div>
                )}
        </div>
        </LayoutBasic>
    );
}
