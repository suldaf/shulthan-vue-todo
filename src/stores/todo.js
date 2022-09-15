import { defineStore } from "pinia";
import Axios from "../Api/axios";
const urlTodo = "/todo-items";
export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    list: [],
  }),
  actions: {
    async getListTodo(groupId) {
      try {
        const { data } = await Axios({
          url: `${urlTodo}?activity_group_id=${groupId}`,
          method: "get",
        });
        this.list = data.data;
      } catch (e) {
        console.log(e);
      }
    },
    async createTodo(payload, grouId) {
      try {
        await Axios({
          url: `${urlTodo}`,
          method: "post",
          data: {
            activity_group_id: grouId,
            title: payload.title,
            priority: payload.priority,
          },
        });
        await this.getListTodo(grouId);
      } catch (e) {
        console.log();
      }
    },
    async deleteTodo(id, grouId) {
      try {
        await Axios({
          url: `${urlTodo}/${id}`,
          method: "delete",
        });
        await this.getListTodo(grouId);
      } catch (e) {
        console.log(e);
      }
    },
    async updateTodo(payload, id, grouId) {
      try {
        await Axios({
          url: `${urlTodo}/${id}`,
          method: "patch",
          data: payload,
        });
        await this.getListTodo(grouId);
      } catch (e) {
        console.log(e);
      }
    },
  },
});
