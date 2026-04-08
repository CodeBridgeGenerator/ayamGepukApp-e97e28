
    module.exports = function (app) {
        const modelName = "promotions";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            discountType: { type:  String , comment: "Discount_Type, p, false, true, true, true, true, true, true, , , , ," },
couponId: { type: Number, max: 10000000, comment: "coupon_Id, p_number, false, true, true, true, true, true, true, , , , ," },
expiryDate: { type: Date, comment: "expiry_Date, p_date, false, true, true, true, true, true, true, , , , ," },
code: { type: Number, max: 10000000, comment: "Code, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };