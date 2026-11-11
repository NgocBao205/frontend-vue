<template>
  <!-- Background rạp phim full màn hình -->
  <div class="login-wrapper d-flex align-items-center justify-content-center vh-100">
    <!-- Form kính mờ ảo -->
    <div class="card p-5 shadow-lg border-0" style="width: 400px; border-radius: 15px; background: rgba(0, 0, 0, 0.8) !important;">
      <h2 class="text-center mb-4 fw-bold text-danger">🎟️ Đăng Nhập</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label text-white">Email</label>
          <input v-model="email" type="email" class="form-control bg-dark text-white border-secondary" required placeholder="Nhập email của bạn" />
        </div>
        
        <div class="mb-4">
          <label class="form-label text-white">Mật khẩu</label>
          <input v-model="password" type="password" class="form-control bg-dark text-white border-secondary" required placeholder="Nhập mật khẩu" />
        </div>
        
        <button type="submit" class="btn btn-danger w-100 fw-bold fs-5">Vào Rạp</button>
      </form>

      <!-- Báo lỗi -->
      <div v-if="errorMessage" class="alert alert-warning mt-3 text-center fw-bold px-2 py-2">
        ❌ {{ errorMessage }}
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

const handleLogin = async () => {
  errorMessage.value = '';
  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    const { token, user } = response.data;

    // BẢO MẬT: Nếu là Admin, đuổi sang cổng khác
    if (user.role === 'Admin') {
      errorMessage.value = 'Vui lòng đăng nhập ở cổng nội bộ dành cho nhân viên!';
      return; // Dừng lại, không cho lưu Token
    }

    localStorage.setItem('token', token);
    localStorage.setItem('userRole', user.role);
    router.push('/'); 
    
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Lỗi kết nối máy chủ!';
  }
};
</script>

<style scoped>
/* Thêm ảnh nền điện ảnh cực ngầu (Link ảnh từ máy chủ TheMovieDB) */
.login-wrapper {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg') center/cover no-repeat;
}
/* Đổi viền đỏ khi click vào ô input */
.form-control:focus {
  box-shadow: none;
  border-color: #e50914 !important;
}
</style>