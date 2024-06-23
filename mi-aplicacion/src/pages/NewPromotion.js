import React, { useState,useEffect } from 'react';
import './NewPromotion.scss';
import LayoutBasic from '../layouts/LayoutBasic';
import ProductTable from '../components/ProductTable';
import addIcon from '../images/add.svg'; 
import { ReactComponent as AddIcon } from '../images/add.svg';
import ModalFindProduct from '../components/ModalFindProudct';
import { useLocation } from 'react-router-dom';
import ModalProductSelect from '../components/ModalProductSelect';
import { addProducts, crearPrecioVenta } from '../api/productos';
import ModalRegistro from '../components/ModalRegistro';
import ModalAdvert from '../components/ModalAdvert';
import { useNavigate } from 'react-router-dom';
import ToastPanda from '../components/ToastPanda';  
import { ToastContainer, toast } from 'react-toastify';
import TableNewSale from '../components/TableNewSale';
import { listarCategorias } from '../api/categoria';
import { listarMarcas } from '../api/marca';
import { listarProductosInventario } from '../api/productos';
import 'react-toastify/dist/ReactToastify.css';
import { crearPromocion } from '../api/promocion';
import {crearPrecioVentaPromo} from '../api/productos'
const NewPromotion = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state ? location.state.product : null;  
    const [marcas,setMarcas]=useState([]);
    const [categorias,setCategorias]=useState([]);
    const [products,setProducts]=useState([]);
    const [descuento,setDescuento]=useState([]);
    const [isFindProductModalOpen, setIsFindProductModalOpen] = useState(false);
    const [selectedType,setSelectedType]=useState(-1)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [productsSale,setProductsSale]=useState([]);
    const [montoTotal,setMontoTotal]=useState(0.0);
    const [isProductsAddedModalOpen, setIsProductsAddedModalOpen] = useState(false);
    const [isProductSelectModalOpen, setIsProductSelectModalOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [minStock,setMinStock]=useState(0);
    const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
    const [isRegistrationProductModalVisible, setIsRegistrationProductModalVisible] = useState(false);
    const [promocion, setPromocion] = useState({
      descripcion: '',
      tipo: -1,
      fechaInicio: '',
      fechaFinal: '',
      descuento: 0.0,
      stock: '',
      precio: 0.0,
      productos: [],
  });
    useEffect(() => {
      listarCategorias().then(data => setCategorias(data));
      listarMarcas().then(data => setMarcas(data));
      listarProductosInventario().then(data => {
          const productosActivos = data.filter(producto => producto.estado === 1);
          const productosConCantidad = productosActivos.map(producto => {
              return { ...producto, cantidad: 0 }; 
          });
          setProducts(productosConCantidad);
      });
  
      if (product) {
        setProductsSale(prevProducts => {
          const productoExistente = prevProducts.find(p => p.idProducto === product.idProducto);
          let newProducts;

          if (!productoExistente) {
              newProducts = [...prevProducts, { ...product, cantidad: 1 }];
          } else {
              newProducts = prevProducts;
          }

  

          setPromocion(prevPromo => ({
              ...prevPromo,
              stock: product.stock,
              stockUnidad: product.unidad.nombre,
              productos: newProducts.map(p => ({ idProducto: p.idProducto, cantidad: p.cantidad }))
          }));
          setMinStock(product.stock)
          return newProducts;
      });
      }
  }, [product]);
  
  
    const handleRegistrationProductConfirmed = () => {
      setIsRegistrationProductModalVisible(false);
      navigate("/Promotions");  
  };
    const handleDescuentoChange = (event) => {
      const descuentoDecimal = parseFloat(event.target.value) / 100;
      setPromocion(prevPromo => ({
        ...prevPromo,
        descuento: descuentoDecimal
      }));
      setDescuento(event.target.value)
    };
    
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
    const handleCloseFindProductModal = () => {
      setIsFindProductModalOpen(false);
    };
    const handleProductSelected = (product) => {
      setIsProductSelectModalOpen(false);
      setProductsSale(prevProducts => {
          const newProducts = [...prevProducts, product];
          const stockMinimo = Math.min(...newProducts.map(p => p.stock));
          const productoConMenorStock = newProducts.find(p => p.stock === stockMinimo);
          const stockUnidad = productoConMenorStock ? productoConMenorStock.unidad.nombre : '';
  
          setMinStock(stockMinimo);
          setPromocion(prevPromo => ({
              ...prevPromo,
              stock: stockMinimo,
              stockUnidad: stockUnidad,
              productos: newProducts.map(p => ({ idProducto: p.idProducto, cantidad: p.cantidad }))
          }));
          return newProducts;
      });
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


    useEffect(() => {
      const total = productsSale.reduce((acc, producto) => acc + (producto.cantidad * producto.precioVenta), 0);
      setMontoTotal(Math.round(total * 10) / 10);
  }, [productsSale]);
  
    
    useEffect(() => {
      const precioConDescuento = montoTotal * (1 - promocion.descuento);
      setPromocion(prevPromo => ({
          ...prevPromo,
          precio: parseFloat(precioConDescuento.toFixed(2))
      }));
  }, [montoTotal, promocion.descuento]);

    const handleDescripcionChange = (event) => {
        setPromocion(prevPromo => ({
            ...prevPromo,
            descripcion: event.target.value
        }));
    };
    const handleTypeChange = (event) => {
      setSelectedType(event.target.value);
      setPromocion(prevPromo => ({
          ...prevPromo,
          tipo: parseInt(event.target.value)
      }));
  };

  const handleStartDateChange = (event) => {
      setStartDate(event.target.value);
      setPromocion(prevPromo => ({
          ...prevPromo,
          fechaInicio: event.target.value
      }));
  };

  const handleEndDateChange = (event) => {
      setEndDate(event.target.value);
      setPromocion(prevPromo => ({
          ...prevPromo,
          fechaFinal: event.target.value
      }));
      addTimeToDate(promocion.fechaFinal, "23:59:59")
  };
  function addTimeToDate(dateString, timeString = "00:00:00") {
    return `${dateString}T${timeString}`;
}
  const handleConfirmSave = () => {
    setIsSaveModalVisible(false);
    console.log(promocion);
      crearPromocion(promocion)         
      .then(response => {
        if(promocion.tipo == 1){
          const precioVentaData = {
            productoId: promocion.productos[0].idProducto,
            usuarioId: 1, 
            estado: 0,
            precioActual: promocion.precio,
            fechaInicio: addTimeToDate(promocion.fechaInicio, "00:00:00"), 
            fechaFinal: promocion.fechaFinal ? addTimeToDate(promocion.fechaFinal, "23:59:59") : null 
        };
        console.log(precioVentaData)
        crearPrecioVentaPromo(precioVentaData)
        .then(data => {
            console.log('Precio de venta registrado exitosamente:', data);
        })
        .catch(error => {
            console.error('Error al registrar el precio de venta:', error);
        });
        }
          setIsRegistrationProductModalVisible(true);

      })
      .catch(error => {
          console.error('Error guardando el promocion:', error);
      });
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

    setPromocion(prevPromo => ({
        ...prevPromo,
        productos: newProducts.map(p => ({ idProducto: p.idProducto, cantidad: p.cantidad }))
    }));
};

      const handleConfirmar = () => {
        setIsSaveModalVisible(true);

    };
    return (
        <LayoutBasic>
          <div className="new-promotion-container">
            <div className="new-promotion-header">
              <h1>Nueva promoción</h1>
            </div>
            <div className="header-box">
                    Datos Generales de la promoción
            </div>
            <div className='new-promotion-general-info'>
                <div className='info-row'>
                        <div className="info-label">Descripción:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={promocion.descripcion}
                                onChange={handleDescripcionChange}
                        />
                    </div>
                <div className='info-row'>

                        <div className="info-label">Tipo de promoción:</div>
                        <select id="type" name="type" value={selectedType} onChange={handleTypeChange}>
                                    <option value="" selected>Seleccione el tipo de promoción</option>
                                    {tipos.map((tipo,index) => (
                                        <option key={index} value={tipo.id}>
                                            {tipo.nombre}
                                        </option>
                                    ))}
                                </select>
                </div>
                <div className='info-row'>

                    <div className="info-column">
                        <label htmlFor="startDate">Fecha Inicial</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        id="startDate"
                                        name="startDate"
                                        onChange={handleStartDateChange}
                                        />
                        </div>
               
                    <div className="info-column">
                        <label htmlFor="startDate">Fecha Final</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        id="startDate"
                                        name="startDate"
                                        onChange={handleEndDateChange}
                                        />
                        </div>
                    </div>
                    </div>
            <div className="header-box">
                    Detalle de los productos
                    <button className="add-product-btn" onClick={() => setIsFindProductModalOpen(true)} disabled={selectedType == 1 && productsSale.length > 0}>
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
            <div className="monto-bar">
            <div className="info-row">
                        <div className="info-column">
                            <div className="info-label">Stock:</div>
                            <input
                                type="text"
                                className="info-textbox"
                                value={`${minStock} ${promocion.stockUnidad}`}
                            />
                        </div>
                        <div className="info-column">
                        <div className="info-label">Monto sin descuento:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={montoTotal}
                            />
                        </div>
            </div>
            <div className="info-row">
                        <div className="info-column">
                            <div className="info-label">Descuento:</div>
                            <input
                                type="text"
                                className="info-textbox"
                                value={descuento}
                                onChange={handleDescuentoChange}
                            />
                        </div>
                        <div className="info-column">
                        <div className="info-label">Monto con descuento:</div>
                        <input
                                type="text"
                                className="info-textbox"
                                value={descuento ? (Math.round(montoTotal * (1 - promocion.descuento) * 10) / 10).toFixed(2) : ''}

                            />
                        </div>
            </div>


            </div >
            <div className="button-bar">
              <button className="button-back" onClick={() => navigate(-1)}>
                Regresar
              </button>
              <div className='saleConfirm'>
                <button className="button-edit"  onClick={handleConfirmar}>
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
                  {isSaveModalVisible && (
                    <ModalAdvert
                        title="Registrar nueva promocion"
                        bodyText="¿Está seguro de que desea registrar esta nueva promocion?"
                        confirmButtonText="Confirmar"
                        cancelButtonText="Cancelar"
                        onConfirm={handleConfirmSave}
                        onCancel={() => setIsSaveModalVisible(false)}
                    />
                )}
                {isRegistrationProductModalVisible && (
                    <ModalRegistro
                        title="Promocion Registrada"
                        buttonText="Volver a promociones"
                        onConfirm={handleRegistrationProductConfirmed}
                        redirectPath="/Promotions"
                    />
                )}
        </LayoutBasic>
      );
}
export default NewPromotion;

