<script>
import axios from "axios";
import DescriptionModal from "./components/DescriptionModal.vue"; // 引用 DescriptionModal

const API_URL = "http://localhost:8080/";

export default {
  name: "App",
  components: {
    DescriptionModal,
  },
  data() {
    return {
      title: "Todo App",
      notes: [],
      modalVisible: false,
      noteid: "", // 新增noteid
    };
  },
  methods: {
    async refreshData() {
      axios.get(API_URL + "api/todoapp/GetNote").then((response) => {
        this.notes = response.data;
        console.log(this.notes);
      });
    },
    async addNewNote() {
      var newNote = document.getElementById("newNote").value;
      const formData = new FormData();
      formData.append("newNotes", newNote);
      axios.post(API_URL + "api/todoapp/AddNote", formData).then((response) => {
        this.refreshData();
        alert(response.data);
      });
    },
    async deleteNote(id) {
      axios
        .delete(API_URL + "api/todoapp/DeleteNote?id=" + id)
        .then((response) => {
          this.refreshData();
          alert(response.data);
        });
    },
    // 新增showModal, hideModal, updateDescription
    showModal(id) {
      this.modalVisible = true;
      this.noteid = id;
    },
    hideModal() {
      this.modalVisible = false;
    },
    async updateDescription(params) {
      this.modalVisible = false;
      axios
        .put(
          API_URL +
            "api/todoapp/updateNote?id=" +
            params.id +
            "&description=" +
            params.des
        )
        .then((response) => {
          this.refreshData();
          alert(response.data);
        });
    },
  },
  mounted: function () {
    this.refreshData();
  },
};
</script>

<template>
  <div>
    <h3>Todo App</h3>
    <input id="newNote" />&nbsp;
    <button @click="addNewNote()">Add Note</button>
    <p v-for="note in notes" :key="note.id">
      <b>* {{ note.description }}</b>
      <!-- 刪除的按鈕 -->
      <button @click="deleteNote(note.id)">Delete Note</button>
      <!-- update的按鈕 -->
      <button @click="showModal(note.id)">Update note</button>
    </p>
    <DescriptionModal
      :show="modalVisible"
      :noteid="noteid"
      title="Update Description"
      @close="hideModal"
      @submit="(eventPayload) => updateDescription(eventPayload)"
    >
    </DescriptionModal>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
