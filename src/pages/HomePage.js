import React, { useEffect, useState } from "react";
import { getTodosList } from "../services/todosService";
import { useFirebaseToken } from "../hooks/useFirebaseToken";

export default function HomePage() {
  const token = useFirebaseToken();
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    let unsubscribeTodos;
    if (token) {
      getTodosList(
        () => {},
        (successData) => {
          const mappedTodos = successData?.map((todo) => {
            return {
              title: todo?.title,
              description: todo?.description,
              is_completed: todo?.is_completed,
            };
          });
          setTodos(mappedTodos);
        },
        (error) => {
          console.log("error while fetching todos", error);
        }
      ).then((unsub) => {
        unsubscribeTodos = unsub;
      });
    }
    return () => {
      if (unsubscribeTodos) {
        unsubscribeTodos();
      }
    };
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p>Data from Firebase:</p>
      {todos ? (
        <pre>{JSON.stringify(todos, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
