const mongoose = require('mongoose')
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'pleade provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'pleade provide position'],
      maxlength: 20,
    },
    status: {
      type: String,
      enum: [true, 'interview', 'declind', 'pending'],
      defult: 'pending',
    },
    createdBy: {
      //將job和user綁定再一起，創建job後都會賦予一個用戶
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide user'],
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model('Job', JobSchema)
