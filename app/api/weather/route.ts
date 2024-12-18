import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   try {
          const apiKey = process.env.OPENWEATHERAPP_API_KEY
          const lat = 40.7128
          const lon = -74.006
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
          
          const res = await axios.get(url)

          return NextResponse.json(res.data)
     } catch (error) {
        console.log("Error fetching forcast data", error)

        return new Response("Error fetching forcast data", { status: 500 })
   }
}