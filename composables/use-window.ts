import { ref } from 'vue';

export function useWindow() {
  const width = ref(window.innerWidth);

  const handleResize = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
  return { width };
}
