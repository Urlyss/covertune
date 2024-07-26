import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getPlaiceholder } from "plaiceholder";
import {AccessToken, Categories, FeaturedPlaylists, Playlist, PlaylistedTrack, SpotifyApi, Tracks} from "@spotify/web-api-ts-sdk"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
let instance:SpotifyApi|null

export async function getToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
  });

  return await response.json();
}

export async function getSpotifyInstance(){
  instance = SpotifyApi.withClientCredentials(client_id||"",client_secret||"")
  return instance
}

/**
 * Function to fetch all items from a paginated API endpoint and return them as a single list.
 * @param {string} endpoint - The URL of the API endpoint.
 * @param {Array} accumulator - An array to accumulate items from all pages.
 * @returns {Promise<Array>} - A promise that resolves to an array containing all items.
 */
export async function getAllItemsFromEndpoint(
  instance: SpotifyApi,
  endpoint: string,
  type: "categories" | "playlist" | "tracks",
  accumulator: Array<any> = []
): Promise<Array<any> | String> {
  try {
    // Fetch data from the provided endpoint
    const splittedUrl = endpoint.split("https://api.spotify.com/v1/")
    const formattedUrl = splittedUrl.length > 1 ? splittedUrl[1] : splittedUrl[0]
    const response = await instance.makeRequest("GET",formattedUrl);
      // Check if there are more pages to fetch
      let nextUrl;
      let items;
      switch (type) {
        case "categories": {
          const data = response as Categories
          nextUrl = data.categories.next;
          items = data.categories.items;
          break;
        }
        case "playlist": {
          const data = response as FeaturedPlaylists
          nextUrl = data.playlists.next;
          items = data.playlists.items;
          break;
        }
        case "tracks": {
          const data = response as {next:string;items:PlaylistedTrack[]}
          nextUrl = data.next;
          items = data.items;
          break;
        }
        default:
          break;
      }
      if (nextUrl) {
        // If next page exists, recursively call the function with the next page URL
        return getAllItemsFromEndpoint(
          instance,
          nextUrl,
          type,
          accumulator.concat(items)
        );
      } else {
        // If no next page, return the accumulated list of items
        return accumulator.concat(items);
      }
  } catch (error) {
    let err = error as Error
    return err.message
  }
}

