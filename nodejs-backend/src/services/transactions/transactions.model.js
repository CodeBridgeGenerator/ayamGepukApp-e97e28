
    module.exports = function (app) {
        const modelName = "transactions";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            orderHistory: { type:  String , comment: "order_History, p, false, true, true, true, true, true, true, , , , ," },
paymentMethod: { type:  String , maxLength: 150, index: true, trim: true, comment: "payment_Method, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };