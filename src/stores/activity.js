import { defineStore } from "pinia";
import Axios from "../Api/axios";
const urlActivity = "/activity-groups";
const email = encodeURIComponent("shulthan@mail.com");
export const useActivityStore = defineStore({
  id: "activity",
  state: () => ({
    list: [],
    byId: {},
  }),
  actions: {
    async getListActivity() {
      try {
        const { data } = await Axios.get(`${urlActivity}?email=${email}`);
        this.list = data.data;
      } catch (e) {
        console.log(e);
      }
    },
    async getActivityById(id) {
      try {
        const { data } = await Axios.get(`${urlActivity}/${id}`);
        this.byId = data;
      } catch (e) {
        console.log(e);
      }
    },
    async createActivity() {
      try {
        const payload = {
          title: "New Activity",
          email: "shulthan@mail.com",
        };
        await Axios({
          url: `${urlActivity}`,
          method: "post",
          data: payload,
        });
        await this.getListActivity();
      } catch (e) {
        console.log(e);
      }
    },
    async deleteActivity(id) {
      try {
        await Axios({
          url: `${urlActivity}/${id}`,
          method: "delete",
        });
        await this.getListActivity();
      } catch (e) {
        console.log(e);
      }
    },
    async updateActivity(payload, id) {
      await Axios({
        url: `${urlActivity}/${id}`,
        method: "patch",
        data: payload,
      });
      await this.getActivityById(id);
    },
  },
});
