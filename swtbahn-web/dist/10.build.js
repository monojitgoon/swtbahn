webpackJsonp([10],{268:function(t,e,s){"use strict";var n=s(15),a=s.n(n),r=s(22);e.a={name:"routingtable",data:function(){return{search:"",headers:[{text:"Start Segment",value:"startseg"},{text:"End Segment",value:"endseg"},{text:"Path",value:"path"},{text:"Points",value:"points"},{text:"Signals",value:"signals"},{text:"Conflicts",value:"conflicts"}]}},components:{},computed:a()({},Object(r.c)({controller:function(t){return t.controller}})),mounted:function(){this.GetRoutingTable()},methods:a()({},Object(r.b)("controller",["GetRoutingTable"]))}},290:function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",{attrs:{id:"inspire"}},[s("v-card",[s("v-card-title",[t._v("Routing Table\n      "),s("v-spacer"),t._v(" "),s("v-text-field",{attrs:{label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),s("v-data-table",{attrs:{headers:t.headers,items:this.controller.routingTable,search:t.search},scopedSlots:t._u([{key:"items",fn:function(e){return[s("td",[t._v(t._s(e.item.startseg))]),t._v(" "),s("td",[t._v(t._s(e.item.endseg))]),t._v(" "),s("td",[t._v(t._s(e.item.path))]),t._v(" "),s("td",[t._v(t._s(e.item.points))]),t._v(" "),s("td",[t._v(t._s(e.item.signals))]),t._v(" "),s("td",[t._v(t._s(e.item.conflicts))])]}}])},[s("v-alert",{attrs:{slot:"no-results",value:!0,color:"error",icon:"warning"},slot:"no-results"},[t._v('Your search for "'+t._s(t.search)+'" found no results.')])],1)],1)],1)},a=[],r={render:n,staticRenderFns:a};e.a=r},95:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(268),a=s(290),r=s(0),l=r(n.a,a.a,!1,null,null,null);e.default=l.exports}});
//# sourceMappingURL=10.build.js.map