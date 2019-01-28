webpackJsonp([0],{248:function(t,e,s){"use strict";var r=s(80),a=s.n(r);e.a=function(){return a.a.create({baseURL:"http://localhost:2048/",withCredentials:!1,headers:{"Content-Type":"text"}})}},249:function(t,e,s){"use strict";var r=s(15),a=s.n(r),o=s(264),d=(s(248),s(22));e.a={name:"trackboard",components:{Trackpanel:o.a},data:function(){return{pointsArray:[],signalsArray:[],segmentsArray:[]}},mounted:function(){},created:function(){},computed:a()({},Object(d.c)({system:function(t){return t.system},alert:function(t){return t.alert}})),methods:a()({},Object(d.b)("system",["StartServer","StopServer","GetTrainsArray","GetPointsArray","GetSegmentsArray","GetSignalsArray"]),{LoadStatistics:function(){this.GetTrainsArray(),this.GetSignalsArray(),this.GetSegmentsArray(),this.GetPointsArray()},SwitchServer:function(t){1==t?0===this.system.sessionID&&(this.StartServer(),this.LoadStatistics()):this.StopServer()}})}},250:function(t,e,s){"use strict";e.a={name:"trackpanel",components:{}}},262:function(t,e,s){var r=s(263);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);s(6)("470032b2",r,!0,{})},263:function(t,e,s){e=t.exports=s(1)(!1),e.push([t.i,"",""])},264:function(t,e,s){"use strict";var r=s(250),a=s(265),o=s(0),d=o(r.a,a.a,!1,null,null,null);e.a=d.exports},265:function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-xs-12 col-md-12"},[s("card",{attrs:{"header-text":"Trackboard"}},[s("div",{staticClass:"card-body card-block"},[s("svg",{staticStyle:{border:"black solid","border-style":"dotted"},attrs:{viewBox:"0 0 700 300"}},[t._v(">\n        "),s("g",[s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M10 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M10 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M20 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M30 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M40 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M50 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M60 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M70 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M80 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M90 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M100 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M110 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M120 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M130 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M140 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M150 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M150 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M160 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M170 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M180 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M190 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M200 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M210 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M220 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M230 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M240 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M250 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M260 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M270 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M280 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M290 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M300 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M310 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M320 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M330 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M340 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M350 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M360 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M370 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M380 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M390 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M400 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M410 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M420 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M430 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M440 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M450 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M460 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M470 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M480 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M490 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M500 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M510 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M520 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M530 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M540 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M550 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M560 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M570 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M580 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M590 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M600 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M610 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M620 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M630 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M640 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M650 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M660 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M670 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M680 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M690 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M700 0 V300"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 10 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 20 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 30 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 40 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 50 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 60 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 70 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 80 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 90 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 100 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 110 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 120 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 130 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 140 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 150 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 160 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 170 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 180 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 190 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 200 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 210 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 220 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 230 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 240 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 250 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 260 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 270 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 280 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 290 H700"}}),t._v(" "),s("path",{attrs:{stroke:"green","stroke-width":".2",d:"M0 300 H700"}}),t._v(" "),s("path",{attrs:{stroke:"black","stroke-width":"1",fill:"none",d:"M250 20 H100 V0"}}),t._v(" "),s("path",{attrs:{stroke:"black","stroke-width":"1",fill:"none",d:"M250 20 H100 V0 L60 20"}})])])])])],1)},a=[],o={render:r,staticRenderFns:a};e.a=o},266:function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"animated fadeIn"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"clearfix"},[s("i",{staticClass:"fa fa-train bg-info p-3 font-2xl mr-3 float-left text-light"}),t._v(" "),s("div",{staticClass:"h5 text-secondary mb-0 mt-1"},[t._v(t._s(Object.keys(this.system.train_Array).length))]),t._v(" "),s("div",{staticClass:"text-muted text-uppercase font-weight-bold font-xs small"},[t._v("Active trains")])])])])]),t._v(" "),s("div",{staticClass:"col"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"clearfix"},[s("i",{staticClass:"fa fa-signal bg-primary p-3 font-2xl mr-3 float-left text-light"}),t._v(" "),s("div",{staticClass:"h5 text-secondary mb-0 mt-1"},[t._v(t._s(Object.keys(this.system.signal_Array).length))]),t._v(" "),s("div",{staticClass:"text-muted text-uppercase font-weight-bold font-xs small"},[t._v("Signals")])])])])]),t._v(" "),s("div",{staticClass:"col"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"clearfix"},[s("i",{staticClass:"fa fa-puzzle-piece bg-warning p-3 font-2xl mr-3 float-left text-light"}),t._v(" "),s("div",{staticClass:"h5 text-secondary mb-0 mt-1"},[t._v(t._s(Object.keys(this.system.segment_Array).length))]),t._v(" "),s("div",{staticClass:"text-muted text-uppercase font-weight-bold font-xs small"},[t._v("Segments")])])])])]),t._v(" "),s("div",{staticClass:"col"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"clearfix"},[s("i",{staticClass:"fa fa-location-arrow bg-danger p-3 font-2xl mr-3 float-left text-light"}),t._v(" "),s("div",{staticClass:"h5 text-secondary mb-0 mt-1"},[t._v(t._s(Object.keys(this.system.point_Array).length))]),t._v(" "),s("div",{staticClass:"text-muted text-uppercase font-weight-bold font-xs small"},[t._v("Points")])])])])]),t._v(" "),s("div",{staticClass:"col"},[s("section",{staticClass:"card"},[s("div",{staticClass:"card-body text-secondary"},[s("span",[t._v(t._s(t.alert.message))]),t._v(" "),s("br"),t._v(" "),s("input",{staticClass:"btn btn-success",attrs:{type:"submit",disabled:0!=this.system.sessionID,value:"Start"},on:{click:function(e){t.SwitchServer(!0)}}}),t._v(" "),s("input",{staticClass:"btn btn-danger",attrs:{type:"submit",disabled:0==this.system.sessionID,value:"Stop"},on:{click:function(e){t.SwitchServer(!1)}}})])])])]),t._v(" "),s("div",{staticClass:"row"},[s("Trackpanel")],1)])},a=[],o={render:r,staticRenderFns:a};e.a=o},81:function(t,e,s){"use strict";function r(t){s(262)}Object.defineProperty(e,"__esModule",{value:!0});var a=s(249),o=s(266),d=s(0),i=r,n=d(a.a,o.a,!1,i,null,null);e.default=n.exports}});
//# sourceMappingURL=0.build.js.map