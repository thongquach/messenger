export type AccountType = {
  name: string;
  id: string;
};

export type MessageType = {
  id: string;
  text: string;
  sender: AccountType;
  createdAt: string;
};

export type MessageResponseType = {
  cursor_next: string | null;
  cursor_prev: string | null;
  rows: MessageType[];
  sort: 'NEWEST_FIRST';
};

export type ConversationType = {
  id: string;
  lastMessage?: MessageType;
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
