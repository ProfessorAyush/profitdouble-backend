import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  items: [{
    productId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    size: {
      height: Number,
      width: Number,
      depth: Number
    }
    // NO user field here!
  }],
  totalAmount: { 
    type: Number, 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, {
  timestamps: true
});

const Bill = mongoose.model('Bill', billSchema);

export default Bill;