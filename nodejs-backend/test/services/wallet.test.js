const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("wallet service", async () => {
  let thisService;
  let walletCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("wallet");

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
    assert.ok(thisService, "Registered the service (wallet)");
  });

  describe("#create", () => {
    const options = {"walletId":23,"userId":23,"balance":23,"transactionsType":"new value"};

    beforeEach(async () => {
      walletCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new wallet", () => {
      assert.strictEqual(walletCreated.walletId, options.walletId);
assert.strictEqual(walletCreated.userId, options.userId);
assert.strictEqual(walletCreated.balance, options.balance);
assert.strictEqual(walletCreated.transactionsType, options.transactionsType);
    });
  });

  describe("#get", () => {
    it("should retrieve a wallet by ID", async () => {
      const retrieved = await thisService.Model.findById(walletCreated._id);
      assert.strictEqual(retrieved._id.toString(), walletCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"walletId":100,"userId":100,"balance":100,"transactionsType":"updated value"};

    it("should update an existing wallet ", async () => {
      const walletUpdated = await thisService.Model.findByIdAndUpdate(
        walletCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(walletUpdated.walletId, options.walletId);
assert.strictEqual(walletUpdated.userId, options.userId);
assert.strictEqual(walletUpdated.balance, options.balance);
assert.strictEqual(walletUpdated.transactionsType, options.transactionsType);
    });
  });

  describe("#delete", async () => {
    it("should delete a wallet", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const walletDeleted = await thisService.Model.findByIdAndDelete(walletCreated._id);
      assert.strictEqual(walletDeleted._id.toString(), walletCreated._id.toString());
    });
  });
});