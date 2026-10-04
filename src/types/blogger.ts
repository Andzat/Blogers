export type Category = 'all' | 'tech' | 'travel' | 'fashion' | 'fitness';

export interface FeedPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'blogger';
  text: string;
  timestamp: string;
}

export interface QuickPrompt {
  id: string;
  question: string;
  response: string;
}

export interface Blogger {
  id: string;
  name: string;
  handle: string;
  gender: 'male' | 'female';
  category: Category;
  categoryLabel: string;
  avatar: string;
  verified: boolean;
  status: 'online' | 'busy' | 'shooting';
  statusText: string;
  shortBio: string;
  fullBio: string;
  location: string;
  subscribers: string;
  engagement: string;
  telegramLink: string;
  telegramChannelName: string;
  tags: string[];
  personalityTraits: string[];
  feedPosts: FeedPost[];
  quickPrompts: QuickPrompt[];
  defaultChatWelcome: string;
}
