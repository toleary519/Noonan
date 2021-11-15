import firebase from "firebase/compat/app";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "@firebase/firestore";

// const addShotDB = (newDBclub) => {
//   firebase
//     .firestore()
//     .collection("shots")
//     .add({ ...newDBclub })
//     .catch((err) => console.error(err));
// };

// const addShotDB = async (newDBclub) => {
//   const db = getFirestore();
//   // Add a new document with a generated id.
//   const docRef = await addDoc(collection(db, "shots"), { ...newDBclub });
//   console.log("Document written with ID: ", docRef.id);
// };

// const deleteShotDB = async (id) => {
//   await firebase
//     .firestore()
//     .collection("shots")
//     .doc(id)
//     .delete()
//     .catch((err) => console.error(err));
// };

// export { addShotDB };
