
    module.exports = function (app) {
        const modelName = "wallet";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            walletId: { type: Number, max: 10000000, comment: "wallet_Id, p_number, false, true, true, true, true, true, true, , , , ," },
userId: { type: Number, max: 10000000, comment: "user_Id, p_number, false, true, true, true, true, true, true, , , , ," },
balance: { type: Number, max: 10000000, comment: "balance, p_number, false, true, true, true, true, true, true, , , , ," },
transactionsType: { type:  String , comment: "transactions_Type, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };