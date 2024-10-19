// let mainhost = 'https://localhost:7113/api/';
let mainhost = 'https://www.dedasecret.shop/api/';
let bosta = 'http://app.bosta.co/api/v2/';
// let mainhost = 'api/'
export const development = {
  localhosts: {
    category: {
      addCategory: `${mainhost}Category/AddCategory`,
      getAllCategories: `${mainhost}Category`,
      getSingleCategory: `${mainhost}Category/`,
      moveCategory: `${mainhost}Category/MoveCategory`,
      getallChildsCategories: `${mainhost}Category/GetAllChildsCategories`,
      deleteCategory: `${mainhost}Category/`,
    },
    product: {
      getAllProducts: `${mainhost}Product`,
      getAllProductsWithNumber: `${mainhost}Product/GetAll?pageNumber=`,
      getSingleProduct: `${mainhost}Product/`,
      getSpecialProducts: `${mainhost}Product/GetSpecialProducts/`,
      getAllReviews: `${mainhost}Product/GetAllReviews`,
      addProduct: `${mainhost}Product`,
      updateProducts: `${mainhost}product/`,
      addMasterImage: `${mainhost}Product/AddMasterImage`,
      updateMasterImage: `${mainhost}Product/UpdateMasterImage`,
      addProductImages: `${mainhost}Product/AddProductImages/`,
      updateProductImage: `${mainhost}Product/UpdateProductImage`,
      getProductMasterImage: `${mainhost}Product/GetProductMasterImage/`,
      getProductImage: `${mainhost}Product/GetProductImage/`,
      postComment: `${mainhost}Product/AddReview/`,
      addProductToCarsoul: `${mainhost}Product/MakeSpecial/`,
    },
    order: {
      createOrder: `${mainhost}Order`,
      getAllOrders: `${mainhost}Order/GetAllOrders?pageNumber=`,
      getSingleOrder: `${mainhost}Order/GetSingleOrder/`,
      getOrderStetes: `${mainhost}Order/OrderStates`,
      changeOrderState: `${mainhost}Order/ChangeState`,
      updateOrder: `${mainhost}Order/UpdateOrder/`,
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
      addCarsoul: `${mainhost}Administration/AddCarsoul`,
      deleteProduct: `${mainhost}Administration/`,
      deleteCarousel: `${mainhost}Administration/DeleteCarousel/`,
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
      getActivePickupAddress: `${mainhost}Shipment/GetActivePickupAddress`,
      addPickupAddress: `${mainhost}Shipment/AddPickupAddress`,
    },
    shipment: {
      sendInformation: `${mainhost}Shipment`,
    },
    coupon: {
      addCoupon: `${mainhost}Order/AddCoupon`,
      getCouponByCode: `${mainhost}Order/GetCoupon?code=`,
      getAllCoupons: `${mainhost}Order/GetAllCoupons`,
    },
  },
};
