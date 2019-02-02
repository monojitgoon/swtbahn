<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Trains">
        <div class="card-body card-block">
          <table class="table table-hover">
            <thead>
              <tr>
                <td>Train Name</td>
                <td>Grab Status</td>
                <td>Details</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="train in this.monitor.trainArray" :key="train.trainid">
                <td>{{ train.trainid }}</td>
                <td>{{ train.grabbed }}</td>
                <td>
                  <button
                    id="show-modal"
                    type="button"
                    class="btn btn-secondary mb-1"
                    @click="GetTrainStatus(train.trainid)"
                  >Details</button>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
    <basix-modal v-show="showModal">
      <h4 slot="title">{{trainname}}</h4>
      <aside class="profile-nav alt">
        <section class="card">
          <ul
            class="list-group list-group-flush"
            v-for="trainState in this.monitor.trainstateArray"
            v-bind:value="trainState.ontrack"
            v-bind:key="trainState.ontrack"
          >
            <li class="list-group-item">
              <a href="#">
                <i class="fa fa-train"></i> Currently OnTrack
                <span
                  class="badge badge-primary pull-right"
                >{{trainState.ontrack}}</span>
              </a>
            </li>
            <li class="list-group-item">
              <a href="#">
                <i class="fa fa-train"></i> Current Direction
                <span
                  class="badge badge-danger pull-right"
                >{{trainState.direction}}</span>
              </a>
            </li>
            <li class="list-group-item">
              <a href="#">
                <i class="fa fa-train"></i> Current Speed
                <span class="badge badge-success pull-right">{{trainState.dccspeed}}</span>
              </a>
            </li>
          </ul>
        </section>
      </aside>
      <div slot="footer">
        <button class="btn btn-primary" @click="showModal = false">Close</button>
      </div>
    </basix-modal>
  </div>
</template>



<script>
import { mapState, mapActions } from "vuex";
import appConfig from "../../config/appConfig";

export default {
  name: "trains",
  components: {},
  data() {
    return {
      showModal: false,
      trainname: null
    };
  },
  computed: {
    ...mapState({
      monitor: state => state.monitor
    })
  },
  mounted() {
    this.GetTrainsArray();
    this.monitor.monitorRequestInterval = setInterval(() => {
      this.GetTrainsArray();
    }, appConfig.monitor_train_RequestInterval);
  },
  created() {},
  beforeDestroy() {
    clearInterval(this.monitor.monitorRequestInterval);
  },
  methods: {
    ...mapActions("monitor", ["GetTrainsArray", "GetTrainStateArray"]),
    GetTrainStatus: function(id) {
      this.trainname = id;
      this.GetTrainStateArray(id);
      this.showModal = true;
    }
  }
};
</script>