import adminApi from '../../api/adminApi'
import Toast from '../../views/Toast'

const state = {
   products: null,
   productposting: null,
   productcities: null,

};

const getters = {
    getProducts: function (state) {
        return state.products;
    },
    getProductPosting: function (state) {
        return state.productposting;
    },
    getProductCities: function (state) {
        return state.productcities;
    }

};

const mutations = {
    setProducts: function (state, dishes) {
        state.dishes = dishes;
    },

    setProductPosting: function (state, dishposting) {
        state.dishposting = dishposting;
    },
    setProductCities: function (state, productcities) {
        state.productCities = productcities;
    }
};

const actions = {

    async getProduct({ commit, dispatch }) {
        await adminApi
            .getAllProducts().then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    commit("setProducts", JSON.stringify(response.data));
                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
    },

    async activateProducts({/*  commit, */ dispatch }, req) {
        await adminApi.activateProduct(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getProduct');
                if(response.data.success=== true){
                    Toast.showToast(response.data.message, "S");
                }else{
                    Toast.showToast(response.data.message, "E");
                }
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },
    async deactivateProducts({ /* commit, */ dispatch }, req) {
        await adminApi.deactivateProduct(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getProduct');
                if(response.data.success=== true){
                    Toast.showToast(response.data.message, "S");
                }else{
                    Toast.showToast(response.data.message, "E");
                }
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },


        async getProductPosting({ commit, dispatch }) {
            await adminApi
                .getAllProductPostings().then(response => {
                    if ((response.status === 201 || response.status === 200) && response.data) {
                        commit("setProductPosting", JSON.stringify(response.data));
                    }
                }).catch(err => {
                    dispatch("handleException", err.response, { root: true });
                });
        },
    
        async activateProductPostings({/*  commit, */ dispatch }, req) {
            await adminApi.activateProductPosting(req).then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    dispatch('getProductPosting');
                    if(response.data.success=== true){
                        Toast.showToast(response.data.message, "S");
                    }else{
                        Toast.showToast(response.data.message, "E");
                    }
                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
        },
        async deactivateProductPostings({ /* commit, */ dispatch }, req) {
            await adminApi.deactivateProductPosting(req).then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    dispatch('getProductPosting');
                    if(response.data.success=== true){
                        Toast.showToast(response.data.message, "S");
                    }else{
                        Toast.showToast(response.data.message, "E");
                    }
                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
        },
            async showProductPostCities({ commit, dispatch }, req) {
                await adminApi.viewProductPostCities(req).then(response => {
                    if ((response.status === 201 || response.status === 200) && response.data) {
                        commit('setProductCities', JSON.stringify(response.data));
                    }
                }).catch(err => {
                    dispatch("handleException", err.response, { root: true });
                });
            },


    }
        
    

    


export default {
    state,
    getters,
    mutations,
    actions
  };
