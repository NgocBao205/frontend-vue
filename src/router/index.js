import { createRouter, createWebHistory } from 'vue-router'
import CustomerLayout from '../components/layouts/CustomerLayout.vue'
import AdminLayout from '../components/layouts/AdminLayout.vue'

const routes = [
  // --- NHÁNH 1: DÀNH CHO KHÁCH HÀNG ---
  {
    path: '/',
    component: CustomerLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Home.vue') // Sẽ tạo file này sau
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/Login.vue') // Sẽ tạo file này sau
      }
    ]
  },

  // --- NHÁNH 2: DÀNH CHO QUẢN TRỊ VIÊN ---
  // Tạo một đường dẫn đăng nhập ẩn (Khó đoán) dành riêng cho Admin
  {
    path: '/portal-qtv-99x', 
    name: 'AdminLogin',
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/AdminDashboard.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// BẢO VỆ CỔNG (Navigation Guard) - Cú pháp chuẩn Vue 4
router.beforeEach((to, from) => {
  const userRole = localStorage.getItem('userRole'); 

  // Nếu trang muốn vào có gắn cờ requiresAdmin
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (userRole === 'Admin') {
      return true; // Đúng Admin -> Cho qua
    } else {
      alert("Bạn không có quyền truy cập khu vực này!");
      return '/'; // Đá về trang chủ thay vì dùng next('/')
    }
  }
  
  return true; // Các trang bình thường thì đi thoải mái
})

export default router