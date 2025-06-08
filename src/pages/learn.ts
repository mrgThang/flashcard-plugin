import '../../styles.css';
import { marked } from "marked";

const cardList = [
    {
        front: "OOP là gì?",
        back: `
**Lập trình hướng đối tượng (OOP)** là một phương pháp lập trình dựa trên khái niệm *đối tượng*.

4 tính chất chính:
- **Đóng gói** (Encapsulation)
- **Kế thừa** (Inheritance)
- **Đa hình** (Polymorphism)
- **Trừu tượng** (Abstraction)

Giúp mã dễ tái sử dụng, mở rộng và bảo trì.
        `,
        duration: { forgot: 1, struggled: 3, almost: 7, gotit: 30 }
    },
    {
        front: "REST API là gì?",
        back: `
**REST API** (Representational State Transfer) là kiến trúc phần mềm cho các dịch vụ web.

Phương thức chính:
- **GET**: lấy dữ liệu
- **POST**: tạo dữ liệu mới
- **PUT/PATCH**: cập nhật dữ liệu
- **DELETE**: xoá dữ liệu

REST API tuân thủ nguyên lý *stateless*, *cacheable*, *client-server separation*.
        `,
        duration: { forgot: 1, struggled: 3, almost: 7, gotit: 30 }
    },
    {
        front: "Sự khác biệt giữa synchronous và asynchronous",
        back: `
- **Synchronous (đồng bộ)**: các tác vụ thực hiện tuần tự, chờ tác vụ hiện tại hoàn tất.
    - VD: Gọi API chờ kết quả trả về.

- **Asynchronous (bất đồng bộ)**: các tác vụ có thể thực hiện song song, không chặn luồng chính.
    - VD: Gửi request HTTP và tiếp tục xử lý UI.
        `,
        duration: { forgot: 1, struggled: 3, almost: 7, gotit: 30 }
    },
    {
        front: "Ưu và nhược điểm của microservice architecture",
        back: `
**Ưu điểm:**
- Dễ mở rộng (scalable) từng dịch vụ.
- Dễ triển khai liên tục (CI/CD).
- Tăng độ chịu lỗi.

**Nhược điểm:**
- Độ phức tạp cao hơn monolith.
- Giao tiếp giữa service phức tạp.
- Cần hạ tầng mạnh (monitoring, service discovery).
        `,
        duration: { forgot: 1, struggled: 3, almost: 7, gotit: 30 }
    },
    {
        front: "Garbage Collector trong Java hoạt động như thế nào?",
        back: `
**Garbage Collector (GC)** tự động quản lý bộ nhớ trong Java.

Cơ chế hoạt động:
- Đánh dấu các đối tượng còn được tham chiếu (*mark*).
- Dọn dẹp các đối tượng không còn được tham chiếu (*sweep*).

Java chia heap thành:
- **Young Generation**: quét nhanh.
- **Old Generation**: quét chậm hơn.

GC giúp tránh *memory leak*, giảm lỗi quản lý bộ nhớ.
        `,
        duration: { forgot: 1, struggled: 3, almost: 7, gotit: 30 }
    }
]


export function renderLearnView(
    container: HTMLElement,
    onGoToDeckDetail: () => void,
) {
    let currentIndex = 0;
    let remainingCards = cardList.length;
    container.empty();

    // Header Row
    const headerRow = container.createDiv({ cls: "header-row" });
    const backIcon = headerRow.createDiv({ cls: "back-icon" });
    backIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`;
    backIcon.onclick = (event) => onGoToDeckDetail();
    headerRow.createEl("h2", { text: "Learn" });

    // Remain container
    const remainContainer = container.createDiv({ cls: "learn-remain-container" })

    // Card container
    const cardContainer = container.createDiv({ cls: "learn-card-container" });

    // Options container
    const options = container.createDiv({ cls: "learn-options-grid" });

    function renderCard() {
        cardContainer.empty();
        options.empty();
        remainContainer.empty();

        if (currentIndex >= cardList.length) {
            onGoToDeckDetail();
            return;
        }

        remainContainer.createEl("h4", { text: `Remaining cards: ${remainingCards}`})

        // Card element (for flip animation)
        const cardEl = cardContainer.createDiv({ cls: "learn-flashcard" });
        const cardInner = cardEl.createDiv({ cls: "learn-flashcard-inner" });
        const cardFront = cardInner.createDiv({ cls: "learn-flashcard-front" });
        cardFront.innerHTML = marked.parse(cardList[currentIndex].front);
        const cardBack = cardInner.createDiv({ cls: "learn-flashcard-back" });
        cardBack.innerHTML = marked.parse(cardList[currentIndex].back);

        // Flip on click
        let flipped = false;
        cardEl.onclick = () => {
            flipped = !flipped;
            if (flipped) cardEl.addClass("flipped");
            else cardEl.removeClass("flipped");
        };

        // Animation
        cardEl.addClass("fade-out");
        setTimeout(() => {
            cardEl.removeClass("fade-out");
            cardEl.addClass("fade-in");
            setTimeout(() => cardEl.removeClass("fade-in"), 300);
        }, 100);

        const duration = cardList[currentIndex].duration;

        const row1 = options.createDiv({ cls: "learn-options-row" });
        const forgotDiv = row1.createDiv({ cls: "learn-option learn-option-forgot" });
        forgotDiv.createDiv({ text: "Forgot", cls: "learn-option-label" });
        forgotDiv.createDiv({ text: `${duration.forgot} day`, cls: "learn-option-days" });

        const struggledDiv = row1.createDiv({ cls: "learn-option learn-option-struggled" });
        struggledDiv.createDiv({ text: "Struggled", cls: "learn-option-label" });
        struggledDiv.createDiv({ text: `${duration.struggled} days`, cls: "learn-option-days" });

        const row2 = options.createDiv({ cls: "learn-options-row" });
        const almostDiv = row2.createDiv({ cls: "learn-option learn-option-almost" });
        almostDiv.createDiv({ text: "Almost there", cls: "learn-option-label" });
        almostDiv.createDiv({ text: `${duration.almost} days`, cls: "learn-option-days" });

        const gotItDiv = row2.createDiv({ cls: "learn-option learn-option-gotit" });
        gotItDiv.createDiv({ text: "Got it!", cls: "learn-option-label" });
        gotItDiv.createDiv({ text: `${duration.gotit} days`, cls: "learn-option-days" });

        // Click handlers
        forgotDiv.onclick = () => { goToNextCard(); };
        struggledDiv.onclick = () => { goToNextCard(); };
        almostDiv.onclick = () => { goToNextCard(); };
        gotItDiv.onclick = () => { goToNextCard(); };
    }

    function goToNextCard() {
        currentIndex++;
        if (currentIndex == cardList.length) {
            onGoToDeckDetail();
            return;
        }
        remainingCards -= 1;
        renderCard();
    }

    renderCard();
}