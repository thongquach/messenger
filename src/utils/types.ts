export type AccountType = {
  name: string;
  id: string;
};

export type Message = {
  id: string;
  text: string;
  sender: AccountType;
  createdAt: string;
};

export type MessageResponseType = {
  cursor_next: string;
  cursor_prev: string;
  rows: Message[];
  sort: 'NEWEST_FIRST';
};

export type ConversationType = {
  id: string;
  lastMessage: Message;
  participants: AccountType[];
};

export type ConversationsResponseType = {
  cursor_next: string;
  cursor_prev: string;
  rows: ConversationType[];
  sort: 'NEWEST_FIRST';
};

export type SetAccountType = (account: AccountType | undefined) => void;
export type SetConversationType = (conversation: ConversationType | undefined) => void;
