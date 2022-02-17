import axios from 'axios';

const ROOT_URL = "http://15.206.66.52:9090/v1/users/dashboard/admin";
const ROOT_URL_USER = "http://15.206.66.52:9090/v1/users";


export default {
    getAllCustomers: function () {
        return axios.get(`${ROOT_URL}/customers/get-all`);
    },

    actiavetCustomer: function (req) {
        return axios.post(`${ROOT_URL}/customer/activate`, null, { params: req })
    },

    deActiavetCustomer: function (req) {
        return axios.post(`${ROOT_URL}/customer/deactivate`, null, { params: req })
    },

    addPoints: function (req) {
        return axios.post(`${ROOT_URL}/customer/points/add`, null, { params: req })
    },

    subtractPoints: function (req) {
        return axios.post(`${ROOT_URL}/customer/points/subtract`, null, { params: req })
    },

    makeChampion: function (req) {
        return axios.post(`${ROOT_URL}/customer/make-champion`, null, { params: req })
    },

    removeChampion: function (req) {
        return axios.post(`${ROOT_URL}/customer/remove-champion`, null, { params: req })
    },

    walletHistory: function (req) {
        return axios.get(`${ROOT_URL}/customer/wallet/history`, { params: req })
    },

    getAllPendingApprovalChefs: function () {
        return axios.get(`${ROOT_URL}/chef/approval/get-all`);
    },

    approveChef: function (req) {
        return axios.post(`${ROOT_URL}/chef/approve`, null, { params: req })
    },


    rejectChef: function (req) {
        return axios.post(`${ROOT_URL}/chef/reject`, null, { params: req })
    },

    getAllApprovedChefs: function () {
        return axios.get(`${ROOT_URL}/chef/get-all`);
    },

    activateChef: function (req) {
        return axios.post(`${ROOT_URL}/chef/activate`, null, { params: req })
    },

    deactivateChef: function (req) {
        return axios.post(`${ROOT_URL}/chef/deactivate`, null, { params: req })
    },

    makeChefChampion: function (req) {
        return axios.post(`${ROOT_URL}/chef/make-champion`, null, { params: req })
    },

    removeChefChampion: function (req) {
        return axios.post(`${ROOT_URL}/chef/remove-champion`, null, { params: req })
    },

    getAllApprovedSellers: function () {
        return axios.get(`${ROOT_URL}/seller/get-all`);
    },
    activateSeller: function (req) {
        return axios.post(`${ROOT_URL}/seller/activate`, null, { params: req })
    },

    deactivateSeller: function (req) {
        return axios.post(`${ROOT_URL}/seller/deactivate`, null, { params: req })
    },
    makeSellerChampion: function (req) {
        return axios.post(`${ROOT_URL}/seller/make-champion`, null, { params: req })
    },

    removeSellerChampion: function (req) {
        return axios.post(`${ROOT_URL}/seller/remove-champion`, null, { params: req })
    },

    viewCities: function (req) {
        return axios.get(`${ROOT_URL}/seller/view-cities`, { params: req })
    },
    getAllPendingApprovalSellers: function () {
        return axios.get(`${ROOT_URL}/seller/approval/get-all`);
    },

    approveSeller: function (req) {
        return axios.post(`${ROOT_URL}/seller/approve`, null, { params: req })
    },

    rejectSeller: function (req) {
        return axios.post(`${ROOT_URL}/seller/reject`, null, { params: req })
    },

    getAllSystemTags: function () {
        return axios.get(`${ROOT_URL}/system-tag/get`)
    },

    addSystemTag: function (req) {
        return axios.post(`${ROOT_URL}/system-tag/add`, null, { params: req })
    },

    editSystemTag: function (req) {
        return axios.post(`${ROOT_URL}/system-tag/edit`, null, { params: req })
    },

    deleteSystemTag: function (req) {
        return axios.post(`${ROOT_URL}/system-tag/delete`, null, { params: req })
    },

    getAllMealTypes: function () {
        return axios.get(`${ROOT_URL}/meal-type/get`)
    },

    addMealType: function (req) {
        return axios.post(`${ROOT_URL}/meal-type/add`, null, { params: req })
    },

    editMealType: function (req) {
        return axios.post(`${ROOT_URL}/meal-type/edit`, null, { params: req })
    },

    deleteMealType: function (req) {
        return axios.post(`${ROOT_URL}/meal-type/delete`, null, { params: req })
    },

    getAllStamps: function () {
        return axios.get(`${ROOT_URL}/stamp/get`)
    },

    addStamp: function (data, req) {
        return axios.post(`${ROOT_URL}/stamp/add`, data, { params: req }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },

    editStampName: function (req) {
        return axios.post(`${ROOT_URL}/stamp/edit-name`, null, { params: req })
    },

    editStampImage: function (data, req) {
        return axios.post(`${ROOT_URL}/stamp/edit-image`, data, { params: req }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },

    deleteStamp: function (req) {
        return axios.post(`${ROOT_URL}/stamp/delete`, null, { params: req })
    },

    getAllAwards: function () {
        return axios.get(`${ROOT_URL}/award/get`)
    },

    addAward: function (data, req) {
        console.log(req);
        return axios.post(`${ROOT_URL}/award/add`, data, { params: req }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },

    editAwardName: function (req) {
        return axios.post(`${ROOT_URL}/award/edit-name`, null, { params: req })
    },

    editAwardImage: function (data, req) {
        return axios.post(`${ROOT_URL}/award/edit-image`, data, { params: req }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },

    deleteAward: function (req) {
        return axios.post(`${ROOT_URL}/award/delete`, null, { params: req })
    },

    getAllDishes: function () {
        return axios.get(`${ROOT_URL}/dish/get-all`);
    },
    activateDish: function (req) {
        return axios.post(`${ROOT_URL}/dish/activate`, null, { params: req })
    },

    deactivateDish: function (req) {
        return axios.post(`${ROOT_URL}/dish/deactivate`, null, { params: req })
    },
    getAllDishPostings: function () {
        return axios.get(`${ROOT_URL}/dishpost/get-all`);
    },
    activateDishPosting: function (req) {
        return axios.post(`${ROOT_URL}/dishpost/activate`, null, { params: req })
    },

    deactivateDishPosting: function (req) {
        return axios.post(`${ROOT_URL}/dishpost/deactivate`, null, { params: req })
    },
    getAllProducts: function () {
        return axios.get(`${ROOT_URL}/product/get-all`);
    },
    activateProduct: function (req) {
        return axios.post(`${ROOT_URL}/product/activate`, null, { params: req })
    },

    deactivateProduct: function (req) {
        return axios.post(`${ROOT_URL}/product/deactivate`, null, { params: req })
    },
    getAllProductPostings: function () {
        return axios.get(`${ROOT_URL}/productpost/get-all`);
    },
    activateProductPosting: function (req) {
        return axios.post(`${ROOT_URL}/productpost/activate`, null, { params: req })
    },

    deactivateProductPosting: function (req) {
        return axios.post(`${ROOT_URL}/productpost/deactivate`, null, { params: req })
    },
    viewProductPostCities: function (req) {
        return axios.get(`${ROOT_URL}/productpost/view-cities`, { params: req })
    },
    getAllGlobalParameter: function () {
        return axios.get(`${ROOT_URL}/global-param/get`);
    },

    editGlobalParameter: function (req) {
        return axios.post(`${ROOT_URL}/global-param/edit`, null, { params: req })
    },

    getAllCities: function () {
        return axios.get(`${ROOT_URL_USER}/city/get-cities`)
    },

    addCity: function (req) {
        return axios.post(`${ROOT_URL_USER}/city/add`, null, { params: req })
    },

    editCity: function (req){
        return axios.post(`${ROOT_URL_USER}/city/edit`, req, {
            headers:{
                "content-Type":"application/json"
            }
        })
    },

    deleteCity: function(req) {
        return axios.post(`${ROOT_URL_USER}/city/delete`, null, {params:req})
    },

    getAllClustersByCityId: function (req) {
        return axios.get(`${ROOT_URL_USER}/city/cluster/get`, { params: req })
    },

    addCluster: function (req) {
        return axios.post(`${ROOT_URL_USER}/city/cluster/add`, null, { params: req })
    },

    editCluster: function (req){
        return axios.post(`${ROOT_URL_USER}/cluster/edit`, req, {
            headers:{
                "content-Type":"application/json"
            }
        })
    },

    deleteCluster: function(req) {
        return axios.post(`${ROOT_URL_USER}/cluster/delete`, null, {params:req})
    },

    getAllChaptersByClustersId: function (req) {
        return axios.get(`${ROOT_URL_USER}/city/cluster/chapter/get`, { params: req })
    },

    addChapter: function (data) {
        return axios.post(`${ROOT_URL_USER}/city/cluster/chapter/add`, data, {
            headers: {
                "Content-Type": "application/json",
              }
        })
    },

    editChapter: function (req){
        return axios.post(`${ROOT_URL_USER}/chapter/edit`, req, {
            headers:{
                "content-Type":"application/json"
            }
        })
    },

    deleteChapter: function(req) {
        return axios.post(`${ROOT_URL_USER}/chapter/delete`, null, {params:req})
    },

    getAllBuildingsByChapterId: function (req) {
        return axios.get(`${ROOT_URL_USER}/city/cluster/chapter/building/get`, { params: req })
    },

    addBuilding: function (req) {
        return axios.post(`${ROOT_URL_USER}/city/cluster/chapter/building/add`, null, { params: req })
    },

    editBuilding: function (req){
        return axios.post(`${ROOT_URL_USER}/building/edit`, req, {
            headers:{
                "content-Type":"application/json"
            }
        })
    },

    deleteBuilding: function(req) {
        return axios.post(`${ROOT_URL_USER}/building/delete`, null, {params:req})
    },

    getAllOrders: function () {
        return axios.get(`${ROOT_URL}/orders/get-all`)
    },
    getAllReportedOrders: function () {
        return axios.get(`${ROOT_URL}/orders/reported/get-all`)
    },
    settleOrder: function (req) {
        return axios.post(`${ROOT_URL}/order/settle`, null, { params: req })
    },

    addChefAwardLevel: function (req) {
        return axios.post(`${ROOT_URL}/chef/save-award-level`,null, {params:req})
    },

    login: function (req) {
        return axios.post(`${ROOT_URL_USER}/dashboard/auth/login`,null, {params:req});
    }
}