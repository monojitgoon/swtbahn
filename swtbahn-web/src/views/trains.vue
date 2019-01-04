<template>
  <div class="hello">
    <input type="button" @click="createPost()" value="submit">
  </div>
</template>



<script>
import axios from "axios";

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
    createPost() {
      var config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      let formData = new FormData();

      formData.append("train", "train1");

      axios
        .post(
          "http://localhost:8080/driver/grab-train",

          formData, // the data to post

          config
        )
        .then(response => {})

        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>