function createCart() {
  let items = [];
  let productId = 1;

  return {
    totalItems: 0,
    discount: 0,

    coupons: {
      save10: 0.10,
      save20: 0.20,
      save50: 0.50,
    },

    addItems: function (productName, price, quantity) {
      if (productName === "" && price === "") {
        console.log("Empty Product Field. Try Adding Products.");
        return;
      }
      items.push({ ProductID: productId++, name: productName, price: price, Quantity: quantity });
      this.totalItems++;
      console.log(`${productName} Added successfully.`)
    },
    removeItems: function (productId) {
      const index = items.findIndex(item => item.ProductID === productId);
      if (index === -1) {
        console.log("Product Not Found!!");
        return;
      };
      console.log(`${items[index].name} Removed Successfully.`)
      items.splice(index, 1);
      this.totalItems--;

    },

    updateQuantity: function (productId, quantity) {
      const product = items.findIndex(item => item.ProductID === productId);
      if (product === -1) {
        console.log("Product Not Found!!");
        return;
      };
      if (items[product].Quantity === 0) {
        console.log("Invalid Quantity");
      }
      const oldCount = items[product].Quantity;
      items[product].Quantity = quantity;
      this.totalItems += items[product].Quantity - oldCount;
    },
    getSubTotal: function () {
      return items.reduce((total, item) => {
        return total + item.price * item.Quantity;
      }, 0);
    },
    applyCoupon: function (couponCode) {
      let appliedCoupons = this.coupons[couponCode];
      if (!appliedCoupons) {
        console.log("Coupon code doesn't exists!");
        return;
      }
      this.discount = this.getSubTotal() * appliedCoupons;
      return this.discount;
    },
    getTotal: function () {
      let total = this.getSubTotal() - this.discount;
      return total;
    },
    getItems: function () {
      console.log(`Total Items in Cart: ${this.totalItems}`);
      return items.map(item => ({ ...item }));
    }
  }
}

const cart = createCart();
cart.addItems("Monitor", 14000, 1);
cart.addItems("Keyboard", 1000, 1);
console.log(cart.getItems());

// cart.removeItems(1);
cart.updateQuantity(1,10);
console.log(`Sub Total Amount: ${cart.getSubTotal()}`)
console.log(`Discount: ${cart.applyCoupon("save20")}`);
console.log(`Total: ${cart.getTotal()}`);

console.log(cart.getItems());

// const products = cart.getItems();

// products[0].price = 1;

// console.log(products)
