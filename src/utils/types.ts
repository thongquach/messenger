export type AccountType = {
  name: string;
  id: string;
};

export type SetAccountType = (account: AccountType | undefined) => void;

export type Message = {
  id: string;
  text: string;
  sender: AccountType;
  createdAt: string;
};

export type ConversationType = {
  id: string;
  lastMessage: Message;
  participants: AccountType[];
};

export type ConversationsType = {
  cursor_next: string;
  cursor_prev: string;
  rows: ConversationType[];
  sort: 'NEWEST_FIRST';
};

export type SetConversationType = (conversation: ConversationType | undefined) => void;
