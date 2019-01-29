<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-6">
        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
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
                    v-for="train in this.system.train_Array"
                    v-bind:value="train.trainid"
                    v-bind:key="train.trainid"
                  >{{train.trainid}}</option>
                </select>
              </div>
              <div class="col col-md-2">
                <input
                  class="btn btn-success"
                  type="submit"
                  value="Grab"
                  @click="GrabTrainClicked(selectedTrain)"
                >
              </div>
              <div class="col col-md-2">
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
              @click="AddRouteRequest"
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
                <tr
                  v-for="routerequest in this.system.train_RouteRequestArray"
                  :key="routerequest.trainid"
                >
                  <td>{{ routerequest.trainid }}</td>
                  <td>{{ routerequest.startingsegment }}</td>
                  <td>{{ routerequest.endingsegment }}</td>
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
                  v-for="peripheral in this.system.train_PeripheralArray"
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
        <card header-text="Current State">{{this.system.trainCurrentState}}</card>
        <card header-text="Speed Control">
          <vue-slider :speedValue="speed">
            <h4 slot="subheading">Grabbed Train Name : {{this.system.driverProperties.trainID}}</h4>
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
                <v-icon large>{{ isPlaying ? 'mdi-stop' : 'mdi-play' }}</v-icon>
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
    <basix-modal v-show="showModal">
      <h4 slot="title">Grabbed Train Name :{{this.system.driverProperties.trainID}}</h4>

      <form @submit.prevent="handleSubmit">
        <card header-text="Route Request">
          <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-puzzle-piece"></i>
              </div>
              <select
                name="startingsegment"
                class="form-control"
                v-model="routerequest.startingsegment"
                v-validate="'required'"
                :class="{ 'is-invalid': submitted && errors.has('startingsegment') }"
              >
                <option value>Select Starting Segment</option>
                <option
                  v-for="segment in this.system.segment_Array"
                  v-bind:value="segment.segmentid"
                  v-bind:key="segment.segmentid"
                >{{segment.segmentid}}</option>
              </select>

              <div
                v-if="submitted && errors.has('startingsegment')"
                class="invalid-feedback"
              >{{ errors.first('startingsegment') }}</div>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-puzzle-piece"></i>
              </div>
              <select
                name="endingsegment"
                class="form-control"
                v-model="routerequest.endingsegment"
                v-validate="'required'"
                :class="{ 'is-invalid': submitted && errors.has('endingsegment') }"
              >
                <option value>Select Ending Segment</option>
                <option
                  v-for="segment in this.system.segment_Array"
                  v-bind:value="segment.segmentid"
                  v-bind:key="segment.segmentid"
                >{{segment.segmentid}}</option>
              </select>

              <div
                v-if="submitted && errors.has('endingsegment')"
                class="invalid-feedback"
              >{{ errors.first('endingsegment') }}</div>
            </div>
          </div>
        </card>
        <div class="form-actions form-group">
          <button type="submit" class="btn btn-primary btn-sm" @click="showModal = false">
            <i class="fa fa-dot-circle-o"></i> Submit
          </button>
          <button type="reset" class="btn btn-danger btn-sm" @click="showModal = false">
            <i class="fa fa-ban"></i> Close
          </button>
        </div>
      </form>
      <div slot="footer" v-show="false"></div>
    </basix-modal>
  </div>
  <!-- .animated -->
</template>

<script>
import Api from "../API";
import { mapState, mapActions } from "vuex";

