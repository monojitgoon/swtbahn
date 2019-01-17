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
              <tr v-for="point in pointsArray" :key="point.pointid">
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
import Api from "../API";

export default {
  name: "setpoints",
  components: {},
  data() {
    return {
      testVal: null,
      pointsArray: []
    };
  },
  mounted() {
    this.GetPointList();
  },
  methods: {
    GetPointList() {
      // this.pointsArray = { "0": { pointid: "point1", state: "reverse" } };
      Api()
        .get("monitor/points")
        .then(response => {
          if (response.status == 200) {
            this.pointsArray = response.data;
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    ChangePointState(id, stateValue) {
      let formData = new FormData();
      formData.append("point", id);
      formData.append("state", stateValue == "normal" ? "reverse" : "reverse");

      Api()
        .post("controller/set-point", formData)
        .then(response => {
          if (response.status == 200) {
            this.GetPointList();
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>