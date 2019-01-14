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
            Grab Train&nbsp;&nbsp;
            <v-switch
              v-model="checkedGrabTrain"
              color="success"
              value="checkedGrabTrain"
              @change="SwitchChange($event !== null,selectedTrain)"
            ></v-switch>
            {{ GrabStatus }}&nbsp;&nbsp;
            <br>
            Peripheral Status&nbsp;&nbsp;
            checkedGrabTrain: {{checkedGrabTrain}}
            {{ GrabStatus }}&nbsp;&nbsp;
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
      checkedGrabTrain: false,
      checkedPeripheralSwitch: false,
      check: false,
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
    UpdateSessionStorage(session_id, grab_id) {
      if (session_id != 0 && grab_id == 1) {
        this.showWarningAlert = false;
        alert(session_id);
        sessionStorage.setItem("session_id", session_id);
        sessionStorage.setItem("grab_id", grab_id);
        GrabStatus = selectedTrain + "grabbed";
        this.showSuccessAlert = true;
        this.alertSuccessMessage = "Succesfully grabbed" + selectedTrain;
        this.checkedGrabTrain = true;
      } else if (session_id == 0 && grab_id == -1) {
        alert(session_id);
        this.showWarningAlert = true;
        this.alertWarningMessage = "Already Grabbed One Train";
        this.checkedGrabTrain = false;
      } else {
        alert(session_id);
        this.showWarningAlert = true;
        this.alertWarningMessage = "No train has been grabbed";
        this.checkedGrabTrain = false;
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
    SwitchChange: function(event, selectedTrain) {
      if (event == true) {
        if (selectedTrain == null) {
          this.showWarningAlert = true;
          this.alertWarningMessage = "No train has been selected";
          this.checkedGrabTrain = false;
        } //else this.GrabTrain(selectedTrain);
      }
    },
    GrabTrain(trainid) {
      let formData = new FormData();
      formData.append("train", trainid);

      Api()
        .post("driver/grab-train", formData)
        .then(response => {
          //   var grabResponseArray = response.data.split(",");
          var grabResponseArray = "0,0";
          alert("here");
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