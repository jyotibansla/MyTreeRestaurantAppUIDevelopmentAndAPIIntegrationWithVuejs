//import router from '../../router'
import adminApi from '../../api/adminApi'
import Toast from '../../views/Toast'

const state = {
    allSystemTag: null,
    allMealTypes: null,
    allStamps: null,
    allChefAwards: null
};

const getters = {

};

const mutations = {
    setSystemTags: function (state, alltags) {
        state.allSystemTag = alltags;
    },

    setMealTypes: function (state, allMealTypes) {
        state.allMealTypes = allMealTypes;
    },

    setStamps: function (state, allStamps) {
        state.allStamps = allStamps;
    },

    setChefAwards: function (state, allChefAwards) {
        state.allChefAwards = allChefAwards;
    },
};

const actions = {
    async getSystemtags({ commit, dispatch }) {
        await adminApi.getAllSystemTags().then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                commit("setSystemTags", JSON.stringify(response.data));
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async addSystemtag({ /* commit, */ dispatch }, req) {
        await adminApi.addSystemTag(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getSystemtags');
                    Toast.showToast('Added System Tag Successfully', "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async editSystemtag({ /* commit, */ dispatch }, req) {
        await adminApi.editSystemTag(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getSystemtags');
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

    async deleteSystemtag({ /* commit, */ dispatch }, req) {
        await adminApi.deleteSystemTag(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getSystemtags');
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

    async getMealtypes({ commit, dispatch }) {
        await adminApi.getAllMealTypes().then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                commit("setMealTypes", JSON.stringify(response.data));
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async addMealtype({ /* commit, */ dispatch }, req) {
        await adminApi.addMealType(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getMealtypes');
                    Toast.showToast('Added Meal Type Successfully', "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async editMealtype({ /* commit, */ dispatch }, req) {
        await adminApi.editMealType(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getMealtypes');
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

    async deleteMealtype({ /* commit, */ dispatch }, req) {
        await adminApi.deleteMealType(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getMealtypes');
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

    async getStamps({ commit, dispatch }) {
        await adminApi.getAllStamps().then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                commit("setStamps", JSON.stringify(response.data));
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async addNewStamp({ /* commit, */ dispatch },{data, req}) {
        await adminApi.addStamp(data,req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getStamps');
                Toast.showToast("Added Stamp Successfully", "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async editStampByName({ /* commit, */ dispatch }, req) {
        await adminApi.editStampName(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getStamps');
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

    async editStampByImage({ /* commit, */ dispatch }, {data,req}) {
        await adminApi.editStampImage(data,req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getStamps');
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

    async deleteStamp({ /* commit, */ dispatch }, req) {
        await adminApi.deleteStamp(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getStamps');
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

    async getChefAwards({ commit, dispatch }) {
        await adminApi.getAllAwards().then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                commit("setChefAwards", JSON.stringify(response.data));
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async addChefAward({ /* commit, */ dispatch }, {data, req}) {
        await adminApi.addAward(data,req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getChefAwards');
                Toast.showToast("Added Chef Award Successfully", "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async editChefAwardByName({ /* commit, */ dispatch }, req) {
        await adminApi.editAwardName(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getChefAwards');
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

    async editChefAwardByImage({ /* commit, */ dispatch }, {data,req}) {
        await adminApi.editAwardImage(data,req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getChefAwards');
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

    async deleteChefAward({ /* commit, */ dispatch }, req) {
        await adminApi.deleteAward(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getChefAwards');
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
};


export default {
    state,
    getters,
    mutations,
    actions
}