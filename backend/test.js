import mongoose from 'mongoose';

// Replace this with your local MongoDB URI or remote URI
const mongoUri = 'mongodb+srv://fionagspencer:q7DFWxouFn2SfdNn@cluster0.9vzixga.mongodb.net/';

async function test() {
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully!');
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}

test();
