var socket = io();

var vm = new Vue({
  el: '#myMenu',
  data: {
    checkedItems: [],
    orderTitle: "Your order:",
    arbitraryVariableName: 'Pick a Burger!',
    menuItems: food,
    orders: {},
    orderId: "",
    count: 1,
    paymentMethods:"",
    customerInfo: [],
    gender: "",
    fullName: "",
    email: "",
    submitButton: false,
    coordinates: {x: -20, y: -20},
  },
  methods: {
    check: function(event){
    console.log(this.checkedItems)
  },
  addOrder: function(){
    this.submitButton = true

    this.customerInfo.push ({value: "Fullname: " + this.fullName})
    this.customerInfo.push ({value: "Email: " + this.email})
    this.customerInfo.push ({value: "Payment method: " + this.paymentMethods})
    this.customerInfo.push ({value: "Gender: " + this.gender})
    this.customerInfo.push ({value: "Order: " + this.checkedItems})

    socket.emit("addOrder", {orderId: this.count++,
    details: { x: this.coordinates.x
              ,y: this.coordinates.y },
    orderItems: this.checkedItems,
    customerInfo: [" Fullname: " + this.fullName, " Email: " + this.email,
                   " Payment method: " + this.paymentMethods,
                   " Gender: " + this.gender]

    });
  },

  displayOrder: function(event) {
    let offset = { x: event.currentTarget.getBoundingClientRect().left,
                   y: event.currentTarget.getBoundingClientRect().top}
    this.coordinates = { x: event.clientX-10-offset.x,
                         y: event.clientY-10-offset.y}
    },

  }
})
