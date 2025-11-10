import { api, toFullUrl } from 'src/boot/axios';

export type CollectionDef = {
  slug: string;
  name: string;
  description: string;
  image?: string;
};

let collectionData = [];

async function fetchCollection() {
  try {
    const response = await api.get('/api/collections')
    // Strapi returns an object { data: [ ... ], meta: { ... } }
    const payload = response?.data?.data ?? [];
    collectionData = payload;
    console.log('Fetched collection data:', collectionData);
    // Use map() over the array payload. Avoid flatMap which may be undefined if payload isn't an Array
    return payload.map((entry: any) => {
      const title = entry?.Title ?? entry?.title ?? '';
      const description = entry?.Description ?? entry?.description ?? '';
      // Image handling: support common Strapi shapes but keep optional
      const imgUrl = entry?.image?.data?.attributes?.url ?? entry?.Image?.[0]?.formats?.thumbnail?.url ?? undefined;
      return {
        slug: title.trim().replace(/\s+/g, '-').toLowerCase(),
        name: title,
        description: description || 'No description available.',
        image: imgUrl ? toFullUrl(imgUrl) : undefined,
      } as CollectionDef;
    });
  }
  catch (error) {
    console.log('Error fetching album data:', error);
    return [];
  }
}

await fetchCollection();

// shared collection definitions used across gallery pages/components
export const collections: CollectionDef[] = await fetchCollection();
// export const collections: CollectionDef[] = [
//   {
//     slug: 'featured-collection',
//     name: 'Featured Collection',
//     description: 'A curated showcase of standout images chosen for their impact and craft.',
//   },
//   {
//     slug: 'nature-collection',
//     name: 'Nature Collection',
//     description: 'Landscapes, wildlife, and scenes from the natural world — captured with care.',
//   },
//   {
//     slug: 'urban-collection',
//     name: 'Urban Collection',
//     description: 'City scenes, architecture, and the energy of urban life.',
//   },
//   {
//     slug: 'studio-collection',
//     name: 'Studio Collection',
//     description: 'Portraits and creative works made in the studio environment.',
//   },
// ];

export function slugify(name: string) {
  return name.trim().replace(/\s+/g, '-').toLowerCase();
}

export function findCollectionBySlug(slug?: string) {
  if (!slug) return null;
  const s = slug.trim().toLowerCase();
  return collections.find((c) => c.slug === s) || null;
}

export default function useCollections() {
  return { collections, slugify, findCollectionBySlug };
}
