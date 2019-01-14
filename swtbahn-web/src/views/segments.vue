<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Segments">
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td>Segement Name</td>
                <td>Occupied</td>
                <td>Trains</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="segment in segmentsArray" :key="segment.segmentid">
                <td>{{ segment.segmentid }}</td>
                <td>{{ segment.occupied }}</td>
                <td>{{ segment.trains }}</td>
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
  name: "segments",
  components: {},
  data() {
    return {
      segmentsArray: []
    };
  },
  mounted() {
    this.GetSegmentsList();
  },
  methods: {
    GetSegmentsList() {
      Api()
        .get("monitor/segments")
        .then(response => {
          if (response.status == 200) {
            this.segmentsArray = response.data;
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>
