<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Points">
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td>ID</td>
                <td>Status(Normal/Reverse)</td>
                <td>Change Point State</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="point in this.monitor.pointArray" :key="point.pointid">
                <td>{{ point.pointid }}</td>
                <td>{{ point.state }}</td>
                <td>
                  <input
                    class="btn btn-success"
                    type="submit"
                    value="Toggle State"
                    @click="ChangePointState(point.pointid,point.state)"
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import appConfig from "../../config/appConfig";

export default {
  name: "setpoints",
  components: {},
  computed: {
    ...mapState({
      monitor: state => state.monitor,
      controller: state => state.controller
    })
  },
  mounted() {
    this.GetPointsArray();
    this.controller.controllerRequestInterval = setInterval(() => {
      this.GetPointsArray();
    }, appConfig.controller_set_point_RequestInterval);
  },
  beforeDestroy() {
    clearInterval(this.controller.controllerRequestInterval);
  },
  methods: {
    ...mapActions("monitor", ["GetPointsArray"]),
    ...mapActions("controller", ["SetPointState"]),
    ChangePointState(id, stateValue) {
      this.SetPointState({
        pointid: id,
        state: stateValue == "normal" ? "reverse" : "reverse"
      });
    }
  }
};
</script>