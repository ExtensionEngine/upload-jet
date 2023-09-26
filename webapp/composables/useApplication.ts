import { Application } from 'types/application';

export default async function useApplication() {
  const applicationList = ref<Application[] | null>();

  const { data } = await useApiFetch<Application[]>('applications/list');
  applicationList.value = data.value;

  return applicationList;
}
