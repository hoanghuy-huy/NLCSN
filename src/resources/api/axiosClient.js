const axiosClient = axios.create({
    baseURL: 'http://your-api-url.com', // Cung cấp URL cơ sở của API
    headers: {
      'Content-Type': 'application/json',
      // Các header khác tùy chọn
    },
  });
  
  function login() {
    const loginForm = document.getElementById("loginForm");
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Ngăn chặn gửi biểu mẫu mặc định
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      // Gửi yêu cầu đăng nhập đến máy chủ
      axiosClient.post('/login', { username, password })
        .then(response => {
          // Xử lý response sau khi đăng nhập thành công
          console.log(response.data);
          // Lưu token vào localStorage
          localStorage.setItem("accessToken", response.data.accessToken);
          
          // Chuyển hướng hoặc thực hiện các hoạt động khác sau khi đăng nhập thành công
        })
        .catch(error => {
          // Xử lý lỗi đăng nhập
          console.error(error);
        });
    });
  }