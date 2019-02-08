export default {
  items: [
    {
      name: "Trackboard",
      url: "/trackboard",
      icon: "fa fa-road"
    },
    {
      title: true,
      name: "User Options",
      class: "",
      wrapper: {
        element: "",
        attributes: {}
      }
    },

    {
      name: "Monitor",
      url: "/",
      icon: "fa fa-eye",
      children: [
        {
          name: "Trains",
          url: "/trains",
          icon: "fa fa-train"
        },
        {
          name: "Signals",
          url: "/signals",
          icon: "fa fa-signal"
        },
        {
          name: "Segments",
          url: "/segments",
          icon: "fa fa-puzzle-piece"
        },
        {
          name: "Points",
          url: "/points",
          icon: "fa fa-location-arrow"
        }
      ]
    },
    {
      name: "Driver",
      url: "/",
      icon: "fa fa-train",
      children: [
        {
          name: "DriverBoard",
          url: "/driverboard",
          icon: "fa fa-train"
        }
      ]
    },
    {
      name: "Stellwerk",
      url: "/",
      icon: "fa fa-compass",
      children: [
        {
          name: "Routing Table",
          url: "/routingtable",
          icon: "fa fa-compass"
        },
        {
          name: "Route Requests",
          url: "/routerequests",
          icon: "fa fa-compass"
        },
        {
          name: "Set Points",
          url: "/setpoints",
          icon: "fa fa-location-arrow"
        },
        {
          name: "Set Signals",
          url: "/setsignals",
          icon: "fa fa-signal"
        }
      ]
    },
    {
      divider: true
    },
    {
      title: true,
      name: "Administritive"
    },
    {
      name: "Users",
      url: "/users",
      icon: "fa fa-users"
    }
  ]
};
