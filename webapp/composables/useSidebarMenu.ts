export default function useSidebarMenu() {
  const isOpen = ref(false);
  const { isMobile } = useBreakpoint();

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const close = () => {
    isOpen.value = false;
  };

  watch(isMobile, () => close());

  return { isOpen, toggle, close };
}
