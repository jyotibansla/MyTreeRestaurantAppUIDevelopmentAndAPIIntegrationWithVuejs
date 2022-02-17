//import router from '../../router'
import adminApi from '../../api/adminApi'
import Toast from '../../views/Toast'

const state = {
    allCustomers: null,
    myPoints: null
};
 
const getters = {
    getAllCustomers: function (state) {
        return state.allCustomers;
    },

    getMyPoints: function (state) {
        return state.myPoints;
    }
};

const mutations = {
    setAllCustomers: function (state, allCustomers) {
        state.allCustomers = allCustomers;
    },

    setMyPoints: function (state, points) {
        state.myPoints = points;
    }
};

const actions = {
    //get all the customers that are available
    async getCustomers({ commit, dispatch }) {
        await adminApi
            .getAllCustomers().then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    commit("setAllCustomers", JSON.stringify(response.data));
                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
    },

    async activateCustomer({/*  commit, */ dispatch }, req) {
        await adminApi.actiavetCustomer(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getCustomers');
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

    async assignCC({/*  commit, */ dispatch }, req) {
        await adminApi.makeChampion(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getCustomers');
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

    async removeCC({/*  commit, */ dispatch }, req) {
        await adminApi.removeChampion(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getCustomers');
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

    async deactivateCustomer({ /* commit, */ dispatch }, req) {
        await adminApi.deActiavetCustomer(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getCustomers');
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

    async addMyPoints({ /* commit, */ dispatch }, req) {
        await adminApi.addPoints(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getCustomers');
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

    async subtractMyPoints({ /* commit, */ dispatch }, req) {
        await adminApi.subtractPoints(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getCustomers');
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

    async pointsHistory({ commit, dispatch }, req) {
        await adminApi.walletHistory(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                commit('setMyPoints', JSON.stringify(response.data));
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },
};


export default {
    state,
    getters,
    mutations,
    actions
};