import { apiClient } from '@/lib/api';

export interface Message {
  id?: number;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
}

export interface ChatRequest {
  conversation_id?: number | null;
  message: string;
}

export interface ChatResponse {
  conversation_id: number;
  response: string;
  timestamp: string;
}

export interface Conversation {
  id: number;
  created_at: string;
  updated_at: string;
}

class ChatService {
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await apiClient.post<ChatResponse>('/api/chat', request);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Failed to send message');
    }
  }

  async getConversations(): Promise<Conversation[]> {
    try {
      const response = await apiClient.get<Conversation[]>('/api/chat/conversations');
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Failed to fetch conversations');
    }
  }

  async getConversationMessages(conversationId: number): Promise<Message[]> {
    try {
      const response = await apiClient.get<Message[]>(
        `/api/chat/conversations/${conversationId}/messages`
      );
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Failed to fetch messages');
    }
  }
}

export const chatService = new ChatService();
