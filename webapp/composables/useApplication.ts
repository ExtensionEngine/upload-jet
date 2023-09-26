import { Application } from 'types/application';

export default async function useApplication() {
  const config = useRuntimeConfig();

  const applicationList: Ref<Application[] | null> = useState(
    'applicationList',
    () => null
  );

  const { data } = await useApiFetch<Application[]>('applications/list');
  applicationList.value = data.value;

  return { applicationList };
}
