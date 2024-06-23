import ProductDetail from "../pages/ProductDetail";
import ProductMovement from "../pages/ProductMovement";
import Products from "../pages/Products";
import ProductEdition from "../pages/ProductEdition"
import ProductAdd from "../pages/ProductAdd";
import ReposicionProductos from "../pages/ProductReposition";
import SalesList from "../pages/SalesList";
import SalesNew from "../pages/SalesNew";
import SaleConfirm from "../pages/SaleConfirm";
import SalesDetail from "../pages/SalesDetail";
import Promotions from "../pages/Promotions";
import NewPromotion from "../pages/NewPromotion";
import PromotionDetail from "../pages/PromotionDetail";
import PromotionRecomendation from "../pages/PromotionRecomendation";
import ProductPrice from "../pages/ProductPrice";
import login from "../pages/login";
import ProductBuyPrice from "../pages/ProductBuyPrice";
const routes = [
{
    path: "/",
    exact: true,
    component: login
},
{
    path: "/Products",
    exact: true,
    component: Products
},
{
    path: "/SalesList",
    exact: true,
    component: SalesList
},
{
    path: "/Movements",
    exact: true,
    component: ProductMovement
},
{
    path: "/Detail",
    exact: true,
    component: ProductDetail
},
{
    path: "/Edit",
    exact: true,
    component: ProductEdition
},
{
    path: "/New",
    exact: true,
    component: ProductAdd
},
{
    path: "/Reposition",
    exact: true,
    component: ReposicionProductos
},
{
    path: "/SalesNew",
    exact: true,
    component: SalesNew
},
{
    path: "/SalesNewConfirm",
    exact: true,
    component: SaleConfirm
},

{
    path: "/SalesDetail",
    exact: true,
    component: SalesDetail
},
{
    path: "/Promotions",
    exact: true,
    component: Promotions
},
{
    path: "/NewPromotion",
    exact: true,
    component: NewPromotion
},
{
    path: "/PromotionDetail",
    exact: true,
    component: PromotionDetail
},
{
    path: "/PromotionRecomendation",
    exact: true,
    component: PromotionRecomendation
},
{
    path: "/PriceHistory",
    exact: true,
    component: ProductPrice
},
{
    path: "/PriceBuyHistory",
    exact: true,
    component: ProductBuyPrice
},
]

export default routes;

