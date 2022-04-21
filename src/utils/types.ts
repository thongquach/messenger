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

export type ConversationType = {
  id: string;
  lastMessage: Message;
  participants: AccountType[];
};

export type SetAccountType = (account: AccountType) => void;

export type SetCurrentConversationType = (conversation: ConversationType) => void;
