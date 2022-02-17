import adminApi from '../../api/adminApi'
import Toast from '../../views/Toast'

const state = {   
    allRequestedSellers:null, 
    allApprovedSellers: null,
    sellercities: null,
    }
    
    const getters = {
       
        getAllApprovedSellers: function (state) {
            return state.allApprovedSellers;
        },
        getSellerCities: function (state) {
            return state.sellercities;
        }
    }
    const mutations = {
        setAllRequestedSellers: function (state, allRequestedSellers) {
            state.allRequestedSellers = allRequestedSellers;
        },

        setAllApprovedSellers: function (state, allApprovedSellers) {
            state.allApprovedSellers = allApprovedSellers;
        },
        setSellerCities: function (state, sellercities) {
            state.sellerCities = sellercities;
        }
    }
    const actions = {
        async getApprovedSellers({ commit, dispatch }) {
            await adminApi
                .getAllApprovedSellers().then(response => {
                    if ((response.status === 201 || response.status === 200) && response.data) {
                        commit("setAllApprovedSellers", JSON.stringify(response.data));
                    }
                }).catch(err => {
                    dispatch("handleException", err.response, { root: true });
                });
        },
        async activateSeller({/*  commit, */ dispatch }, req) {
            await adminApi.activateSeller(req).then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    dispatch('getApprovedSellers');

                    Toast.showToast(response.data.message, "S");

                    if(response.data.success === true){
                        Toast.showToast(response.data.message, "S");
                        }else{
                            Toast.showToast(response.data.message, "E");
                        }

                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
        },
    
    
        async deactivateSeller({ /* commit, */ dispatch }, req) {
            await adminApi.deactivateSeller(req).then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    dispatch('getApprovedSellers');
                    Toast.showToast(response.data.message, "S");

                    if(response.data.success === true){
                        Toast.showToast(response.data.message, "S");
                        }else{
                            Toast.showToast(response.data.message, "E");
                        }

                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
        },

        async assignSellerCC({/*  commit, */ dispatch }, req) {
            await adminApi.makeSellerChampion(req).then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    dispatch('getApprovedSellers');
                    if(response.data.success === true){
                        Toast.showToast(response.data.message, "S");
                        }else{
                            Toast.showToast(response.data.message, "E");
                        }
                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
        },
    
        async removeSellerCC({/*  commit, */ dispatch }, req) {
            await adminApi.removeSellerChampion(req).then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    dispatch('getApprovedSellers');

                    Toast.showToast(response.data.message, "S");

                    if(response.data.success === true){
                        Toast.showToast(response.data.message, "S");
                        }else{
                            Toast.showToast(response.data.message, "E");
                        }

                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
        },
        async showCities({ commit, dispatch }, req) {
            await adminApi.viewCities(req).then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    commit('setSellerCities', JSON.stringify(response.data));
                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
        },

        async getRequestedSellers({ commit, dispatch }) {
            await adminApi
                .getAllPendingApprovalSellers().then(response => {
                    if ((response.status === 201 || response.status === 200) && response.data) {
                        commit("setAllRequestedSellers", JSON.stringify(response.data));
                    }
                }).catch(err => {
                    dispatch("handleException", err.response, { root: true });
                });
        },
        async approveRequestedSeller({/*  commit, */ dispatch }, req) {
            await adminApi.approveSeller(req).then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    dispatch('getRequestedSellers');
                    if(response.data.success === true){
                        Toast.showToast(response.data.message, "S");
                        }else{
                            Toast.showToast(response.data.message, "E");
                        }
                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
        },
        async rejectRequestedSeller({/*  commit, */ dispatch }, req) {
            await adminApi.rejectSeller(req).then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    dispatch('getRequestedSellers');
                    if(response.data.success === true){
                        Toast.showToast(response.data.message, "S");
                        }else{
                            Toast.showToast(response.data.message, "E");
                        }
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