<template>
  <div style="display: flex; min-height: 100vh;">
    <!-- Sidebar dọc cho Admin -->
    <aside style="width: 250px; background-color: #2c3e50; color: white; padding: 20px;">
      <h3>🛠️ Bảng Điều Khiển</h3>
      <ul style="list-style: none; padding: 0; line-height: 2;">
        <li>Quản lý Phim</li>
        <li>Quản lý Suất chiếu</li>
        <li>Thống kê</li>
      </ul>
    </aside>

    <!-- Nơi nhúng nội dung trang Admin -->
    <main style="flex: 1; padding: 20px; background-color: #f4f6f9;">
      <router-view />
    </main>
  </div>
</template>