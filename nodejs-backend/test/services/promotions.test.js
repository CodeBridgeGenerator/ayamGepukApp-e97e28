const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("promotions service", async () => {
  let thisService;
  let promotionCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("promotions");

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
    assert.ok(thisService, "Registered the service (promotions)");
  });

  describe("#create", () => {
    const options = {"discountType":"new value","couponId":23,"expiryDate":"2026-04-08T08:25:31.828Z","code":23};

    beforeEach(async () => {
      promotionCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new promotion", () => {
      assert.strictEqual(promotionCreated.discountType, options.discountType);
assert.strictEqual(promotionCreated.couponId, options.couponId);
assert.strictEqual(promotionCreated.expiryDate.toISOString(), options.expiryDate);
assert.strictEqual(promotionCreated.code, options.code);
    });
  });

  describe("#get", () => {
    it("should retrieve a promotion by ID", async () => {
      const retrieved = await thisService.Model.findById(promotionCreated._id);
      assert.strictEqual(retrieved._id.toString(), promotionCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"discountType":"updated value","couponId":100,"expiryDate":"2026-04-08T08:25:31.828Z","code":100};

    it("should update an existing promotion ", async () => {
      const promotionUpdated = await thisService.Model.findByIdAndUpdate(
        promotionCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(promotionUpdated.discountType, options.discountType);
assert.strictEqual(promotionUpdated.couponId, options.couponId);
assert.strictEqual(promotionUpdated.expiryDate.toISOString(), options.expiryDate);
assert.strictEqual(promotionUpdated.code, options.code);
    });
  });

  describe("#delete", async () => {
    it("should delete a promotion", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const promotionDeleted = await thisService.Model.findByIdAndDelete(promotionCreated._id);
      assert.strictEqual(promotionDeleted._id.toString(), promotionCreated._id.toString());
    });
  });
});