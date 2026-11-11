<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card p-5 shadow-lg border-0" style="width: 450px; border-radius: 10px;">
      <div class="text-center mb-4">
        <h3 class="fw-bold text-primary">🛡️ Cổng Quản Trị Hệ Thống</h3>
        <p class="text-muted">Chỉ dành cho nhân viên được cấp quyền</p>
      </div>
      
      <form @submit.prevent="handleAdminLogin">
        <div class="mb-3">
          <label class="form-label fw-bold">Email Nội Bộ</label>
          <input v-model="email" type="email" class="form-control" required placeholder="admin@cinema.com" />
        </div>
        
        <div class="mb-4">
          <label class="form-label fw-bold">Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" required placeholder="********" />
        </div>
        
        <button type="submit" class="btn btn-primary w-100 fw-bold fs-5">Truy Cập Hệ Thống</button>
      </form>

      <div v-if="errorMessage" class="alert alert-danger mt-3 text-center fw-bold px-2 py-2">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleAdminLogin = async () => {
  errorMessage.value = '';
  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    const { token, user } = response.data;

    // BẢO MẬT: Nếu là Khách, cấm cửa
    if (user.role !== 'Admin') {
      errorMessage.value = 'Tài khoản của bạn không có quyền truy cập cổng này!';
      return; 
    }

    localStorage.setItem('token', token);
    localStorage.setItem('userRole', user.role);
    router.push('/admin/dashboard'); 
    
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Lỗi hệ thống!';
  }
};
</script>