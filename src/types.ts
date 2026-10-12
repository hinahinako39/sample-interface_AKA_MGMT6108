export interface Article {
  id: string;
  headline: string;
  deck: string;
  section: string;
  kicker?: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  imageCaption?: string;
  imageLocation?: string;
  imageDate?: string;
  isHero?: boolean;
  isGreatRead?: boolean;
  hasAudio?: boolean;
  audioDuration?: string;
  commentCount?: number;
  bodyParagraphs: string[];
  tags?: string[];
}

export interface CommentItem {
  id: string;
  author: string;
  location: string;
  timeAgo: string;
  content: string;
  likes: number;
  isEditorPick?: boolean;
}

export type SectionType =
  | 'home'
  | 'world'
  | 'politics'
  | 'business'
  | 'opinion'
  | 'culture'
  | 'cooking'
  | 'games'
  | 'athletic'
  | 'wirecutter';
