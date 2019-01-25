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
        <card header-text="Train Options">
          <div class="card-body card-block">
            <div class="row form-group">
              <div class="col col-md-3">
                <label for="select" class="form-control-label">Select Train</label>
              </div>
              <div class="col col-md-3">
                <select id="trainList" class="form-control" v-model="selectedTrain">
                  <option
                    v-for="train in trainsArray"
                    v-bind:value="train.trainid"
                    v-bind:key="train.trainid"
                  >{{train.trainid}}</option>
                </select>
              </div>
              <div class="col col-md-3">
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
            </div>
          </div>
        </card>
        <card header-text="Current Route Request">
          <div class="col col-md-12">
            <input
              class="btn btn-info pull-right"
              type="submit"
              value="Add Route Request"
              @click="AddRouteRequest(selectedTrain)"
            >
          </div>
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>Train Name</td>
                  <td>Starting Segment</td>
                  <td>Ending Segment</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="peripheral in peripheralArray" :key="peripheral.peripheralid">
                  <td>{{ peripheral.peripheralid }}</td>
                  <td>{{ peripheral.state }}</td>
                  <td>
                    <input
                      class="btn btn-warning"
                      type="submit"
                      value="Toggle State"
                      @click="ChangePeripheralState(peripheral.peripheralid,peripheral.state)"
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </card>
        <card header-text="Peripherals">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td>Peripheral Name</td>
                  <td>State</td>
                  <td>Change Peripheral State</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="peripheral in driverProperties.train_PeripheralArray"
                  :key="peripheral.peripheralid"
                >
                  <td>{{ peripheral.peripheralid }}</td>
                  <td>{{ peripheral.state }}</td>
                  <td>
                    <input
                      class="btn btn-warning"
                      type="submit"
                      value="Toggle State"
                      @click="ChangePeripheralState(peripheral.peripheralid,peripheral.state)"
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </card>
      </div>
      <!-- /# column -->
      <div class="col-lg-6">
        <card header-text="Current State">{{trainCurrentState}}</card>
        <card header-text="Speed Control">
          <vue-slider :speedValue="speed">
            <h4 slot="subheading">Grabbed Train Name : {{driverProperties.trainID}}</h4>
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
                <v-icon large>{{ trainProperties.train_IsPlaying ? 'mdi-stop' : 'mdi-play' }}</v-icon>
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
        </card>
      </div>
      <!-- /# column -->
    </div>
    <basix-modal large="true" v-show="showModal">
      <h4 slot="title">{{driverProperties.trainID}}</h4>
      <card header-text="Route Request">
        <div class="card-body card-block">
          <div class="row form-group">
            <div class="col col-md-3">
              <label for="select" class="form-control-label">Select Starting Segment</label>
            </div>
            <div class="col col-md-3">
              <select id="trainList" class="form-control" v-model="selectedTrain">
                <option
                  v-for="train in trainsArray"
                  v-bind:value="train.trainid"
                  v-bind:key="train.trainid"
                >{{train.trainid}}</option>
              </select>
            </div>
          </div>
          <div class="row form-group">
            <div class="col col-md-3">
              <label for="select" class="form-control-label">Select Ending Segment</label>
            </div>
            <div class="col col-md-3">
              <select id="trainList" class="form-control" v-model="selectedTrain">
                <option
                  v-for="train in driverProperties.trainsArray"
                  v-bind:value="train.trainid"
                  v-bind:key="train.trainid"
                >{{train.trainid}}</option>
              </select>
            </div>
          </div>
        </div>
      </card>
      <div slot="footer">
        <button type="submit" class="btn btn-primary btn-sm" @click="showModal = false">
          <i class="fa fa-dot-circle-o"></i> Submit
        </button>
        <button type="reset" class="btn btn-danger btn-sm" @click="showModal = false">
          <i class="fa fa-ban"></i> Reset
        </button>
      </div>
    </basix-modal>
  </div>
  <!-- .animated -->
</template>

<script>
import Api from "../API";
import { mapState, mapActions } from "vuex";

