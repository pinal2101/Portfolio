import Topic from "../../../editTopic/[id]/libs/models/topic";
import connectMongoDB from "../../../editTopic/[id]/libs/mongodb";
import { NextResponse } from "next/server";

// ✅ Handle PUT request (Update topic)
export async function PUT(request, context ) {
  //console.log('paramsbiknk',params.id);
    try {
        await connectMongoDB();
        //const  { id } = params;
        const id = context.params.id;
        // ✅ Parse request body
        const {
            newprojectname: projectname,
            newwebsitelink: websitelink,
            newtechnology: technology,
            newdescription: description,
            newpagebuilder: pagebuilder,
            newclientname: clientname,
            newclientinvoices: clientinvoices,
            newbidplatform: bidplatform,
            newbidplatformURL: bidplatformURL,
            newinvoiceamount: invoiceamount,
            newprojectstartdate: projectstartdate,
            newcompletiondate: completiondate,
            newtestimonials: testimonials
        } = await request.json();  // ✅ Fix: await request.json()

        // ✅ Update the topic in the database
        const updatedTopic = await Topic.findByIdAndUpdate(
            id, 
            { projectname, websitelink, technology, description, pagebuilder, clientname, 
              clientinvoices, bidplatform, bidplatformURL, invoiceamount, 
              projectstartdate, completiondate, testimonials },
             { new: true, runValidators: true }
          );
        
        console.log('updatedTopic',updatedTopic);
        

        if (!updatedTopic) {
            return NextResponse.json({ error: "Topic not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Topic updated", topic: updatedTopic }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Failed to update topic", details: error.message }, { status: 500 });
    }
}

// ✅ Handle GET request (Fetch topic)
export async function GET(request, context) {
  try {
    await connectMongoDB();
    const id = context.params.id;  // ✅ Correct way to extract params

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


// import { NextResponse } from "next/server";
// import connectMongoDB from "@/app/editTopic/[id]/libs/mongodb";
// import Topic from "@/app/editTopic/[id]/libs/models/topic";

// // ✅ Handle GET request
// export async function GET(req, { params }) {
  
  
//   try {
//     await connectMongoDB();
//     const topic = await Topic.findById(params.id);

//     if (!topic) return NextResponse.json({ error: "Topic not found" }, { status: 404 });

//     return NextResponse.json(topic, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch topic" }, { status: 500 });
//   }
// }

// // ✅ Handle PUT request
// export async function PUT(req, { params}) {
//   console.log('params', params);
  
//   try {
//     await connectMongoDB();
//     const body = await req.json();
    

//     const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, body, { new: true });

//     if (!updatedTopic) return NextResponse.json({ error: "Topic not found" }, { status: 404 });

//     return NextResponse.json(updatedTopic, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to update topic" }, { status: 500 });
//   }
// }

// // ✅ Handle DELETE request
// export async function DELETE(req, { params }) {
//   try {
//     await connectMongoDB();
//     await Topic.findByIdAndDelete(params.id);
//     return NextResponse.json({ message: "Topic deleted successfully" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to delete topic" }, { status: 500 });
//   }
// }
