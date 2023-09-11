export default function useMenuLink() {
  const menu = computed(() => [
    {
      text: 'Applications',
      to: '/dashboard/applications'
    },
    {
      text: 'Billings',
      to: '/dashboard/billings'
    },
    {
      text: 'Usage',
      to: '/dashboard/usage'
    }
  ]);

  return { menu };
}
