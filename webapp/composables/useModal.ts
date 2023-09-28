export default function useModal(
  ref: Ref<any>,
  error?: Ref<string>,
  applicationName?: Ref<string>
) {
  const showModal = () => {
    ref.value.showModal();
  };
  const closeModal = () => {
    applicationName ? (applicationName.value = '') : null;
    error ? (error.value = '') : null;
    ref.value.closeModal();
  };
  return { showModal, closeModal };
}
