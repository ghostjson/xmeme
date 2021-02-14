export interface Post {
  id?: number;
  url: string;
  caption: string;
  name: string;
  createdAt?: Date;
  likes?: number;
  reports?: number;
}
