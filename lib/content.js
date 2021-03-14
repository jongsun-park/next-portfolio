import { createClient } from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: space,
  accessToken: accessToken,
});

export async function fetchEntries() {
  // console.log(client);
  const entries = await client.getEntries();
  // console.log(entries);
  if (entries.items) return entries.items;
  console.log(`Error getting Entries`);
}

export default { fetchEntries };
