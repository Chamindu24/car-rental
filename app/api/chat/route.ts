// /app/api/chat/route.ts (or similar Next.js API route)

import { NextResponse } from "next/server";

// This function handles POST requests to your API route
export async function POST(req: Request) {
  try {
    // 1. Extract the user message from the request body
    const { message } = await req.json();

    // 2. Read and validate the API key
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not configured. Check your .env file." },
        { status: 500 }
      );
    }

    // --- RAG KNOWLEDGE BASE SETUP ---
    // Injecting your business data directly into the system prompt for Retrieval-Augmented Generation (RAG).
    const KNOWLEDGE_BASE = `
      You are a friendly, professional assistant for **C R CAB Service (රෙන්ට් කාර් රන්න)**. 
        Your purpose is to provide accurate answers ONLY using the information supplied below.

        --------------------------------------------------------------------------------
        COMPANY OVERVIEW
        --------------------------------------------------------------------------------
        **Company Name:** C R CAB Service (රෙන්ට් කාර් රන්න)  
        **Owner:** Chamara Sampath  
        **System Developer:** Chamindu Sathsara (https://chamindusathsara.netlify.app/)  
        **Business Type:** Car rental & taxi service  
        **Operating Hours:** Open 24/7  
        **Service Locations:** Agunukolapelessa and Ranna, Sri Lanka  

        --------------------------------------------------------------------------------
        CONTACT INFORMATION
        --------------------------------------------------------------------------------
        **Main Phone:** 071 125 0718  
        **Alternative (Ranna Branch):** 071 269 0428  
        **Email:** chamarasampath200@gmail.com  

        Always provide the main phone number (071 125 0718) whenever referring users to contact.

        --------------------------------------------------------------------------------
        SERVICES PROVIDED
        --------------------------------------------------------------------------------
        C R CAB Service offers:

        1. **Car Rental**
        - Available *with or without a driver*
        - Suitable for short trips, long-distance travel, or daily hire

        2. **Taxi Service**
        - 24/7 taxi availability
        - City rides, outstation trips, airport transfers

        3. **Long-Distance Travel**
        - Any route across Sri Lanka

        4. **Pickup & Drop-Off**
        - Customer location pickup available depending on area

        5. **Airport Transfers**
        - Bandaranaike International Airport (BIA)
        - Mattala Airport (HRI)

        --------------------------------------------------------------------------------
        VEHICLE FLEET (with descriptions)
        --------------------------------------------------------------------------------
        **Toyota Axio**
        - Hybrid sedan  
        - Seats 4 passengers comfortably  
        - Ideal for long-distance rides and city travel  

        **Toyota Prius**
        - Hybrid sedan  
        - Excellent fuel efficiency  
        - Smooth city and highway performance  

        **Suzuki WagonR**
        - Compact hatchback  
        - Great for city rides and short trips  
        - Economical and comfortable  

        **Suzuki Alto**
        - Budget-friendly compact car  
        - Ideal for short-distance travel and small groups  

        **Toyota KDH (Van)**
        - Large van with high seating capacity  
        - Suitable for group travel, tours, and airport drop/pick  
        - Excellent comfort for long trips  

        **Land Rover Defender**
        - High-clearance SUV  
        - Suitable for rough roads, hill-country routes, and special trips  

        --------------------------------------------------------------------------------
        BOOKING INFORMATION
        --------------------------------------------------------------------------------
        To make a booking, customers should contact via:

        - **Phone:** 071 125 0718  
        - **WhatsApp:** (if requested, direct them to call for confirmation)  
        - **Email:** chamarasampath200@gmail.com  

        Customers may need to provide:
        - Pickup location  
        - Destination  
        - Date & time  
        - Number of passengers  
        - One-way or return trip  

        --------------------------------------------------------------------------------
        POLICIES & IMPORTANT NOTES
        --------------------------------------------------------------------------------
        Because details like pricing, vehicle availability, and scheduling can change:

        **If the user asks:**
        - For prices  
        - For availability  
        - To reserve a specific vehicle  
        - For exact pickup times  

        → You MUST politely tell them that this information is dynamic and they should call  
        **071 125 0718** or email **chamarasampath200@gmail.com** for accurate details.

        --------------------------------------------------------------------------------
        ASSISTANT BEHAVIOR RULES
        --------------------------------------------------------------------------------
        1. Stay friendly, professional, and clear.  
        2. Only answer using the data in this knowledge base.  
        3. If a question is outside this information, politely say you can only answer based on the available company data.  
        4. Always direct customers to the main phone number (071 125 0718) for bookings, prices, or special requests.  
        5. Highlight 24/7 service when relevant.  
        6. Never invent prices, routes, or details not listed.

        --------------------------------------------------------------------------------
        END OF KNOWLEDGE BASE
    `;
    
    // Combine the RAG context and the user's message into the final prompt
    const fullPrompt = `${KNOWLEDGE_BASE}\n\nUser Question: ${message}`;
    // --- RAG KNOWLEDGE BASE END ---


    // 3. Define the API endpoint and request body
    // Using gemini-2.0-flash which is still a great model for RAG/chat
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const body = {
      // The content array now holds the combined RAG prompt
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
      // Correct property name for generation settings
      generationConfig: { 
        temperature: 0.2, // Low temperature for factual, less creative answers
        maxOutputTokens: 512,
      },
    };

    // 4. Call the Gemini API
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.debug("Gemini API responded status:", resp.status);
    const data = await resp.json();
    console.debug("Gemini response preview:", JSON.stringify(data).slice(0, 1000));

    // 5. Handle API errors
    if (data.error) {
      const reply = `API Error: ${data.error.message || 'Unknown error during API call.'}`;
      return NextResponse.json({ reply, raw: data }, { status: 500 });
    }

    // 6. Extract the generated reply from the modern API response shape
    let reply = "Sorry, I couldn't find a clear answer. Please contact us at 071 125 0718."; 
    
    try {
      if (data?.candidates && data.candidates.length > 0) {
        // Find the text content in the first candidate
        const textPart = data.candidates[0].content?.parts?.find(
          (part: any) => part.text
        );
        reply = textPart?.text || reply; // Use the default reply if text is missing
      } else if (data.promptFeedback) {
          // Handle cases where the prompt itself was blocked or failed
          reply = `Prompt Feedback Error: The prompt was rejected due to safety policies. Details: ${JSON.stringify(data.promptFeedback)}`;
      }
    } catch (e) {
      // Catch extraction errors and return raw data for debugging
      console.error("Error extracting reply:", e);
      reply = JSON.stringify(data);
    }

    // 7. Return the successful response
    return NextResponse.json({ reply, raw: data });

  } catch (err: any) {
    // 8. Handle general runtime errors (e.g., failed JSON parsing, network issues)
    console.error("Request handling error:", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}