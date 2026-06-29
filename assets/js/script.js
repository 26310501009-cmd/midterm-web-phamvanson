document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // 1. CHỨC NĂNG TÌM KIẾM & LỌC HOẠT ĐỘNG
    // ==========================================
    const searchBar = document.getElementById("searchBar");
    const categoryFilter = document.getElementById("categoryFilter");
    const activityCards = document.querySelectorAll(".activity-card");

    function filterActivities() {
        const searchText = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        activityCards.forEach(card => {
            const title = card.querySelector(".card-title").innerText.toLowerCase();
            const category = card.getAttribute("data-category");

            // Kiểm tra xem thẻ có khớp chữ tìm kiếm và khớp danh mục lọc không
            const matchSearch = title.includes(searchText);
            const matchCategory = (selectedCategory === "all") || (category === selectedCategory);

            if (matchSearch && matchCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Bắt sự kiện khi gõ vào ô tìm kiếm hoặc chọn menu thả xuống
    searchBar.addEventListener("input", filterActivities);
    categoryFilter.addEventListener("change", filterActivities);

    // ==========================================
    // 2. CHỨC NĂNG MODAL XEM CHI TIẾT
    // ==========================================
    const detailButtons = document.querySelectorAll(".btn-detail");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");

    detailButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Lấy dữ liệu từ thuộc tính data-* của nút được click
            const title = this.getAttribute("data-title");
            const text = this.getAttribute("data-text");

            // Gán dữ liệu vào Modal
            modalTitle.innerText = title;
            modalDescription.innerText = text;
        });
    });

    // ==========================================
    // 3. CHỨC NĂNG KIỂM TRA FORM LIÊN HỆ (VALIDATION)
    // ==========================================
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("formSuccessMessage");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Chặn việc tải lại trang
        
        let isValid = true;
        
        // Lấy các ô input
        const fullName = document.getElementById("fullName");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const message = document.getElementById("message");

        // Reset trạng thái báo lỗi ban đầu
        [fullName, email, phone, message].forEach(input => input.classList.remove("is-invalid"));
        successMessage.classList.add("d-none");

        // Kiểm tra Họ Tên (Không để trống)
        if (fullName.value.trim() === "") {
            fullName.classList.add("is-invalid");
            isValid = false;
        }

        // Kiểm tra Email (Phải có @ và dấu chấm)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.classList.add("is-invalid");
            isValid = false;
        }

        // Kiểm tra Số điện thoại (Phải là số và dài 10-11 ký tự)
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phone.value.trim())) {
            phone.classList.add("is-invalid");
            isValid = false;
        }

        // Kiểm tra Lời nhắn (Không để trống)
        if (message.value.trim() === "") {
            message.classList.add("is-invalid");
            isValid = false;
        }

        // Nếu tất cả hợp lệ -> Báo thành công và xóa trắng form
        if (isValid) {
            successMessage.classList.remove("d-none");
            contactForm.reset();
        }
    });

    // ==========================================
    // 4. CHỨC NĂNG NÚT QUAY VỀ ĐẦU TRANG (BACK TO TOP)
    // ==========================================
    const backToTopBtn = document.getElementById("backToTopBtn");

    // Khi cuộn chuột xuống 300px thì hiện nút
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    // Khi click vào nút thì cuộn mượt lên trên cùng
    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const courseForm = document.getElementById("courseForm");
    
    if (courseForm) {
        courseForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Ngăn tải lại trang
            
            let isValid = true;
            const name = document.getElementById("courseName");
            const phone = document.getElementById("coursePhone");
            const email = document.getElementById("courseEmail");
            const successMsg = document.getElementById("courseSuccess");

            // Xóa thông báo lỗi cũ
            [name, phone, email].forEach(input => input.classList.remove("is-invalid"));
            successMsg.classList.add("d-none");

            // Validate Tên
            if (name.value.trim() === "") {
                name.classList.add("is-invalid");
                isValid = false;
            }

            // Validate SĐT (10 số)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.value.trim())) {
                phone.classList.add("is-invalid");
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                email.classList.add("is-invalid");
                isValid = false;
            }

            // Nếu đúng hết, hiển thị thông báo thành công
            if (isValid) {
                successMsg.classList.remove("d-none");
                courseForm.reset();
                
                // Ở phần nâng cao, bạn có thể thêm lệnh lưu vào localStorage ở đây
                // localStorage.setItem("registeredCourse", "Khóa Học Thuyết Trình");
            }
        });
    }
});