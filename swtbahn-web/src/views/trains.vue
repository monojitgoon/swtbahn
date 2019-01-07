<template>
  <div class="hello">
    <input type="button" @click="grabTrain()" value="submit">
  </div>
</template>



<script>
import Api from "../API";

export default {
  name: "trains",

  data() {
    return {
      postBody: null,
      postTitle: null
    };
  },

  created() {},

  methods: {
    grabTrain() {
      let formData = new FormData();
      formData.append("train", "train1");

      Api()
        .post("driver/grab-train", formData)
        .then(response => {
          this.postTitle = response.data;
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>