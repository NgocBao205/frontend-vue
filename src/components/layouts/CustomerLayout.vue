<template>
  <div class="bg-black min-vh-100">
    <!-- Navbar Bootstrap màu đen trong suốt -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div class="container">
        <!-- Logo -->
        <router-link class="navbar-brand fw-bold text-danger fs-3" to="/">🎬 TICKET-AI</router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto fw-bold">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Trang Chủ</router-link>
            </li>
            <!-- Ẩn/Hiện dựa vào trạng thái đăng nhập -->
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link text-white bg-danger rounded px-3 ms-2" to="/login">Đăng nhập</router-link>
            </li>
            <li class="nav-item" v-else>
              <a class="nav-link text-warning ms-2" href="#" @click.prevent="handleLogout">🚪 Đăng xuất</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Nơi chứa Trang Chủ hoặc Đặt vé -->
    <main>
      <router-view />
    </main>

    <!-- Chân trang -->
    <footer class="bg-dark text-white text-center py-4 mt-5 border-top border-secondary">
      <p class="mb-0 fw-bold">© 2026 TICKET-AI Cinema. Đồ án Niên luận.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

// Kiểm tra xem khách đã đăng nhập chưa khi trang vừa load
onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('token');
});

// Hàm Đăng xuất
const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  isLoggedIn.value = false;
  alert("Bạn đã đăng xuất thành công!");
  router.push('/login');
};
</script>