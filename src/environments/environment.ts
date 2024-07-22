
let mainhost = 'https://localhost:7113/api/'
export const development = {
    localhosts:
    {
        category:
        {
            addCategory:`${mainhost}Category/AddCategory`,
            getAllCategories:`${mainhost}Category`
        },
        product:
        {
            getAllProducts: `${mainhost}Product`,
            getAllProductsWithNumber: `${mainhost}Product/GetAll/`,
            getSingleProduct:`${mainhost}Product/`,
            addProduct: `${mainhost}Product`,
            addMasterImage: `${mainhost}Product/AddMasterImage`,
            addProductImages: `${mainhost}Product/AddProductImages`,
            getProductMasterImage:`${mainhost}Product/GetProductMasterImage/`
        },
        order:
        {
            createOrder: `${mainhost}Order`, 
            getAllOrders:`${mainhost}Order/GetAllOrders/`
        }
    }
}