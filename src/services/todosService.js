import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const getTodosList = async (
  loadCallBack,
  successCallBack,
  errorCallBack
) => {
  let unsubscribe;
  try {
    loadCallBack();
    unsubscribe = onSnapshot(
      collection(db, "todos"),
      async (querySnapshot) => {
        const todos = [];
        await Promise.all(
          querySnapshot.docs.map(async (document) => {
            todos.push({
              title: document.data().title,
              description: document?.data()?.description,
              is_completed: document?.data()?.is_completed,
            });
          })
        );
        successCallBack(todos);
      }
    );
  } catch (error) {
    errorCallBack(error.message);
  }
  return unsubscribe;
};
