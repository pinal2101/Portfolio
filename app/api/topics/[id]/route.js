// import Topic from "../../../editTopic/[id]/libs/models/topic";
// import connectMongoDB from "../../../editTopic/[id]/libs/mongodb";
// import { NextResponse } from "next/server";

// //  Handle PUT request (Update topic)
// export async function PUT(request, { params } ) {
  
//     try {
//         await connectMongoDB();
//         //const  { id } = params;
//         const { id } = params; //  Extract `id` correctly
//         //  Parse request body
//         const {
//             projectname: projectname,
//             websitelink: websitelink,
//             technology: technology,
//             description: description,
//             pagebuilder: pagebuilder,
//             clientname: clientname,
//             clientinvoices: clientinvoices,
//             bidplatform: bidplatform,
//             bidplatformURL: bidplatformURL,
//             invoiceamount: invoiceamount,
//             projectstartdate: projectstartdate,
//             completiondate: completiondate,
//             testimonials: testimonials
//         } = await request.json();  //  Fix: await request.json()

//         //  Update the topic in the database
//         const updatedTopic = await Topic.findByIdAndUpdate(
//             id, 
//             { projectname, websitelink, technology, description, pagebuilder, clientname, 
//               clientinvoices, bidplatform, bidplatformURL, invoiceamount, 
//               projectstartdate, completiondate, testimonials },
//              { new: true, runValidators: true }
//           );
        
//         console.log('updatedTopic',updatedTopic);
        

//         if (!updatedTopic) {
//             return NextResponse.json({ error: "Topic not found" }, { status: 404 });
//         }

//         return NextResponse.json({ message: "Topic updated", topic: updatedTopic }, { status: 200 });

//     } catch (error) {
//         return NextResponse.json({ error: "Failed to update topic", details: error.message }, { status: 500 });
//     }
// }

// // Handle GET request (Fetch topic)
// export async function GET(request, { params }) {
//   try {
//     await connectMongoDB();
//     const { id } = params; //  Extract `id` correctly

//     const topic = await Topic.findById(id);
    
//     if (!topic) {
//       return NextResponse.json({ error: "Topic not found" }, { status: 404 });
//     }

//     return NextResponse.json({ topic }, { status: 200 });
//   } catch (error) {
//     console.error("Fetch error:", error);
//     return NextResponse.json({ error: "Failed to fetch topic", details: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import connectMongoDB from "../../../editTopic/[id]/libs/mongodb";
import Topic from "../../../editTopic/[id]/libs/models/topic";
import cloudinary from "../../../editTopic/[id]/libs/cloudinary";

// Optional: Upload helper if you want to upload new invoices
async function uploadToCloudinary(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: "client_invoices" }, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);
    }).end(buffer);
  });
}

// ✅ PUT - Update topic
export async function PUT(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;

    const {
      projectname,
      websitelink,
      technology,
      description,
      pagebuilder,
      clientname,
      clientinvoices, // This should be array of URLs (already uploaded or new)
      bidplatform,
      bidplatformURL,
      invoiceamount,
      projectstartdate,
      completiondate,
      testimonials
    } = await request.json();

    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      {
        projectname,
        websitelink,
        technology,
        description,
        pagebuilder,
        clientname,
        clientinvoices, // Should be an array of Cloudinary URLs
        bidplatform,
        bidplatformURL,
        invoiceamount,
        projectstartdate,
        completiondate,
        testimonials,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTopic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic updated", topic: updatedTopic }, { status: 200 });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update topic", details: error.message }, { status: 500 });
  }
}

// ✅ GET - Fetch topic by ID
export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;

    const topic = await Topic.findById(id);

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch topic", details: error.message }, { status: 500 });
  }
}

