// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI in .env.local");
// }

// const connectMongoDB = async () => {
//   try {
//     if (mongoose.connection.readyState >= 1) {
//       return;
//     }
//     await mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
// };

// export default connectMongoDB;


import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(" Please define the MONGODB_URI in .env.local");
}
export const GET = async () => {
  console.log("Logging out...");
  try {
      const response = NextResponse.json({ message: "Logout successful", success: true });

      // Clear token cookie
      response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

      return response;
  } catch (error) {
      console.error("Logout error:", error);
      return new Response("Something went wrong", { status: 500 });
  }
};

const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log(" MongoDB already connected.");
      return;
    }

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectMongoDB;
