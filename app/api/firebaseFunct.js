import firebase from "firebase/compat/app";
import { collection, getDocs } from "firebase/compat/firestore";

const addShotDB = (newDBclub) => {
  firebase
    .firestore()
    .collection("shots")
    .add({ ...newDBclub })
    // .then((snapshot) => snapshot.get())
    // .then((shotData) => shotData.data())
    .catch((err) => console.error(err));
};

export { addShotDB };
