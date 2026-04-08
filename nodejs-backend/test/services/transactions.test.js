const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("transactions service", async () => {
  let thisService;
  let transactionCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("transactions");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (transactions)");
  });

  describe("#create", () => {
    const options = {"orderHistory":"new value","paymentMethod":"new value"};

    beforeEach(async () => {
      transactionCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new transaction", () => {
      assert.strictEqual(transactionCreated.orderHistory, options.orderHistory);
assert.strictEqual(transactionCreated.paymentMethod, options.paymentMethod);
    });
  });

  describe("#get", () => {
    it("should retrieve a transaction by ID", async () => {
      const retrieved = await thisService.Model.findById(transactionCreated._id);
      assert.strictEqual(retrieved._id.toString(), transactionCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"orderHistory":"updated value","paymentMethod":"updated value"};

    it("should update an existing transaction ", async () => {
      const transactionUpdated = await thisService.Model.findByIdAndUpdate(
        transactionCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(transactionUpdated.orderHistory, options.orderHistory);
assert.strictEqual(transactionUpdated.paymentMethod, options.paymentMethod);
    });
  });

  describe("#delete", async () => {
    it("should delete a transaction", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const transactionDeleted = await thisService.Model.findByIdAndDelete(transactionCreated._id);
      assert.strictEqual(transactionDeleted._id.toString(), transactionCreated._id.toString());
    });
  });
});