export default function useModal(ref: Ref<any>) {
  const showModal = () => {
    ref.value.showModal();
  };
  const closeModal = () => {
    ref.value.closeModal();
  };
  return { showModal, closeModal };
}
