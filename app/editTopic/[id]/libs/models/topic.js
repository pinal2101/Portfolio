import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  projectname: String,
  websitelink: String,
  technology: [String], //  Fix: make this an array
  description: String,
  pagebuilder: [String], //  Also array
  clientname: String,
  clientinvoices: [String], //  Array of invoice URLs
  bidplatform: String,
  bidplatformURL: String,
  invoiceamount: Number,
  projectstartdate: Date,
  completiondate: Date,
  testimonials: String,
});

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
