import {collection, getDocs, query} from "firebase/firestore";
import {firestore} from "../firebase";

export const getCategories = async () => {
    const categoriesCollection = collection(firestore, "categories");
    const categoriesQuery = query(categoriesCollection);
    const categoriesSnapshot = await getDocs(categoriesQuery);
    const categoriesData = [];
    categoriesSnapshot.forEach((doc) => {
        const category = doc.data().categories;
        categoriesData.push(...category);
    });
    return categoriesData.sort()
};