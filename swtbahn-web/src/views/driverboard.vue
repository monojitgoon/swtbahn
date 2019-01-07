<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-lg-6">
        <div class="row form-group">
          <div class="col col-md-3">
            <label for="select" class="form-control-label">Select Train</label>
          </div>
          <div class="col-12 col-md-9">
            <select name="select" id="select" class="form-control">
              <option value="0">Please select train</option>
              <option value="1">Train1</option>
              <option value="2">Train2</option>
              <option value="3">Train3</option>
            </select>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h4>Grab Train</h4>
          </div>
          <div class="card-body">
            <button
              type="button"
              class="btn btn-outline-primary btn-lg btn-block"
              @click="grabTrain()"
            >Grab Train</button>
            <button
              type="button"
              class="btn btn-outline-warning btn-lg btn-block"
            >Turn on Peripherals</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h4>Currrent State</h4>
          </div>
          <div class="card-body">Segment Name</div>
        </div>
      </div>
      <!-- /# column -->
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h4>Train Status</h4>
          </div>
          <div class="card-body">
            <canvas
              onload="draw(100);"
              class="canvas"
              id="myCanvas"
              width="500"
              height="200"
            >Your browser does not support the HTML5 canvas tag.</canvas>
          </div>
        </div>
      </div>
      <!-- /# column -->
    </div>

    <div class="row">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h4>Set DCC Speed</h4>
          </div>
          <div class="card-body">
            <div id="slider">
              0mph
              <input
                style="width:400px"
                id="slide"
                type="range"
                min="0"
                max="127"
                step="2"
                value="10"
                onchange="draw(this.value)"
              >
              127mph
            </div>
            <div class="row form-group">
              <div class="col col-md-3">
                <label for="select" class="form-control-label">Select Train</label>
              </div>
              <div class="col-12 col-md-9">
                <select id="myList" onchange="redraw();" name="select" class="form-control">
                  <option value="10">Speed = 10</option>
                  <option value="20">Speed = 20</option>
                  <option value="30">Speed = 30</option>
                  <option value="40">Speed = 40</option>
                  <option value="50">Speed = 50</option>
                  <option value="60">Speed = 60</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /# column -->
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h4>Train Name : {}</h4>
          </div>
          <div class="card-body">
            <button type="button" class="btn btn-outline-success btn-lg btn-block">Start Train</button>
            
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Stop Train</button>
          </div>
        </div>
      </div>
      <!-- /# column -->
    </div>
  </div>
  <!-- .animated -->
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

<style>
</style>