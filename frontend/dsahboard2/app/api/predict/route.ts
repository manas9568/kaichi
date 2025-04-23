import { NextResponse } from "next/server";

// Define types for API response
interface PredictionResponse {
  congestion: string;
  eta_minutes: number;
  delay_minutes: number;
  distance_km: number;
}

// Define types for prediction request
interface PredictionRequest {
  checkpoint: string;
  hour: number;
  weather_alert: number;
  special_day: number;
  weekend: number;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const requestData: PredictionRequest = await request.json();

    // Forward the request to the actual ML model API
    const response = await fetch("http://127.0.0.1:8000/api/predict/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      // If the ML API is not available, return fallback data
      console.error(`ML API responded with status: ${response.status}`);
      return NextResponse.json(getFallbackData(requestData), { status: 200 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in predict route handler:", error);

    // Return fallback data with a 200 status to prevent UI errors
    return NextResponse.json(getFallbackData(), { status: 200 });
  }
}

// Fallback data generator function
function getFallbackData(requestData?: PredictionRequest): PredictionResponse {
  // Generate congestion based on time of day if request data is available
  let congestion = "Moderate";

  if (requestData) {
    const hour = requestData.hour;
    const isWeekend = requestData.weekend === 1;
    const isSpecialDay = requestData.special_day === 1;

    // Morning and evening rush hours
    if ((hour >= 8 && hour <= 10) || (hour >= 16 && hour <= 18)) {
      congestion = "High";
    } else if (hour >= 11 && hour <= 15 && (isWeekend || isSpecialDay)) {
      congestion = "High";
    } else if (hour >= 22 || hour <= 6) {
      congestion = "Low";
    }
  }

  // Set delay based on congestion
  const delay =
    congestion === "High" ? 60 : congestion === "Moderate" ? 30 : 15;

  return {
    congestion: congestion,
    eta_minutes: delay + 10, // ETA is delay plus base travel time
    delay_minutes: delay,
    distance_km: 19.6, // Fixed distance from the example
  };
}
