webpackJsonp([9],{259:function(t,e,n){"use strict";var r=n(15),o=n.n(r),s=n(22),i=n(40),a=n.n(i);e.a={name:"setpoints",components:{},computed:o()({},Object(s.c)({monitor:function(t){return t.monitor},controller:function(t){return t.controller}})),mounted:function(){var t=this;this.GetPointsArray(),this.controller.controllerRequestInterval=setInterval(function(){t.GetPointsArray()},a.a.controller_set_point_RequestInterval)},beforeDestroy:function(){clearInterval(this.controller.controllerRequestInterval)},methods:o()({},Object(s.b)("monitor",["GetPointsArray"]),Object(s.b)("controller",["SetPointState"]),{ChangePointState:function(t,e){this.SetPointState({pointid:t,state:"reverse"})}})}},284:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row"},[n("div",{staticClass:"col-xs-12 col-md-12"},[n("card",{attrs:{"header-text":"Points"}},[n("div",{staticClass:"table-responsive"},[n("table",{staticClass:"table table-striped first-td-padding"},[n("thead",[n("tr",[n("td",[t._v("ID")]),t._v(" "),n("td",[t._v("Status(Normal/Reverse)")]),t._v(" "),n("td",[t._v("Change Point State")])])]),t._v(" "),n("tbody",t._l(this.monitor.pointArray,function(e){return n("tr",{key:e.pointid},[n("td",[t._v(t._s(e.pointid))]),t._v(" "),n("td",[t._v(t._s(e.state))]),t._v(" "),n("td",[n("input",{staticClass:"btn btn-success",attrs:{type:"submit",value:"Toggle State"},on:{click:function(n){t.ChangePointState(e.pointid,e.state)}}})])])}),0)])])])],1)])},o=[],s={render:r,staticRenderFns:o};e.a=s},90:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(259),o=n(284),s=n(0),i=s(r.a,o.a,!1,null,null,null);e.default=i.exports}});
//# sourceMappingURL=9.build.js.map