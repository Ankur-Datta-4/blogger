export {};

declare global {
  interface Blog {
    id: string;
    title: string;
    createdAt: string;
    slug: string;
    isDraft: boolean;
  }
}
