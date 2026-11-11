<template>
  <div class="text-white pb-5">
    <!-- Banner Phim Hoành Tráng -->
    <div class="hero-banner d-flex align-items-center justify-content-center text-center">
      <div>
        <h1 class="display-3 fw-bolder text-white text-shadow-sm mb-3">KHÁM PHÁ THẾ GIỚI ĐIỆN ẢNH</h1>
        <p class="fs-4 text-light">Đặt vé ngay - Trải nghiệm không giới hạn với AI</p>
      </div>
    </div>

    <!-- Container chứa danh sách phim -->
    <div class="container mt-5">
      <h2 class="fw-bold mb-4 border-start border-danger border-4 ps-3">PHIM ĐANG CHIẾU</h2>
      
      <!-- Báo đang tải dữ liệu -->
      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-danger" role="status"></div>
        <p class="mt-2">Đang tải danh sách phim...</p>
      </div>

      <!-- Lưới chứa các bộ phim (Dùng Grid của Bootstrap) -->
      <div v-else class="row g-4">
        <!-- Vòng lặp v-for render từng bộ phim lấy từ API -->
        <div v-for="movie in movies" :key="movie.id" class="col-6 col-md-4 col-lg-3">
          <div class="card h-100 bg-dark text-white border-0 shadow-lg movie-card">
            
            <!-- Poster: Nếu DB chưa có poster URL, dùng ảnh giữ chỗ (Placeholder) -->
            <img :src="movie.poster_url || 'https://via.placeholder.com/300x450/222/aaa?text=No+Poster'" 
                 class="card-img-top poster-img" alt="Poster">
            
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-bold text-warning">{{ movie.title }}</h5>
              <p class="card-text small text-muted mb-3">
                ⏳ Thời lượng: {{ movie.duration }} phút<br>
                🔞 Độ tuổi: {{ movie.age_rating }}
              </p>
              
              <!-- Nút mua vé đẩy sang trang Booking -->
              <button class="btn btn-danger mt-auto fw-bold shadow-sm" @click="goBooking(movie.id)">
                🎟️ MUA VÉ NGAY
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api'; // Trạm gọi API

const movies = ref([]);
const loading = ref(true);
const router = useRouter();

// Gọi API Node.js lấy danh sách phim
const fetchMovies = async () => {
  try {
    const response = await api.get('/movies'); 
    movies.value = response.data; // Gán dữ liệu trả về vào biến movies
  } catch (error) {
    console.error("Lỗi lấy danh sách phim:", error);
    alert("Không thể tải danh sách phim lúc này!");
  } finally {
    loading.value = false;
  }
};

// Chuyển hướng sang trang đặt vé
const goBooking = (id) => {
  router.push(`/booking/${id}`);
};

// Hàm này chạy ngay khi mở trang web
onMounted(() => {
  fetchMovies();
});
</script>

<style scoped>
/* Hiệu ứng bóng mờ cho chữ */
.text-shadow-sm {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
}

/* Ảnh nền Banner - Dùng ảnh Deadpool & Wolverine từ TMDB làm demo */
.hero-banner {
  height: 65vh;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.9)), 
              url('https://image.tmdb.org/t/p/original/9l1eZiJHmhr5jIlthMdJN5WYoff.jpg') center/cover no-repeat;
}

/* Hiệu ứng thẻ phim nhô lên khi đưa chuột vào */
.movie-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}
.movie-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(229, 9, 20, 0.3) !important;
}

/* Chuẩn hóa tỷ lệ ảnh Poster */
.poster-img {
  height: 350px;
  object-fit: cover;
}
</style>