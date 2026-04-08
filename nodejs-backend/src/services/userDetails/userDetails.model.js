
    module.exports = function (app) {
        const modelName = "user_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
userId: { type: Number, max: 10000000, comment: "user_Id, p_number, false, true, true, true, true, true, true, , , , ," },
phoneNumber: { type: Number, max: 10000000, comment: "phone_Number, p_number, false, true, true, true, true, true, true, , , , ," },
email: { type:  String , comment: "Email, p, false, true, true, true, true, true, true, , , , ," },
passwordHash: { type:  String , maxLength: 150, index: true, trim: true, comment: "password_hash, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };