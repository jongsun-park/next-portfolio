import { createClient } from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: space,
  accessToken: accessToken,
});

let data;

export async function getAllProject() {
  data = await client.getEntries();
  return data;
}

export async function getAllProjectIds() {
  if (!data) {
    data = await getAllProject();
  }
  const paths = data.items.map((item) => ({
    params: { id: item.sys.id },
  }));

  return paths;
}

export async function getProjectData(id) {
  if (!data) {
    data = await getAllProject();
  }
  const projectData = data.items.filter((item) => item.sys.id === id);

  return projectData[0];
}
