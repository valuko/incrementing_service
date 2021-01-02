const mongoose = require('mongoose');

// connect to db
exports.connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(
        `MongoDB Connected: ${conn.connection.host}`,
    );

    return conn;
  } catch (err) {
    console.error('mongodb connection error: ', err.message);
    // Exit process with failure
    process.exit(1);
  }
};
