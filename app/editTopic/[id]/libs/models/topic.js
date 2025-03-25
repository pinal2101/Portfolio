// import mongoose from "mongoose";

// const TopicSchema = new mongoose.Schema({
//   projectname: { type: String, required: true },
//   websitelink: { type: String, required: true },
//   technology: { type: String, required: true },
//   description: { type: String, required: true },
//   pagebuilder: { type: String, required: true },
//   clientname: { type: String, required: true },
//   clientinvoices: [{ type: String }], // Array of strings for multiple invoices
//   bidplatform: { type: String, required: true },
//   bidplatformURL: { type: String, required: true },
//   invoiceamount: { type: Number, required: true },
//   projectstartdate: { type: Date, required: true },
//   completiondate: { type: Date, required: true },
//   testimonials: { type: String }
// });

// export default mongoose.models.Topic || mongoose.model("Topic", TopicSchema);


// import mongoose from "mongoose";

// const TopicSchema = new mongoose.Schema({
//   projectname: String,
//   websitelink: String,
//   technology: String,
//   description: String,
//   pagebuilder: String,
//   clientname: String,
//   clientinvoices: String,
//   bidplatform: String,
//   bidplatformURL: String,
//   invoiceamount: Number,
//   projectstartdate: Date,
//   completiondate: Date,
//   testimonials: String,
// });

// const Topic = mongoose.models.Topic || mongoose.model("Topic", TopicSchema);

// export default Topic;

import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  projectname: { type: String, required: true },
  websitelink: { type: String },
  technology: { type: String },
  description: { type: String },
  pagebuilder: { type: String },
  clientname: { type: String },
  clientinvoices: { type: [String] }, // ✅ Changed from String to Array of Strings
  bidplatform: { type: String },
  bidplatformURL: { type: String },
  invoiceamount: { type: Number },
  projectstartdate: { type: Date },
  completiondate: { type: Date },
  testimonials: { type: String },
}, { timestamps: true });

const Topic = mongoose.models.Topic || mongoose.model("Topic", TopicSchema);

export default Topic;
