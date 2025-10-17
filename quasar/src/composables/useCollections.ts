export type CollectionDef = {
  slug: string;
  name: string;
  description: string;
  image?: string;
};

// shared collection definitions used across gallery pages/components
export const collections: CollectionDef[] = [
  {
    slug: 'featured-collection',
    name: 'Featured Collection',
    description: 'A curated showcase of standout images chosen for their impact and craft.',
  },
  {
    slug: 'nature-collection',
    name: 'Nature Collection',
    description: 'Landscapes, wildlife, and scenes from the natural world — captured with care.',
  },
  {
    slug: 'urban-collection',
    name: 'Urban Collection',
    description: 'City scenes, architecture, and the energy of urban life.',
  },
  {
    slug: 'studio-collection',
    name: 'Studio Collection',
    description: 'Portraits and creative works made in the studio environment.',
  },
];

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
