const userDetails = require("./userDetails/userDetails.service.js");
const transactions = require("./transactions/transactions.service.js");
const wallet = require("./wallet/wallet.service.js");
const promotions = require("./promotions/promotions.service.js");
const cart = require("./cart/cart.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(userDetails);
  app.configure(transactions);
  app.configure(wallet);
  app.configure(promotions);
  app.configure(cart);
    // ~cb-add-configure-service-name~
};
