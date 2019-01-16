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
              <input
                class="btn btn-outline-success"
                type="submit"
                value="Release"
                @click="ReleaseTrain"
              >
            </div>
            <div class="col-md-6">
              <br>Peripheral Status&nbsp;&nbsp;
              <input
                class="btn btn-warning"
                type="reset"
                value="On"
                @click="TurnPeripheralOn"
              >
              <input
                class="btn btn-outline-warning"
                type="reset"
                value="Off"
                @click="TurnPeripheralOff"
              >
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
              <h4 slot="subheading">{{grabbedTrain}}</h4>
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
                <v-slider
                  v-model="speed"
                  :color="color"
                  always-dirty
                  min="0"
                  max="127"
                  @change="SliderSpeedChange"
                >
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
      grabbedTrain: null,
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
        this.TriggerWarningAlert("No train has been selected");
      } else {
        this.GrabTrain(selection);
      }
    },
    UpdateSessionStorage(session_id, grab_id) {
      if (session_id != 0 && grab_id == 1) {
        sessionStorage.setItem("session_id", session_id);
        sessionStorage.setItem("grab_id", grab_id);
        sessionStorage.setItem("grab_train", this.grabbedTrain);
        this.TriggerSuccessAlert("Successfully Grabbed : " + this.grabbedTrain);
      } else if (session_id == 0 && grab_id == -1) {
        this.TriggerWarningAlert("Already Grabbed One Train");
      } else {
        this.TriggerWarningAlert("No train has been grabbed");
      }
    },
    SliderSpeedChange() {
      if (this.isPlaying) this.SetDCCSpeed(this.speed);
    },
    decrement() {
      this.speed--;
      if (this.isPlaying) this.SetDCCSpeed(this.speed);
    },
    increment() {
      this.speed++;
      if (this.isPlaying) this.SetDCCSpeed(this.speed);
    },
    toggle() {
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        this.speed = this.speed == 0 ? 1 : this.speed;
        this.SetDCCSpeed(this.speed);
      } else {
        this.speed = 0;
        this.SetDCCSpeed(this.speed);
      }
    },
    SetDCCSpeed(spd) {
      if (spd > 0) {
        alert(spd);
        this.TriggerSuccessAlert(
          this.selectedTrain + " running: " + " with speed: " + spd
        );
      } else {
        this.TriggerSuccessAlert(
          "Succesfully stopped: " + this.selectedTrain + " with speed:" + spd
        );
      }

      // Api()
      //   .post("driver/release-train")
      //   .then(response => {
      //     var grabResponseArray = response.data.split(",");
      //     this.UpdateSessionStorage(grabResponseArray[0], grabResponseArray[1]);
      //   })
      //   .catch(e => {
      //     console.error(e);
      //   });
    },
    TurnPeripheralOn() {
      this.TriggerSuccessAlert(
        "Succesfully turned on Peripherals of " + this.selectedTrain
      );
      // Api()
      //   .post("driver/release-train")
      //   .then(response => {
      //     var grabResponseArray = response.data.split(",");
      //     this.UpdateSessionStorage(grabResponseArray[0], grabResponseArray[1]);
      //   })
      //   .catch(e => {
      //     console.error(e);
      //   });
    },
    TurnPeripheralOff() {
      this.TriggerSuccessAlert(
        "Succesfully turned Off the Peripherals of " + this.selectedTrain
      );
      // Api()
      //   .post("driver/release-train")
      //   .then(response => {
      //     var grabResponseArray = response.data.split(",");
      //     this.UpdateSessionStorage(grabResponseArray[0], grabResponseArray[1]);
      //   })
      //   .catch(e => {
      //     console.error(e);
      //   });
    },
    ReleaseTrain() {
      this.TriggerSuccessAlert("Succesfully released " + this.selectedTrain);
      // Api()
      //   .post("driver/release-train")
      //   .then(response => {
      //     var grabResponseArray = response.data.split(",");
      //     this.UpdateSessionStorage(grabResponseArray[0], grabResponseArray[1]);
      //   })
      //   .catch(e => {
      //     console.error(e);
      //   });
    },
    GrabTrain(trainid) {
      this.grabbedTrain = trainid;
      const grabResponseArray = "12,1".split(",");
      this.UpdateSessionStorage(grabResponseArray[0], grabResponseArray[1]);

      // let formData = new FormData();
      // formData.append("train", trainid);
      // Api()
      //   .post("driver/grab-train", formData)
      //   .then(response => {
      //     var grabResponseArray = response.data.split(",");
      //     this.UpdateSessionStorage(grabResponseArray[0], grabResponseArray[1]);
      //   })
      //   .catch(e => {
      //     console.error(e);
      //   });
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
    },
    TriggerSuccessAlert: function(msg) {
      this.showSuccessAlert = true;
      this.alertSuccessMessage = msg;
      setTimeout(
        function() {
          this.showSuccessAlert = false;
        }.bind(this),
        2000
      );
    },
    TriggerWarningAlert: function(msg) {
      this.showWarningAlert = true;
      this.alertWarningMessage = msg;
      setTimeout(
        function() {
          this.showWarningAlert = false;
        }.bind(this),
        2000
      );
    }
  }
};
</script>

<style>
</style>