document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const paginationContainer = document.querySelector('.pagination');

    let currentIndex = 0;

    function showSlide(index) {
        const slideWidth = slides.clientWidth;
        slides.style.transform = `translateX(${-index * slideWidth}px)`;
        currentIndex = index;
        updatePagination();
    }

    function createPagination() {
        paginationContainer.innerHTML = '';
        const numSlides = slides.children.length;

        for (let i = 0; i < numSlides; i++) {
            const button = document.createElement('button');
            button.textContent = i + 1;
            if (i === currentIndex) button.classList.add('active');
            button.addEventListener('click', () => showSlide(i));
            paginationContainer.appendChild(button);
        }
    }

    function updatePagination() {
        Array.from(paginationContainer.children).forEach((button, index) => {
            button.classList.toggle('active', index === currentIndex);
        });
    }

    function showPrevSlide() {
        currentIndex = (currentIndex === 0) ? slides.children.length - 1 : currentIndex - 1;
        showSlide(currentIndex);
    }

    function showNextSlide() {
        currentIndex = (currentIndex === slides.children.length - 1) ? 0 : currentIndex + 1;
        showSlide(currentIndex);
    }

    prevButton.addEventListener('click', showPrevSlide);
    nextButton.addEventListener('click', showNextSlide);

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = function (event) {
                const img = new Image();
                img.src = event.target.result;
                img.classList.add('slider-image');

                const slide = document.createElement('div');
                slide.classList.add('slide');
                slide.appendChild(img);

                slides.appendChild(slide);
                createPagination(); 
                showSlide(currentIndex); 
            };
            reader.readAsDataURL(file);
        });
    }

    function setupFileHandlers() {
        const fileInput = document.getElementById('file-input');
        const dragDropArea = document.getElementById('drag-drop-area');

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
    }

    createPagination();
    setupFileHandlers();
});
