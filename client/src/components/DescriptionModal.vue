<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: String,
    noteid: String,
  },
  data() {
    return {
      newdescription: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    changeDescription() {
      this.newdescription = document.getElementById("newDescription").value;
      this.$emit("submit", { id: this.noteid, des: this.newdescription });
    },
  },
};
</script>

<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button @click="close">X</button>
      </div>
      <div class="modal-body">
        <input id="newDescription" />&nbsp;
        <button @click="changeDescription()">submit</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your modal styles here */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header button {
  background: none;
  border: none;
  cursor: pointer;
}
.modal-body {
  padding-top: 20px;
}
</style>
