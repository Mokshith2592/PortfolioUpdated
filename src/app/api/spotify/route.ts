import { NextResponse } from 'next/server';

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  try {
    // 1. Get a fresh access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token!,
      }),
    });

    const tokenData = await tokenResponse.json();
    const access_token = tokenData.access_token;

    if (!access_token) {
      return NextResponse.json({ playing: false, error: 'Failed to refresh token' });
    }

    // 2. Fetch currently playing track
    const trackResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { 
        'Authorization': `Bearer ${access_token}`,
        'Cache-Control': 'no-cache' // Ensure we get fresh data
      }
    });

    // 204 No Content = Nothing playing
    if (trackResponse.status === 204 || trackResponse.status > 299) {
      return NextResponse.json({ playing: false });
    }

    const data = await trackResponse.json();

    // Check if it's a valid track item
    if (!data.item) {
      return NextResponse.json({ playing: false });
    }

    return NextResponse.json({
      playing: true,
      title: data.item.name,
      artist: data.item.artists[0].name,
      url: data.item.external_urls.spotify
    });
  } catch (error) {
    return NextResponse.json({ playing: false, error: 'Internal Server Error' });
  }
}