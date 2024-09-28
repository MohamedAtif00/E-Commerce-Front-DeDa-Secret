let mainhost = 'https://localhost:7113/api/';
let bosta = 'http://app.bosta.co/api/v2/';
// let mainhost = 'api/'
export const development = {
  localhosts: {
    category: {
      addCategory: `${mainhost}Category/AddCategory`,
      getAllCategories: `${mainhost}Category`,
      getSingleCategory: `${mainhost}Category/`,
    },
    product: {
      getAllProducts: `${mainhost}Product`,
      getAllProductsWithNumber: `${mainhost}Product/GetAll?pageNumber=`,
      getSingleProduct: `${mainhost}Product/`,
      addProduct: `${mainhost}Product`,
      updateProducts: `${mainhost}product/`,
      addMasterImage: `${mainhost}Product/AddMasterImage`,
      updateMasterImage: `${mainhost}Product/UpdateMasterImage`,
      addProductImages: `${mainhost}Product/AddProductImages/`,
      updateProductImage: `${mainhost}Product/UpdateProductImage`,
      getProductMasterImage: `${mainhost}Product/GetProductMasterImage/`,
      getProductImage: `${mainhost}Product/GetProductImage/`,
    },
    order: {
      createOrder: `${mainhost}Order`,
      getAllOrders: `${mainhost}Order/GetAllOrders?pageNumber=`,
      getSingleOrder: `${mainhost}Order/GetSingleOrder/`,
      getOrderStetes: `${mainhost}Order/OrderStates`,
      changeOrderState: `${mainhost}Order/ChangeState`,
    },
    administration: {
      categoriesProfits: `${mainhost}Category/GetCategoriesProfits/`,
      dailyEarningProfits: `${mainhost}Administration/GetDailyEarning`,
      getAdministration: `${mainhost}Administration/GetAdministration`,
      getHero: `${mainhost}Administration/GetHero`,
      getRecentOrder: `${mainhost}Administration/GetProductssProfitsForCategories/`,
      getDescription: `${mainhost}Administration/GetDescription`,
      getSpecialProducts: `${mainhost}Administration/GetSpecialProducts`,
      changeWebsiteColor: `${mainhost}Administration/ChangeWebsiteColor`,
      changeWebsiteLogo: `${mainhost}Administration/ChangeLogo`,
      changeHeroImage: `${mainhost}Administration/ChangeHero`,
      changeWelcomeMessage: `${mainhost}Administration/ChangeWelcomeMessage`,
      changeDescription: `${mainhost}Administration/ChangeDescription`,
      addSpecialProduct: `${mainhost}Administration/AddSpecialProduct/`,
      deleteProduct: `${mainhost}Administration/`,
    },
    account: {
      adminLogin: `${mainhost}Account/AdminLogin`,
    },
    contact: {
      sendContact: `${mainhost}Contact`,
      getAllContact: `${mainhost}Contact`,
    },
    address: {
      getAllDistricts: `${bosta}cities/getAllDistricts`,
      getAllPickupAddress: `${mainhost}Shipment/GetAllPickupAddress`,
      addPickupAddress: `${mainhost}Shipment/AddPickupAddress`,
    },
    shipment: {
      sendInformation: `${mainhost}Shipment`,
    },
  },
};
