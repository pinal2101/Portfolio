import Topic from "../../../editTopic/[id]/libs/models/topic";
import connectMongoDB from "../../../editTopic/[id]/libs/mongodb";
import { NextResponse } from "next/server";

//  Handle PUT request (Update topic)
export async function PUT(request, { params } ) {
  
    try {
        await connectMongoDB();
        //const  { id } = params;
        const { id } = params; //  Extract `id` correctly
        //  Parse request body
        const {
            projectname: projectname,
            websitelink: websitelink,
            technology: technology,
            description: description,
            pagebuilder: pagebuilder,
            clientname: clientname,
            clientinvoices: clientinvoices,
            bidplatform: bidplatform,
            bidplatformURL: bidplatformURL,
            invoiceamount: invoiceamount,
            projectstartdate: projectstartdate,
            completiondate: completiondate,
            testimonials: testimonials
        } = await request.json();  //  Fix: await request.json()

        //  Update the topic in the database
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

// Handle GET request (Fetch topic)
export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params; //  Extract `id` correctly

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


