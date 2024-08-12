import React, { useEffect, useState } from "react";
import { getTodosList } from "../services/todosService";

export default function HomePage() {
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    let unsubscribeTodos;
    getTodosList(
      () => {
        // setLoading(true);
      },
      (successData) => {
        // setLoading(false);
        const mappedTodos = successData?.map((todo) => {
          return {
            title: todo?.title,
            description: todo?.description,
            is_completed: todo?.is_completed
          };
        });
        setTodos(mappedTodos);
      },
      (error) => {
        // setLoading(false);
        console.log("error while fetching todos", error);
      }
    ).then((unsub) => {
     unsubscribeTodos = unsub;
    });
    return () => {
      if (unsubscribeTodos) {
        unsubscribeTodos();
      }
    };
  }, []);

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
