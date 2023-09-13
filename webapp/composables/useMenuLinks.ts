export default function useMenuLink() {
  const menu = computed(() => [
    {
      text: 'Applications',
      to: '/dashboard/applications',
      icon: 'mdi:application-brackets'
    },
    {
      text: 'Billings',
      to: '/dashboard/billings',
      icon: 'mdi:chart-areaspline'
    },
    {
      text: 'Usage',
      to: '/dashboard/usage',
      icon: 'mdi:cash-usd'
    }
  ]);

  return { menu };
}
