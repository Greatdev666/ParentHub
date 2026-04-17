import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity/write-client";

export async function POST(req: Request) {
  try {
    const { id, type, action } = await req.json();

    if (!id || !type) {
      return NextResponse.json({ error: "Missing ID or Type" }, { status: 400 });
    }

    const incrementValue = action === "dec" ? -1 : 1;

    // Use Sanity patch to update likes atomically
    const result = await writeClient
      .patch(id)
      .setIfMissing({ likes: 0 })
      // Use inc but ensured via client-side logic + server-side patch
      .inc({ likes: incrementValue })
      .commit();

    // Sanity's inc doesn't have min/max, so we do a quick corrective patch if it goes negative
    if (result.likes < 0) {
      await writeClient.patch(id).set({ likes: 0 }).commit();
      result.likes = 0;
    }

    return NextResponse.json({ success: true, likes: result.likes });
  } catch (error: any) {
    console.error("--- LIKE ACTION FAILED ---");
    console.error("Error Message:", error.message);
    console.error("Status Code:", error.statusCode);
    console.error("Is Token Preset?:", !!process.env.SANITY_API_WRITE_TOKEN);
    console.error("---------------------------");
    
    return NextResponse.json({ 
      error: "Failed to process like", 
      details: error.message 
    }, { status: 500 });
  }
}
