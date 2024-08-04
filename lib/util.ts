import { db, auth, storage } from "./firebase";
import { collection, getDocs, DocumentData, getDoc, setDoc, doc, deleteDoc, updateDoc, serverTimestamp, addDoc, query, where } from "firebase/firestore"; 
import { ref, uploadString, getDownloadURL } from "firebase/storage";

type Item = {
    userId: string;
    id: string;
    name: string;
    quantity: number;
    timestamp: any;
}

export async function getItems() {

    try {
        const userId = auth?.currentUser?.uid;
        if (!userId) throw new Error('User is not authenticated');
    
        const q = query(collection(db, "inventory"), where('id', '==', userId));
        const querySnapshot = await getDocs(q);
        const items: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        return items;
    }
    catch (error) {
        console.error('Error getting documents: ', error);
    }
}

export async function addItem(name: string, quantity: number) {

    try {
        const userId = auth?.currentUser?.uid;
        if (!userId) throw new Error("User not authenticated");
    
        const docRef = await addDoc(collection(db, "inventory"), {
            userId: userId,
            name: name,
            quantity: quantity,
            timestamp: serverTimestamp()
        });
        await setDoc(doc(db, "inventory", docRef.id), {
            id: docRef.id
        }, { merge: true });
    }
    catch (error) {
        console.error('Error adding document: ', error);
    }

}

export async function addItemWithImage(name: string, quantity: number, image: string) {
    try {
        const userId = auth?.currentUser?.uid;
        if (!userId) throw new Error("User not authenticated");

        const storageRef = ref(storage, `images/${userId}/${name}`);
        const snapshot = await uploadString(storageRef, image, 'data_url');
        const imageUrl = await getDownloadURL(snapshot.ref);
    
        const docRef = await addDoc(collection(db, "inventory"), {
            userId: userId,
            imageUrl: imageUrl,
            name: name,
            quantity: quantity,
            timestamp: serverTimestamp()
        });
        await setDoc(doc(db, "inventory", docRef.id), {
            id: docRef.id
        }, { merge: true });
    }
    catch (error) {
        console.error('Error adding document with image: ', error);
    }
}

export async function deleteItem(id: string) {

    try {
        const userId = auth?.currentUser?.uid;
        if (!userId) throw new Error("User not authenticated");
    
        const itemRef = doc(db, "inventory", id);
        const itemDoc = await getDoc(itemRef);
        if (itemDoc.exists() && itemDoc.data().userId === userId) {
            await deleteDoc(itemRef);
        } else {
            throw new Error("Unauthorized or item not found");
        }
    }
    catch (error) {
        console.error('Error deleting document: ', error);
    }
}

export async function updateItem(id: string, name: string, quantity: number) {

    try {
        const userId = auth?.currentUser?.uid;
        if (!userId) throw new Error("User not authenticated");
    
        const itemRef = doc(db, "inventory", id);
        const itemDoc = await getDoc(itemRef);
        if (itemDoc.exists() && itemDoc.data().userId === userId) {
            await updateDoc(itemRef, {
                name: name,
                quantity: quantity,
                timestamp: serverTimestamp()
            });
        } else {
            throw new Error("Unauthorized or item not found");
        }
    }
    catch (error) {
        console.error('Error updating document: ', error);
    }

}

// export async function getItemsByQuantityFilter(min: number, max: number) {
//     const q = query(collection(db, "inventory"),
//         where('quantity', '>=', min),
//         where('quantity', '<=', max));
//     const querySnapshot = await getDocs(q);
//     const items: DocumentData[] = [];
//     querySnapshot.forEach((doc) => {
//       items.push(doc.data());
//     });
//     console.log(items);
//     return items;
// }