export default {
  name: "driverboard",
  data() {
    return {
      routerequest: {
        startingsegment: "",
        endingsegment: ""
      },
      submitted: false,
      showModal: false,
      selectedTrain: null,

      speed: 0,
      interval: null,
      isPlaying: false
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
    },
    ...mapState({
      system: state => state.system,
      alert: state => state.alert
    })
  },
  created() {},
  mounted() {
    this.InitialSpeedValueLoad();
    this.GetTrainsArray();
    this.GetSegmentsArray();
    this.RequestForTrainState(this.system.driverProperties.trainID);
  },
  beforeDestroy() {
    clearInterval(this.system.RequestInterval);
  },
  methods: {
    ...mapActions("system", [
      "StartServer",
      "updateDriverProps",
      "GetTrainsArray",
      "GetSegmentsArray",
      "GetPeripheralsArray",
      "updateDriverPropsPostRelease",
      "updateTrainProps",
      "updatePeripheralState",
      "updateTrainState",
      "registerRouteRequest"
    ]),
    ...mapActions("alert", ["error", "clear"]),
    handleSubmit(e) {
      if (this.system.sessionID != 0) {
        if (this.system.driverProperties.grabID === -1)
          this.error("There is no train grabbed yet!");
        else {
          this.submitted = true;
          this.$validator.validate().then(valid => {
            if (valid) {
              this.registerRouteRequest({
                sessionid: this.system.sessionID,
                grabid: this.system.driverProperties.grabID,
                routerequest: this.routerequest
              });
            }
          });
        }
      } else {
        this.error("Server Session is not valid anymore!");
      }
    },
    /* Component Action starts*/
    InitialSpeedValueLoad() {
      if (
        Number.isNaN(this.system.trainProperties.train_Speed) ||
        this.system.trainProperties.train_Speed > 0
      ) {
        this.speed = this.system.trainProperties.train_Speed;
        this.isPlaying = this.system.trainProperties.train_IsPlaying;
      } else {
        this.speed = 0;
        this.isPlaying = false;
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
    ForceStop() {
      this.isPlaying = false;
      this.speed = 0;
      this.SetDCCSpeed(this.speed);
    },
    /* Component Action ends*/
    /* Method starts*/
    AddRouteRequest: function() {
      this.clear();
      if (this.system.driverProperties.trainID != null) this.showModal = true;
      else this.error("No train is grabbed yet!");
    },
    GrabTrainClicked: function(selection) {
      if (this.system.driverProperties.grabID === -1) {
        if (this.system.sessionID === 0) {
          this.StartServer();
        }
        this.updateDriverProps(selection);
        this.GetPeripheralsArray(selection);
        this.RequestForTrainState(selection);
      } else this.error("You can only grab one train!");
    },
    ReleaseTrain() {
      if (this.system.sessionID != 0) {
        if (this.system.driverProperties.grabID === -1)
          this.error("There is no train grabbed yet!");
        else {
          this.updateDriverPropsPostRelease({
            sessionid: this.system.sessionID,
            grabid: this.system.driverProperties.grabID
          });
          this.ForceStop();
        }
      } else {
        this.error("Server Session is not valid anymore!");
      }
    },
    SetDCCSpeed(spd) {
      if (this.system.sessionID != 0) {
        if (this.system.driverProperties.grabID === -1)
          this.error("There is no train grabbed yet!");
        else {
          this.updateTrainProps({
            sessionid: this.system.sessionID,
            grabid: this.system.driverProperties.grabID,
            speed: spd
          });
        }
      } else {
        this.error("Server Session is not valid anymore!");
      }
    },
    ChangePeripheralState(id, stateValue) {
      if (this.system.sessionID != 0) {
        if (this.system.driverProperties.grabID === -1)
          this.error("There is no train grabbed yet!");
        else {
          this.updatePeripheralState({
            sessionid: this.system.sessionID,
            grabid: this.system.driverProperties.grabID,
            peripheralid: id,
            peripheralstate: stateValue == "on" ? "off" : "on",
            trainid: this.system.driverProperties.trainID
          });
        }
      } else {
        this.error("Server Session is not valid anymore!");
      }
    },
    RequestForTrainState(trainid) {
      if (trainid != null) {
        this.updateTrainState(trainid);
        /*   this.system.RequestInterval = setInterval(() => {
          this.updateTrainState(trainid);
        }, 1000);*/
      }
    }
  }
};
</script>

<style>
</style>