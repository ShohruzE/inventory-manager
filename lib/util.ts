import { db } from "./firebase";
import { collection, getDocs, DocumentData, setDoc, doc, deleteDoc, updateDoc, serverTimestamp, addDoc } from "firebase/firestore"; 

type Item = {
    id: string;
    name: string;
    quantity: number;
    timestamp: any;
}

export async function getItems() {
    const querySnapshot = await getDocs(collection(db, "inventory"));
    const items: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    return items;
}

export async function addItem(name: string, quantity: number) {
    const docRef = await addDoc(collection(db, "inventory"), {
        name: name,
        quantity: quantity,
        timestamp: serverTimestamp()
    });
    await setDoc(doc(db, "inventory", docRef.id), {
        id: docRef.id
    }, { merge: true }
    );
}

export async function deleteItem(id: string) {
    await deleteDoc(doc(db, "inventory", id));
}

export async function updateItem(id: string, name: string, quantity: number) {
    const itemRef = doc(db, "inventory", id);
    await updateDoc(itemRef, {
        name: name,
        quantity: quantity,
        timestamp: serverTimestamp()
    });
}