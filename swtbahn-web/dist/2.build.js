webpackJsonp([2],{251:function(e,t,s){e.exports=s.p+"loading.gif?05cbe287d6c1384a47f3264bcdab62c4"},264:function(e,t,s){"use strict";var r=s(15),a=s.n(r),i=s(22);t.a={name:"Register",data:function(){return{user:{username:"",password:"",userType:""},submitted:!1,userTypeArray:["Driver","Monitor","Stellwerk"]}},computed:a()({},Object(i.c)("account",["status"]),Object(i.c)({alert:function(e){return e.alert}})),methods:a()({},Object(i.b)("account",["register"]),{handleSubmit:function(e){var t=this;this.submitted=!0,this.$validator.validate().then(function(e){e&&t.register(t.user)})}})}},287:function(e,t,s){var r=s(288);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);s(6)("1f536b40",r,!0,{})},288:function(e,t,s){t=e.exports=s(1)(!1),t.push([e.i,".register{width:21.375rem}.register h2{text-align:center}.register .down-container{margin-top:2.6875rem}",""])},289:function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"register"},[r("card",{attrs:{"header-text":"Create User"}},[r("form",{on:{submit:function(t){return t.preventDefault(),e.handleSubmit(t)}}},[e.alert.message?r("div",{class:"alert "+e.alert.type},[e._v(e._s(e.alert.message))]):e._e(),e._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"input-group"},[r("div",{staticClass:"input-group-addon"},[r("i",{staticClass:"fa fa-user"})]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.username,expression:"user.username"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",class:{"is-invalid":e.submitted&&e.errors.has("username")},attrs:{type:"text",name:"username",placeholder:"username"},domProps:{value:e.user.username},on:{input:function(t){t.target.composing||e.$set(e.user,"username",t.target.value)}}}),e._v(" "),e.submitted&&e.errors.has("username")?r("div",{staticClass:"invalid-feedback"},[e._v(e._s(e.errors.first("username")))]):e._e()])]),e._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"input-group"},[r("div",{staticClass:"input-group-addon"},[r("i",{staticClass:"fa fa-key"})]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"},{name:"validate",rawName:"v-validate",value:{required:!0,min:6},expression:"{ required: true, min: 6 }"}],staticClass:"form-control",class:{"is-invalid":e.submitted&&e.errors.has("password")},attrs:{type:"password",name:"password",placeholder:"password"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}}),e._v(" "),e.submitted&&e.errors.has("password")?r("div",{staticClass:"invalid-feedback"},[e._v(e._s(e.errors.first("password")))]):e._e()])]),e._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"input-group"},[r("div",{staticClass:"input-group-addon"},[r("i",{staticClass:"fa fa-user-circle"})]),e._v(" "),r("select",{directives:[{name:"model",rawName:"v-model",value:e.user.userType,expression:"user.userType"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",class:{"is-invalid":e.submitted&&e.errors.has("userType")},attrs:{name:"userType"},on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.user,"userType",t.target.multiple?s:s[0])}}},[r("option",{attrs:{value:""}},[e._v("Select a user type")]),e._v(" "),e._l(e.userTypeArray,function(t){return r("option",{key:t,domProps:{value:t}},[e._v(e._s(t))])})],2),e._v(" "),e.submitted&&e.errors.has("userType")?r("div",{staticClass:"invalid-feedback"},[e._v(e._s(e.errors.first("userType")))]):e._e()])]),e._v(" "),r("div",{staticClass:"form-actions form-group"},[r("button",{staticClass:"btn btn-success btn-md",attrs:{type:"submit",disabled:e.status.registering}},[e._v("Sign Up")]),e._v(" "),r("img",{directives:[{name:"show",rawName:"v-show",value:e.status.registering,expression:"status.registering"}],staticStyle:{height:"20px",width:"20px"},attrs:{src:s(251)}}),e._v(" "),r("button",{staticClass:"btn btn-primary btn-md float-right",attrs:{type:"submit"}},[r("router-link",{staticClass:"link text-light float-right",attrs:{to:{name:"login"}}},[e._v("Already joined?")])],1)])])])],1)},a=[],i={render:r,staticRenderFns:a};t.a=i},95:function(e,t,s){"use strict";function r(e){s(287)}Object.defineProperty(t,"__esModule",{value:!0});var a=s(264),i=s(289),n=s(0),u=r,o=n(a.a,i.a,!1,u,null,null);t.default=o.exports}});
//# sourceMappingURL=2.build.js.map