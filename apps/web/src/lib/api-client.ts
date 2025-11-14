const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      throw new Error(error.message || 'API request failed');
    }

    return response.json();
  }

  // Todos
  async getTodos() {
    return this.request<any[]>('/todos');
  }

  async getTodo(id: string) {
    return this.request<any>(`/todos/${id}`);
  }

  async createTodo(data: { title: string; description?: string; completed?: boolean }, token?: string) {
    return this.request<any>('/todos', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  async updateTodo(id: string, data: Partial<{ title: string; description?: string; completed?: boolean }>, token?: string) {
    return this.request<any>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  async deleteTodo(id: string, token?: string) {
    return this.request<void>(`/todos/${id}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  // Health
  async health() {
    return this.request<{ status: string }>('/health');
  }
}

export const apiClient = new ApiClient();