export default {
  name: "trains",
  data() {
    return {
      driverProps: [
        {
          grabID: -1,
          trainID: null,
          train_PeripheralArray: [],
          train_RouteRequestArray: []
        }
      ],
      trainProps: [
        {
          train_IsPlaying: false,
          train_Speed: 0
        }
      ],
      showModal: false,
      trainsArray: [],
      selectedTrain: null,
      GrabStatus: null,
      speed: 0,
      interval: null,
      isPlaying: false,
      alertSuccessMessage: null,
      alertWarningMessage: null,
      showWarningAlert: false,
      showSuccessAlert: false,
      peripheralArray: [],
      trainCurrentState: null
    };
  },
  watch: {
    trainCurrentState(val) {
      if (val != null) this.GetTrainStatus(this.grabbedTrain);
    }
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
    },
    ...mapState({
      driverProperties: state => state.system.driverProperties,
      trainProperties: state => state.system.trainProperties
    })
  },
  created() {},
  mounted() {
    this.InitialSpeedValueLoad();
    this.GetTrainList();
    this.GetGrabIDAndSessionID();
    this.GetGrabbedTrain();
  },
  methods: {
    ...mapActions("system", [
      "updateDriverProps",
      "updateSession",
      "updateTrainState"
    ]),
    /* Component Action starts*/
    InitialSpeedValueLoad() {
      this.speed = this.trainProperties.train_Speed;
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
    ForceStop() {
      this.isPlaying = false;
      this.speed = 0;
      this.SetDCCSpeed(this.speed);
    },
    /* Component Action ends*/
    /* Method starts*/
    GetGrabbedTrain() {
      this.grabbedTrain = localStorage.getItem("grab_train");
    },
    GetGrabIDAndSessionID() {
      this.sessionID = localStorage.getItem("session_id");
      this.grabID = localStorage.getItem("grab_id");
    },
    AddRouteRequest: function(selection) {
      this.showModal = true;
    },
    GrabTrainClicked: function(selection) {
      this.GrabTrain(selection);
      /* if (selection != null) {
         this.GetGrabIDAndSessionID();
         this.GetGrabbedTrain();
        if (this.sessionID == "0" && this.grabID == "-1") {
          this.GrabTrain(selection);
        } else {
          this.TriggerWarningAlert("You can only grab one train!");
        }
      } else {
        this.TriggerWarningAlert("No train has been selected");
      }*/
    },
    UpdatelocalStorage(session_id, grab_id) {
      localStorage.setItem("session_id", session_id);
      localStorage.setItem("grab_id", grab_id);
      this.GetGrabIDAndSessionID();
      this.GetGrabbedTrain();
    },
    UpdateGrabbedTrainInLocalStorage(grab_train) {
      localStorage.setItem("grab_train", grab_train);
    },
    ResponseDataFeedback(response_data, success_msg) {
      if (response_data == "invalid session id") {
        this.UpdatelocalStorage(0, -1);
        this.TriggerWarningAlert("Session id was not valid anymore");
      } else if (response_data == "invalid grab id") {
        this.UpdatelocalStorage(0, -1);
        this.TriggerWarningAlert("Grab id was not valid");
      } else this.TriggerSuccessAlert(success_msg);
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
    },
    /* Method ends*/
    /* Axios request starts*/
    GetTrainList() {
      this.trainsArray = { "0": { trainid: "train1", grabbed: "yes" } };
      Api()
        .post("monitor/trains")
        .then(response => {
          if (response.status == 200) {
            this.trainsArray = response.data;
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    GrabTrain(trainid) {
      this.driverProps.grabID = 1;
      this.driverProps.trainID = "train1";
      this.driverProps.train_PeripheralArray = this.GetPeripheralList(trainid);

      this.updateDriverProps(this.driverProps);

      //this.GetTrainStatus(trainid);
      this.TriggerSuccessAlert("Successfully Grabbed : " + trainid);
      /* let formData = new FormData();
      formData.append("train", trainid);
      Api()
        .post("driver/grab-train", formData)
        .then(response => {
          if (response.status == 200) {
            this.grabbedTrain = trainid;
            this.UpdatelocalStorage(
              response.data.split(",")[0],
              response.data.split(",")[1]
            );
            this.UpdateGrabbedTrainInLocalStorage(trainid);
            this.GetPeripheralList(trainid);
            this.GetTrainStatus(trainid);
            this.TriggerSuccessAlert("Successfully Grabbed : " + trainid);
          }
        })
        .catch(e => {
          console.error(e);
        });*/
    },
    ReleaseTrain() {
      let formData = new FormData();
      formData.append("session-id", this.sessionID);
      formData.append("grab-id", this.grabID);
      Api()
        .post("driver/release-train", formData)
        .then(response => {
          if (response.status == 200) {
            this.UpdatelocalStorage(0, -1);
            this.ResponseDataFeedback(
              response.data,
              "Succesfully released train :  " + this.grabbedTrain
            );
            this.UpdateGrabbedTrainInLocalStorage("");
            this.ForceStop();
          }
        })
        .catch(e => {
          console.error(e);
        });
    },

    SetDCCSpeed(spd) {
      alert(spd);
      this.trainProps.train_IsPlaying = true;
      this.trainProps.train_Speed = spd;

      this.updateTrainState(this.trainProps);

      /* let formData = new FormData();
      formData.append("session-id", this.sessionID);
      formData.append("grab-id", this.grabID);
      formData.append("speed", spd);
      formData.append("track-output", "master");
      Api()
        .post("driver/set-dcc-train-speed", formData)
        .then(response => {
          if (response.status == 200) {
            if (spd > 0) {

              this.ResponseDataFeedback(
                response.data,
                this.grabbedTrain + " running: " + " with speed: " + spd
              );
            } else {

              this.ResponseDataFeedback(
                response.data,
                "Succesfully stopped: " +
                  this.grabbedTrain +
                  " with speed:" +
                  spd
              );
            }
          }
        })
        .catch(e => {
          console.error(e);
        });*/
    },
    GetPeripheralList(trainid) {
      this.peripheralArray = {
        "0": { peripheralid: "light1", state: "on" },
        "1": { peripheralid: "light2", state: "on" },
        "2": { peripheralid: "horn", state: "on" }
      };
      return this.peripheralArray;
      /*   let formData = new FormData();
      formData.append("train", trainid);
      Api()
        .post("monitor/train-peripherals", formData)
        .then(response => {
          if (response.status == 200) {
            this.peripheralArray = response.data;
          }
        })
        .catch(e => {
          console.error(e);
        });*/
    },
    ChangePeripheralState(id, stateValue) {
      let formData = new FormData();
      formData.append("session-id", this.sessionID);
      formData.append("grab-id", this.grabID);
      formData.append("peripheral", id);
      formData.append("state", stateValue == "on" ? "off" : "on");
      formData.append("track-output", "master");

      Api()
        .post("driver/set-train-peripheral", formData)
        .then(response => {
          if (response.status == 200) {
            this.GetPeripheralList(this.grabbedTrain);
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    GetTrainStatus: function(trainid) {
      let formData = new FormData();
      formData.append("train", trainid);
      Api()
        .post("monitor/train-state", formData)
        .then(response => {
          this.trainCurrentState = response.data;
        })
        .catch(e => {
          console.error(e);
        });
    }
    /* Axios request ends*/
  }
};
</script>

<style>
</style>