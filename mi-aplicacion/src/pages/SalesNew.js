import React, { useState,useEffect } from 'react';
import LayoutBasic from '../layouts/LayoutBasic';
import { Navigate,useNavigate } from 'react-router-dom';
import './SalesNew.scss'
import { ReactComponent as AddIcon } from '../images/add.svg';
import { listarCategorias } from '../api/categoria';
import { listarMarcas } from '../api/marca';
import { listarProductosInventario } from '../api/productos';
import ModalFindProduct from '../components/ModalFindProudct';
import ModalProductSelect from '../components/ModalProductSelect';
import TableNewSale from '../components/TableNewSale';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { listarPromocionesCombo } from '../api/promocion';
const SalesNew =() => {
    const location = useLocation();
    const { productosPrevios, clientPrevio, montoTotalPrevio } = location.state;
    const [products,setProducts]=useState([]);
    const navigate=useNavigate();
    const [isFindProductModalOpen, setIsFindProductModalOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [montoTotal,setMontoTotal]=useState(montoTotalPrevio)
    const [cliente,setCliente]=useState(clientPrevio)
    const [stockErrorMessage, setStockErrorMessage] = useState('');
    const [isStockErrorModalVisible, setIsStockErrorModalVisible] = useState(false);

    const handleNombreChange = (event) => {
        setCliente(prevCliente => ({
            ...prevCliente,
            nombre: event.target.value
        }));
    };
    const handleDniChange = (event) => {
      const value = parseInt(event.target.value, 10);
      setCliente(prevCliente => ({
          ...prevCliente,
          dni: value
      }));
  };
  
  const handleTelefonoChange = (event) => {
      const value = parseInt(event.target.value, 10);
      setCliente(prevCliente => ({
          ...prevCliente,
          telefono: value
      }));
  };
    const handleQuantityChange = (index, newQuantity) => {
      const newProducts = [...productsSale];
      newProducts[index].cantidad = parseFloat(newQuantity);
      const total = newProducts.reduce((acc, producto) => {
        return acc + (producto.cantidad * producto.precioVenta);
      }, 0);
    
      const roundedTotal = Math.round(total * 10) / 10;
    
      setProductsSale(newProducts);
      setMontoTotal(roundedTotal.toFixed(2)); 
    };
    
    const handleRemoveProduct = (productId) => {
      setProductsSale(currentProducts => {
        const filteredProducts = currentProducts.filter(product => product.idProducto !== productId);
    
        const total = filteredProducts.reduce((acc, producto) => {
          return acc + (producto.cantidad * producto.precioVenta);
        }, 0);
    
        const roundedTotal = Math.round(total * 10) / 10;
        setMontoTotal(roundedTotal.toFixed(2));
            return filteredProducts;
      });
    };
    const handleConfirm = () => {
      const stockErrors = [];
  
      productsSale.forEach(saleProduct => {
        const product = products.find(p => p.idProducto === saleProduct.idProducto);
        if (product && (product.stock - saleProduct.cantidad) < 0) {
          stockErrors.push(`El producto ${product.nombre} ${product.marca.nombre} no tiene suficiente stock.`);
        }
      });
  
      if (stockErrors.length > 0) {
        toast.warning(stockErrors.join('\n'), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      }); 
        return; 
      } else {
        navigate('/SalesNewConfirm', {
          state: {
            productsSale: productsSale,
            client: cliente,  
            montoTotal: montoTotal
          }
        });
      }
    };
  
    const closeModal = () => {
      setIsStockErrorModalVisible(false);
    };
    const handleCloseFindProductModal = () => {
      setIsFindProductModalOpen(false);
    };
    const handleProductSelected = (product) => {
      setIsProductSelectModalOpen(false); 
      setProductsSale(prevProducts => [...prevProducts, product]);
    };
    const [productsSale,setProductsSale]=useState(productosPrevios);
    const [marcas,setMarcas]=useState([]);
    const [categorias,setCategorias]=useState([]);
    const [isProductsAddedModalOpen, setIsProductsAddedModalOpen] = useState(false);
    const [isProductSelectModalOpen, setIsProductSelectModalOpen] = useState(false);


    useEffect(() => {
      const fetchData = async () => {
          try {
              const [promocionesData, categoriasData, marcasData, productosData] = await Promise.all([
                  listarPromocionesCombo(0),
                  listarCategorias(),
                  listarMarcas(),
                  listarProductosInventario()
              ]);

              const categoriasConPromocion = [{ idCategoria: 0, nombre: 'Promocion' }, ...categoriasData];
              const marcasConPromocion = [{ idMarca: 0, nombre: 'Promocion' }, ...marcasData];

              setCategorias(categoriasConPromocion);
              setMarcas(marcasConPromocion);

              const productosActivos = productosData.filter(producto => producto.estado === 1);

              // Combine promociones with products and add 'cantidad' property
              const promocionesConCantidad = promocionesData.map(promo => ({
                  ...promo,
                  nombre: promo.descripcion,
                  marca: {idMarca: 0, nombre: 'Promocion' },
                  categoria: { idCategoria: 0,nombre: 'Promocion' },
                  unidad:{nombre: "Unidades" , simbolo:"Uni"},
                  cantidad: 0,
                  precioVenta:promo.precio
              }));

              const productosConCantidad = productosActivos.map(producto => ({
                  ...producto,
                  cantidad: 0
              }));

              const combinedData = [...promocionesConCantidad, ...productosConCantidad];
              console.log(combinedData);
              setProducts(combinedData);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []);
    
    return (
        <LayoutBasic>
                <ToastContainer/>

          <div className="sale-container">
            <div className="sale-header">
              <h1>Nueva venta</h1>
            </div>
            <div className="header-box">
                    Datos Generales del cliente
            </div>
            <div className='client-general-info'>
                <div className='info-row'>
                    <div className="info-column">
                        <div className="info-label">Nombre:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={cliente.nombre}
                                onChange={handleNombreChange}
                        />
                    </div>
                    <div className="info-column">
                        <div className="info-label">Número de DNI:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={cliente.dni}
                                onChange={handleDniChange}
                        />
                    </div>
                    <div className="info-column">
                        <div className="info-label">Número de teléfono:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={cliente.telefono}
                                onChange={handleTelefonoChange}
                        />
                    </div>
                </div>
            </div>
            <div className="header-box">
                    Productos en venta
                    <button className="add-product-btn"onClick={() => setIsFindProductModalOpen(true)} >
                    <AddIcon className="add-icon" />
                 Añadir producto
          </button>
            </div>
            <div className="table-container-sale">
            {productsSale.length > 0 ? (
                <TableNewSale products={productsSale} handleQuantityChange={handleQuantityChange} onRemove={handleRemoveProduct}/>
            ) : (
              <div className="empty-message">
                <p>No hay productos listados. <br /> Haz clic en 'Añadir producto' para empezar.</p>
              </div>
            )}
            </div>
            <div className="button-bar">
              <button className="button-back" onClick={() => navigate(-1)}>
                Regresar
              </button>
              <div className='saleConfirm'>
                <h2>Monto Total (S/.) {montoTotal}</h2>
                <button className="button-edit" onClick={handleConfirm}>
                  Confirmar 
              </button>
              </div>

            </div>
          </div>
          {isFindProductModalOpen && (
          <ModalFindProduct
            isOpen={isFindProductModalOpen}
            onClose={handleCloseFindProductModal}
            onAdd={(selectedProducts) => {
              setSelectedProducts(selectedProducts);
              setIsFindProductModalOpen(false); 
              setIsProductSelectModalOpen(true); 

            }}
            categories={categorias}
            brands={marcas}
            productslist={products}
          />
        )}
        {isProductSelectModalOpen && (
          <ModalProductSelect
            isOpen={isProductSelectModalOpen}
            onClose={() => setIsProductSelectModalOpen(false)}
            products={selectedProducts}
            onProductSelect={handleProductSelected}
          />
        )}
        </LayoutBasic>
      );
};
export default SalesNew;
