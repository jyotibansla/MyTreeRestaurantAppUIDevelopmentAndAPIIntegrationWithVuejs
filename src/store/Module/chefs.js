import adminApi from '../../api/adminApi'
import Toast from '../../views/Toast'

const state = {
allRequestedChefs:null,
allApprovedChefs: null,
}

const getters = {
    getAllRequestedChefs : function(state) {
        return state.allRequestedChefs;
    },
    getAllApprovedChefs: function (state) {
        return state.allApprovedChefs;
    }
}

const mutations = {
    setAllRequestedChefs: function(state, data) {
        state.allRequestedChefs = data;
    },
    setAllApprovedChefs: function (state, allApprovedChefs) {
        state.allApprovedChefs = allApprovedChefs;
    }
}

const actions = {
    async getRequestedChefs({ commit, dispatch }) {
        await adminApi
            .getAllPendingApprovalChefs().then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    commit("setAllRequestedChefs", JSON.stringify(response.data));
                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
    },

    async approveRequestedChef({ /* commit, */ dispatch }, req) {
        await adminApi.approveChef(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getRequestedChefs');
                Toast.showToast(response.data, "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async rejectRequestedChef({ /* commit, */ dispatch }, req) {
        await adminApi.rejectChef(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getRequestedChefs');
                Toast.showToast(response.data, "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },


    async getApprovedChefs({ commit, dispatch }) {
        await adminApi
            .getAllApprovedChefs().then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    commit("setAllApprovedChefs", JSON.stringify(response.data));
                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
    },
    async activateChef({/*  commit, */ dispatch }, req) {
        await adminApi.activateChef(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getApprovedChefs');
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


    async deactivateChef({ /* commit, */ dispatch }, req) {
        await adminApi.deactivateChef(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getApprovedChefs');
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
    async assignChefCC({/*  commit, */ dispatch }, req) {
        await adminApi.makeChefChampion(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getApprovedChefs');
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

    async removeChefCC({/*  commit, */ dispatch }, req) {
        await adminApi.removeChefChampion(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getApprovedChefs');
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

    async addAwardLevel({dispatch},req){
        await adminApi.addChefAwardLevel(req).then(response =>{
            if((response.status ===201 || response.status === 200) && response.data ){
                dispatch("getApprovedChefs");
                if(response.data.success=== true){
                    Toast.showToast(response.data.message, "S");
                }else{
                    Toast.showToast(response.data.message, "E");
                }
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    }
}


export default {
    state,
    getters,
    mutations,
    actions
};