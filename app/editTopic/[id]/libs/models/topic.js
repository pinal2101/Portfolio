// import mongoose from "mongoose";

// const topicSchema = new mongoose.Schema({
//   projectname: String,
//   websitelink: String,
//   technology: [String], //  Fix: make this an array
//   tag: [ string],
//   category: [ string],
//   description: String,
//   pagebuilder: [String], //  Also array
//   clientname: String,
//   clientinvoices: [String], //  Array of invoice URLs
//   bidplatform: String,
//   bidplatformURL: String,
//   invoiceamount: Number,
//   projectstartdate: Date,
//   completiondate: Date,
//   testimonials: String,
// });

// const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

// export default Topic;

import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  projectname: String,
  websitelink: String,
  technology: [String], // Fix: Array of Strings
  tag: [String], // Fix: Array of Strings
  category: [String], // Fix: Array of Strings
  description: String,
  pagebuilder: [String], // Also array
  clientname: String,
  clientinvoices: [String], // Array of invoice URLs
  bidplatform: String,
  bidplatformURL: String,
  invoiceamount: Number,
  projectstartdate: Date,
  completiondate: Date,
  testimonials: String,
});

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
