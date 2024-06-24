document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const fileInput = document.getElementById('file-input');
    const dragDropArea = document.getElementById('drag-drop-area');

    let currentIndex = 0;

    function showSlide(index) {
        const slideWidth = slides.clientWidth;
        slides.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.children.length;
        showSlide(currentIndex);
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.children.length) % slides.children.length;
        showSlide(currentIndex);
    }

    nextBtn.addEventListener('click', showNextSlide);
    prevBtn.addEventListener('click', showPrevSlide);

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.src = event.target.result;

                const slide = document.createElement('div');
                slide.classList.add('slide');
                slide.appendChild(img);

                slides.appendChild(slide);
                showSlide(currentIndex);
            };
            reader.readAsDataURL(file);
        });
    }

    fileInput.addEventListener('change', (event) => {
        handleFiles(event.target.files);
    });

    dragDropArea.addEventListener('click', () => fileInput.click());

    dragDropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dragDropArea.classList.add('drag-over');
    });

    dragDropArea.addEventListener('dragleave', () => {
        dragDropArea.classList.remove('drag-over');
    });

    dragDropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dragDropArea.classList.remove('drag-over');
        const files = event.dataTransfer.files;
        handleFiles(files);
    });

});
