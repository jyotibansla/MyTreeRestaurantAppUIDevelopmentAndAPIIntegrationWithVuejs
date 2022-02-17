import adminApi from '../../api/adminApi'
import Toast from '../../views/Toast'
const state = {
    allCities: null,
    allClusterByCity: null,
    allChaptersByCluster: null,
    allBuildingsByChapter: null
};

const getters = {

};
const mutations = {
    setAllCities: function (state, allCities) {
        state.allCities = allCities;
    },

    setAllClustersByCity: function (state, allClusters) {
        state.allClusterByCity = allClusters;
    },

    setAllChaptersByCluster: function (state, allChapters) {
        state.allChaptersByCluster = allChapters;
    },

    setAllBuildingsByChapter: function (state, allBuildings) {
        state.allBuildingsByChapter = allBuildings
    }
};
const actions = {
    async getallCities({ commit, dispatch }) {
        await adminApi.getAllCities().then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                commit('setAllCities', JSON.stringify(response.data));
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async addNewCity({ dispatch }, req) {
        await adminApi.addCity(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getallCities');
                Toast.showToast("Added City Successfully", "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async editCity({ dispatch }, req) {
        await adminApi.editCity(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getallCities');
                Toast.showToast("Edited City Successfully", "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async deleteCity({ dispatch }, req) {
        await adminApi.deleteCity(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getallCities');
                if (response.data.success == true) {
                    Toast.showToast(response.data.message, "S");
                } else {
                    Toast.showToast(response.data.message, "E");
                }
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async getallClusterByCity({ commit, dispatch }, req) {
        await adminApi.getAllClustersByCityId(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                commit('setAllClustersByCity', JSON.stringify(response.data));
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async addNewCluster({ dispatch }, req) {
        await adminApi.addCluster(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getallClusterByCity', { cityId: req.cityId });
                Toast.showToast("Added Cluster Successfully", "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async editCluster({ dispatch }, req) {
        await adminApi.editCluster(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getallClusterByCity',{cityId: req.cityId});
                Toast.showToast("Edited City Successfully", "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async deleteCluster({ dispatch }, {req,id}) {        
      console.log("object", req,id)
        await adminApi.deleteCluster(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getallClusterByCity',{cityId: id});
                if (response.data.success == true) {
                    Toast.showToast(response.data.message, "S");
                } else {
                    Toast.showToast(response.data.message, "E");
                }
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async getallChaptersByCluster({ commit, dispatch }, req) {
        await adminApi.getAllChaptersByClustersId(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                commit('setAllChaptersByCluster', JSON.stringify(response.data));
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async addNewChapter({ dispatch }, req) {
        await adminApi.addChapter(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getallChaptersByCluster', { clusterId: req[0].clusterId });
                Toast.showToast("Added Chapter Successfully", "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async editChapter({ dispatch }, req) {
        await adminApi.editChapter(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getallChaptersByCluster', { clusterId: req.clusterId });
                Toast.showToast("Edited City Successfully", "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async deleteChapter({ dispatch }, {req,id}) {
        await adminApi.deleteChapter(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getallChaptersByCluster',{clusterId:id});
                if (response.data.success == true) {
                    Toast.showToast(response.data.message, "S");
                } else {
                    Toast.showToast(response.data.message, "E");
                }
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async getallBuildingsByChapter({ commit, dispatch }, req) {
        await adminApi.getAllBuildingsByChapterId(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                commit('setAllBuildingsByChapter', JSON.stringify(response.data));
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async addNewBuilding({ dispatch }, req) {
        await adminApi.addBuilding(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getallBuildingsByChapter', { chapterId: req.chapterId });
                Toast.showToast("Added Building Successfully", "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async editBuilding({ dispatch }, req) {
        await adminApi.editBuilding(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getallBuildingsByChapter', { chapterId: req.chapterId });
                Toast.showToast("Edited City Successfully", "S");
            }
        }).catch(err => {
            dispatch("handleException", err.response, { root: true });
        });
    },

    async deleteBuilding({ dispatch }, {req,id}) {
        await adminApi.deleteBuilding(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getallBuildingsByChapter',{chapterId: id});
                if (response.data.success == true) {
                    Toast.showToast(response.data.message, "S");
                } else {
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
