<template>
  <div class="col-xs-12 col-md-12">
    <card header-text="Trackboard">
      <input class="btn btn-success" type="submit" value="Start SVG" @click="Svghandler">
      <div class="card-body card-block">
        <svg
          id="track-master"
          viewBox="0 0 700 300"
          style="border: black solid; border-style: dotted"
        >
          <marker
            id="triangle"
            viewBox="0 0 10 10"
            refX="1"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="3"
            markerHeight="3"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f00"></path>
          </marker>
          <defs>
            <circle id="circleid" cx="10" cy="10" r="10"></circle>
          </defs>
          <g>
            <!-- vertical -->
            <path stroke="green" stroke-width=".2" d="M10 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M10 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M20 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M30 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M40 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M50 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M60 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M70 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M80 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M90 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M100 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M110 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M120 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M130 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M140 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M150 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M160 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M170 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M180 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M190 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M200 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M210 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M220 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M230 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M240 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M250 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M260 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M270 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M280 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M290 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M300 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M310 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M320 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M330 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M340 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M350 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M360 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M370 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M380 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M390 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M400 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M410 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M420 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M430 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M440 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M450 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M460 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M470 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M480 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M490 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M500 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M510 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M520 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M530 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M540 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M550 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M560 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M570 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M580 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M590 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M600 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M610 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M620 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M630 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M640 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M650 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M660 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M670 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M680 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M690 0 V300"></path>
            <path stroke="green" stroke-width=".2" d="M700 0 V300"></path>

            <!-- horizontal -->
            <path stroke="green" stroke-width=".2" d="M0 10 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 20 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 30 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 40 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 50 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 60 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 70 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 80 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 90 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 100 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 110 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 120 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 130 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 140 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 150 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 160 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 170 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 180 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 190 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 200 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 210 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 220 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 230 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 240 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 250 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 260 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 270 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 280 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 290 H700"></path>
            <path stroke="green" stroke-width=".2" d="M0 300 H700"></path>
          </g>

          <!-- Track -->
          <path
            id="seg10"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
            d="M150 280 H150 C150 280 -80 160 150 20  H220 "
            marker-end="url(#triangle)"
          ></path>

          <path
            id="seg9"
            stroke="black"
            stroke-width="3"
            fill="none"
            d="M220 20 H280"
            marker-end="url(#triangle)"
          ></path>
          <path
            id="seg8"
            stroke="black"
            stroke-width="3"
            fill="none"
            d="M280 20 H340"
            marker-end="url(#triangle)"
          ></path>
          <path
            id="seg7"
            stroke="black"
            stroke-width="3"
            fill="none"
            d="M340 20 H400"
            marker-end="url(#triangle)"
          ></path>

          <path
            id="seg6"
            stroke="black"
            stroke-width="3"
            fill="none"
            d="M400 20 H540 C540 20 640 50 650 80"
            marker-end="url(#triangle)"
          ></path>

          <path
            id="seg5"
            stroke="black"
            stroke-width="3"
            fill="none"
            d="M650 80 C650 80 655 80 660 120"
            marker-end="url(#triangle)"
          ></path>
          <path
            id="seg5"
            stroke="black"
            stroke-width="3"
            fill="none"
            d="M650 80 C650 80 655 80 660 120"
            marker-end="url(#triangle)"
          ></path>
          <path
            id="seg4"
            stroke="black"
            stroke-width="3"
            fill="none"
            d="M660 120 C660 120 660 180 640 200"
            marker-end="url(#triangle)"
          ></path>
          <path
            id="seg3"
            stroke="black"
            stroke-width="3"
            fill="none"
            d="M640 200 C640 200 660 200 600 270"
            marker-end="url(#triangle)"
          ></path>
        </svg>
      </div>
    </card>
  </div>
</template>

<script>
export default {
  name: "trackpanel",
  components: {},
  methods: {
    Svghandler() {
      var seg = document.getElementById("seg10").getAttribute("d");
      var canvas = SVG("track-master"),
        trainobj = canvas.image("../favicon.ico", 20, 20),
        path = canvas.path(seg),
        length = path.length();

      path.fill("none").stroke({ width: 1, color: "#ccc" });

      trainobj
        .animate(5000, ">")
        .during(function(pos, morph, eased) {
          var p = path.pointAt(eased * length);
          trainobj.center(p.x - 10, p.y - 10);
        })
        .once(true);
    }
  }
};
</script>
