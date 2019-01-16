<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-6">
        <basix-alert
          type="success"
          :withCloseBtn="true"
          :message="alertSuccessMessage"
          :show="showSuccessAlert"
        >
          <span class="badge badge-pill badge-success">Success</span>
        </basix-alert>
        <basix-alert
          type="warning"
          :withCloseBtn="true"
          :message="alertWarningMessage"
          :show="showWarningAlert"
        >
          <span class="badge badge-pill badge-warning">Warning</span>
        </basix-alert>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <div class="row form-group">
          <div class="col col-md-3">
            <label for="select" class="form-control-label">Select Train</label>
          </div>
          <div class="col-12 col-md-9">
            <select id="trainList" class="form-control" v-model="selectedTrain">
              <option
                v-for="train in trainsArray"
                v-bind:value="train.trainid"
                v-bind:key="train.trainid"
              >{{train.trainid}}</option>
            </select>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h4>Train Options</h4>
          </div>
          <div class="card-body">
            <div class="col-md-6">
              Grab Train&nbsp;&nbsp;
              <input
                class="btn btn-success"
                type="submit"
                value="Grab"
                @click="GrabTrainClicked(selectedTrain)"
              >
              <input class="btn btn-outline-success" type="submit" value="Release">
            </div>
            <div class="col-md-6">
              <br>Peripheral Status&nbsp;&nbsp;
              <input class="btn btn-warning" type="reset" value="On">
              <input class="btn btn-outline-warning" type="reset" value="Off">
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h4>Currrent State</h4>
          </div>
          <div class="card-body"></div>
        </div>
      </div>
      <!-- /# column -->
      <div class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h4>Train Control</h4>
          </div>
          <div class="card-body text-secondary">
            <vue-slider :speedValue="speed">
              <h4 slot="subheading">TrainName</h4>
              <template slot="transition">
                <v-avatar
                  v-if="isPlaying"
                  :color="color"
                  :style="{
                animationDuration: animationDuration
              }"
                  class="mb-1 v-avatar--metronome"
                  size="12"
                ></v-avatar>
              </template>
              <template slot="playOrPauseButton">
                <v-btn :color="color" dark depressed fab @click="toggle">
                  <v-icon large>{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
                </v-btn>
              </template>
              <template slot="sliderdiv">
                <v-slider v-model="speed" :color="color" always-dirty min="0" max="127">
                  <v-icon slot="prepend" :color="color" @click="decrement">mdi-minus</v-icon>

                  <v-icon slot="append" :color="color" @click="increment">mdi-plus</v-icon>
                </v-slider>
              </template>
            </vue-slider>
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
      trainsArray: [],
      selectedTrain: null,
      GrabStatus: null,
      speed: 0,
      interval: null,
      isPlaying: false,
      alertSuccessMessage: null,
      alertWarningMessage: null,
      showWarningAlert: false,
      showSuccessAlert: false
    };
  },
  computed: {
    color() {
      if (this.speed < 20) return "indigo";
      if (this.speed < 40) return "teal";
      if (this.speed < 70) return "green";
      if (this.speed < 100) return "orange";
      return "red";
    },
    animationDuration() {
      return `${20 / this.speed}s`;
    }
  },
  created() {},
  mounted() {
    this.GetTrainList();
  },
  methods: {
    GrabTrainClicked: function(selection) {
      if (selection == null) {
        this.showWarningAlert = true;
        this.alertWarningMessage = "No train has been selected";
      } else {
        this.showWarningAlert = false;
        this.GrabTrain(selection);
      }
    },
    UpdateSessionStorage(session_id, grab_id) {
      if (session_id != 0 && grab_id == 1) {
        sessionStorage.setItem("session_id", session_id);
        sessionStorage.setItem("grab_id", grab_id);
        this.GrabStatus = this.selectedTrain + "grabbed";
        this.showSuccessAlert = true;
        this.alertSuccessMessage = "Succesfully grabbed " + this.selectedTrain;
      } else if (session_id == 0 && grab_id == -1) {
        this.showWarningAlert = true;
        this.alertWarningMessage = "Already Grabbed One Train";
      } else {
        this.showWarningAlert = true;
        this.alertWarningMessage = "No train has been grabbed";
      }
    },
    decrement() {
      this.speed--;
    },
    increment() {
      this.speed++;
    },
    toggle() {
      this.isPlaying = !this.isPlaying;
    },
    PeripheralSwitchChange() {},

    GrabTrain(trainid) {
      // const grabResponseArray = "12,1".split(",");
      // this.UpdateSessionStorage(grabResponseArray[0], grabResponseArray[1]);

      let formData = new FormData();
      formData.append("train", trainid);
      Api()
        .post("driver/grab-train", formData)
        .then(response => {
          var grabResponseArray = response.data.split(",");
          this.UpdateSessionStorage(grabResponseArray[0], grabResponseArray[1]);
        })
        .catch(e => {
          console.error(e);
        });
    },
    GetTrainList() {
      this.trainsArray = { "0": { trainid: "train1", grabbed: "yes" } };
      Api()
        .get("monitor/trains")
        .then(response => {
          if (response.status == 200) {
            this.trainsArray = response.data;
          }
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