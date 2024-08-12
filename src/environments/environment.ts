
let mainhost = 'https://localhost:7113/api/'
export const development = {
    localhosts:
    {
        category:
        {
            addCategory:`${mainhost}Category/AddCategory`,
            getAllCategories:`${mainhost}Category`,
            getSingleCategory:`${mainhost}Category/`
        },
        product:
        {
            getAllProducts: `${mainhost}Product`,
            getAllProductsWithNumber: `${mainhost}Product/GetAll?pageNumber=`,
            getSingleProduct:`${mainhost}Product/`,
            addProduct: `${mainhost}Product`,
            updateProducts:`${mainhost}product/`,
            addMasterImage: `${mainhost}Product/AddMasterImage`,
            updateMasterImage:`${mainhost}Product/UpdateMasterImage`,
            addProductImages: `${mainhost}Product/AddProductImages/`,
            updateProductImage:`${mainhost}Product/UpdateProductImage`,
            getProductMasterImage: `${mainhost}Product/GetProductMasterImage/`,
            getProductImage:`${mainhost}Product/GetProductImage/`
        },
        order:
        {
            createOrder: `${mainhost}Order`, 
            getAllOrders: `${mainhost}Order/GetAllOrders?pageNumber=`,
            getSingleOrder:`${mainhost}Order/GetSingleOrder/`,
        },
        administration:
        {
            categoriesProfits: `${mainhost}Category/GetCategoriesProfits/`,
            dailyEarningProfits:`${mainhost}Administration/GetDailyEarning`,
            getAdministration: `${mainhost}Administration/GetAdministration`,
            getHero:`${mainhost}Administration/GetHero`,
            getRecentOrder: `${mainhost}Administration/GetProductssProfitsForCategories/`,
            getDescription:`${mainhost}Administration/GetDescription`,
            changeWebsiteColor: `${mainhost}Administration/ChangeWebsiteColor`,
            changeWebsiteLogo: `${mainhost}Administration/ChangeLogo`,
            changeHeroImage:`${mainhost}Administration/ChangeHero`,
            changeWelcomeMessage: `${mainhost}Administration/ChangeWelcomeMessage`,
            changeDescription: `${mainhost}Administration/ChangeDescription`,
            deleteProduct:`${mainhost}Administration/`
        }
    }

    
}