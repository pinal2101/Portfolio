import mongoose from "mongoose";
//import bcrypt from "bcrypt";
const TopicSchema = new mongoose.Schema({
  
  projectname: String,
  websitelink: String,
  technology: String,
  description: String,
  pagebuilder: String,
  clientname: String,
  //clientinvoices: [String], // Store file paths
  bidplatform: String,
  bidplatformURL: String,
  invoiceamount: Number,
  projectstartdate: Date,
  completiondate: Date,
  testimonials: String,
});

const Topic = mongoose.models.Topic || mongoose.model("Topic", TopicSchema);
export default Topic;

