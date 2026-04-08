
    module.exports = function (app) {
        const modelName = "cart";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            cartId: { type:  String , comment: "cart_Id, p, false, true, true, true, true, true, true, , , , ," },
userId: { type:  String , comment: "user_Id, p, false, true, true, true, true, true, true, , , , ," },
productId: { type:  String , comment: "product_Id, p, false, true, true, true, true, true, true, , , , ," },
quantity: { type: Number, max: 10000000, comment: "quantity, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };