<template>
  <div class="animated fadeIn">
    <div class="row">
      <!--/.col-->
      <div class="col-md-6 col-lg-3">
        <div class="card">
          <div class="p-0 clearfix">
            <i class="fa fa-train bg-info p-4 px-5 font-2xl mr-3 float-left text-light"></i>
            <div class="h5 text-info mb-0 pt-3">2</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs small">Active Trains</div>
          </div>
        </div>
      </div>
      <!--/.col-->
      <div class="col-md-6 col-lg-3">
        <div class="card">
          <div class="p-0 clearfix">
            <i class="fa fa-signal bg-primary p-4 px-5 font-2xl mr-3 float-left text-light"></i>
            <div class="h5 text-primary mb-0 pt-3">10</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs small">Active Signals</div>
          </div>
        </div>
      </div>
      <!--/.col-->
      <div class="col-md-6 col-lg-3">
        <div class="card">
          <div class="p-0 clearfix">
            <i class="fa fa-puzzle-piece bg-warning p-4 px-5 font-2xl mr-3 float-left text-light"></i>
            <div class="h5 text-warning mb-0 pt-3">29</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs small">Active Segments</div>
          </div>
        </div>
      </div>
      <!--/.col-->
      <div class="col-md-6 col-lg-3">
        <div class="card">
          <div class="p-0 clearfix">
            <i class="fa fa-location-arrow bg-danger p-4 px-5 font-2xl mr-3 float-left text-light"></i>
            <div class="h5 text-danger mb-0 pt-3">7</div>
            <div class="text-muted text-uppercase font-weight-bold font-xs small">Active Points</div>
          </div>
        </div>
      </div>
      <!--/.col-->
    </div>
  </div>
</template>

<script>
export default {
  name: "trackboard",
  components: {}
};
</script>

<style>
</style>