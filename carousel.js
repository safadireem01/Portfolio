// Responsive Carousel for Project Images
document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
  const images = wrapper.querySelector('.project-images');
  const prevBtn = wrapper.querySelector('.carousel-btn.prev');
  const nextBtn = wrapper.querySelector('.carousel-btn.next');

  const scrollBy = () => images.clientWidth;

  nextBtn.addEventListener('click', () => {
    images.scrollBy({ left: scrollBy(), behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    images.scrollBy({ left: -scrollBy(), behavior: 'smooth' });
  });
});