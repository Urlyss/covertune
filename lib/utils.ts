import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getPlaiceholder } from "plaiceholder";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

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

/**
 * Function to fetch all items from a paginated API endpoint and return them as a single list.
 * @param {string} endpoint - The URL of the API endpoint.
 * @param {Array} accumulator - An array to accumulate items from all pages.
 * @returns {Promise<Array>} - A promise that resolves to an array containing all items.
 */
export async function getAllItemsFromEndpoint(
  token: string,
  endpoint: string,
  type: "categories" | "playlist" | "tracks",
  accumulator: Array<any> = []
): Promise<Array<any> | null> {
  try {
    // Fetch data from the provided endpoint
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      },
    });
    if (response.status === 200) {
      const data = await response.json();

      // Check if there are more pages to fetch
      let nextUrl;
      let items;
      switch (type) {
        case "categories": {
          nextUrl = data.categories.next;
          items = data.categories.items;
          break;
        }
        case "playlist": {
          nextUrl = data.playlists.next;
          items = data.playlists.items;
          break;
        }
        case "tracks": {
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
          token,
          nextUrl,
          type,
          accumulator.concat(items)
        );
      } else {
        // If no next page, return the accumulated list of items
        return accumulator.concat(items);
      }
    }else{
      if(response.status == 401){
        return null
      }else{
        return [{error:true}]
      }
    }
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("Error fetching data:", error);
    throw error; // Propagate the error
  }
}

