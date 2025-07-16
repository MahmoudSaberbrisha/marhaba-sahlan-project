const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

class ApiService {
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'حدث خطأ في الطلب');
    }

    return response.json();
  }

  // Authentication APIs
  async login(email: string, password: string) {
    try {
      return await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      // إذا كان الخادم غير متوفر، استخدم المصادقة المؤقتة
      console.warn('Backend server not available, using mock authentication');
      
      // محاكاة بيانات المستخدم
      if (email === 'admin@abna.org' && password === 'admin123') {
        return {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: 1,
            name: 'مدير النظام',
            email: 'admin@abna.org',
            role: 'admin',
            organization: 'جمعية أبناء'
          }
        };
      } else {
        throw new Error('بيانات تسجيل الدخول غير صحيحة');
      }
    }
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Criteria APIs
  async getMainCriteria() {
    return this.request('/criteria/main');
  }

  async createMainCriteria(data: any) {
    return this.request('/criteria/main', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMainCriteria(id: number, data: any) {
    return this.request(`/criteria/main/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async createSubCriteria(data: any) {
    return this.request('/criteria/sub', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Evidence APIs
  async getEvidence(params?: any) {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    return this.request(`/evidence${queryString ? `?${queryString}` : ''}`);
  }

  async uploadEvidence(formData: FormData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/evidence`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'حدث خطأ في رفع الملف');
    }

    return response.json();
  }

  async reviewEvidence(id: number, status: string, reviewNotes: string) {
    return this.request(`/evidence/${id}/review`, {
      method: 'PUT',
      body: JSON.stringify({ status, reviewNotes }),
    });
  }

  // Dashboard APIs
  async getDashboardStats() {
    // سيتم إضافة API للإحصائيات لاحقاً
    return {
      totalCriteria: 0,
      completedCriteria: 0,
      pendingEvidence: 0,
      approvedEvidence: 0,
      progressPercentage: 0
    };
  }
}

export const apiService = new ApiService();