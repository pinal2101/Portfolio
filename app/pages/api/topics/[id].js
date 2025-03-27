// import dbConnect from "@/utils/dbConnect";
// import Topic from "../../../editTopic/[id]/libs/models/topic";

// export default async function handler(req, res) {
//   await dbConnect(); // Ensure DB connection
//   const { id } = req.query; // Get ID from URL

//   if (!id) {
//     return res.status(400).json({ error: "Missing topic ID" });
//   }

//   try {
//     if (req.method === "GET") {
//       const topic = await Topic.findById(id);
//       console.log(topic)
//       if (!topic) return res.status(404).json({ error: "Topic not found" });
//       return res.status(200).json(topic);
//     }

//     if (req.method === "PUT") {
//       const updatedTopic = await Topic.findByIdAndUpdate(id, req.body, { new: true });

//       if (!updatedTopic) {
//         return res.status(404).json({ error: "Failed to update topic" });
//       }

//       return res.status(200).json(updatedTopic); // ✅ Return updated data
//     }

//     res.status(405).json({ error: "Method Not Allowed" });
//   } catch (error) {
//     console.error("API Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

import { connectDB } from "../../../utils/db";
import Topic from "../../../models/Topic";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Topic ID is required" });
  }

  try {
    if (req.method === "GET") {
      // ✅ Fetching single topic
      const topic = await Topic.findById(id);
      if (!topic) {
        return res.status(404).json({ error: "Topic not found" });
      }
      return res.status(200).json(topic);
    }

    if (req.method === "PUT") {
      // ✅ Updating topic data
      const updatedTopic = await Topic.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedTopic) {
        return res.status(404).json({ error: "Failed to update topic" });
      }

      return res.status(200).json(updatedTopic);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    return res.status(500).json({ error: "Server Error", details: error });
  }
}
