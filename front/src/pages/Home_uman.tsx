import { useQuery } from "@apollo/client";
import { GET_ALL_ITEMS } from "../queries";
import { Items } from "../interfaces";

export default function Home() {
  const { data, error, loading } = useQuery<Items>(GET_ALL_ITEMS);

  if (loading) return <div>Завантаження....</div>;
  // if (error) return <div>Помилка: {error.message}</div>;
  if (error) return <div>Помилка: {JSON.stringify(error)}</div>;

  return (
    <div>
      <h2>Список товарів</h2>
      {data?.items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
