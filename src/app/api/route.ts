import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest, response: NextResponse) {
    const url = new URL(request.url);
    // console.log(url);
    const searchParams = new URLSearchParams(url.search);
    // console.log(searchParams);
    const fileName = searchParams.get("audio");

    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${fileName}`)
}