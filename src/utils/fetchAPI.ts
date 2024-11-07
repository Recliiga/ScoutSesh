export default async function fetchAPI(...args: Parameters<typeof fetch>) {
  try {
    const res = await fetch(...args);
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
}
