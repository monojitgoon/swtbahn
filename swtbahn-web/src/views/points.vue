<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Points">
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td>Point name</td>
                <td>State</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="point in pointsArray" :key="point.pointid">
                <td>{{ point.pointid }}</td>
                <td>{{ point.state }}</td>
                <td></td>
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
  name: "points",
  components: {},
  data() {
    return {
      pointsArray: []
    };
  },
  mounted() {
    this.GetPointList();
  },
  methods: {
    GetPointList() {
      Api()
        .post("monitor/points")
        .then(response => {
          if (response.status == 200) {
            this.pointsArray = response.data;
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>