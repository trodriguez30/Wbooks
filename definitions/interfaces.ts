export interface CommentProps {
  avatar: string;
  commenter: string;
  comment: string;
  date?: Date;
}

export interface BookProps {
  id: number;
  author: string;
  title: string;
  genre: string;
  publisher: string;
  year: string;
  image_url: string;
  comments?: Array<CommentProps>;
}
