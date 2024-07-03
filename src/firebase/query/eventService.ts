import {addDoc, collection, getDocs, query, where, doc, getDoc, DocumentData} from "firebase/firestore";
import {firestore} from "../firebase";


export const getEvents = async () => {
    const dateEventsCollection = collection(firestore, "dateEvents");
    const dateEventsSnapshot = await getDocs(dateEventsCollection);
    const eventsData = [];
    for (const dateDoc of dateEventsSnapshot.docs) {
        const date = dateDoc.data().date;
        const eventsCollection = collection(dateDoc.ref, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const events = [];
        eventsSnapshot.forEach((eventDoc) => {
            const eventData = eventDoc.data();
            eventData.id = eventDoc.id; // Ajoutez l'ID de l'événement aux données de l'événement
            events.push(eventData);
        });
        eventsData.push({date: date, events: events});
    }

    return eventsData;
}

export const getEventByDateAndId = async (date: string, eventId: string) => {
    // Récupérer la collection 'dateEvents'
    const dateEventsCollection = collection(firestore, "dateEvents");

    // Créer une requête pour trouver le document avec la date spécifiée
    const dateQuery = query(dateEventsCollection, where("date", "==", date));

    // Exécuter la requête
    const dateSnapshot = await getDocs(dateQuery);
    // Vérifier si un document a été trouvé
    if (!dateSnapshot.empty) {
        // Récupérer le premier document (il devrait y en avoir seulement un avec une date spécifique)
        const dateDoc = dateSnapshot.docs[0];

        // Récupérer la sous-collection 'events' du document trouvé
        const eventsCollection = collection(dateDoc.ref, "events");

        // Récupérer le document avec l'ID d'événement spécifié
        const eventDocRef = doc(eventsCollection, eventId);
        const eventDoc = await getDoc(eventDocRef);
        // Vérifier si le document existe
        if (eventDoc.exists()) {
            // Si le document existe, retourner les données de l'événement
            const eventData = eventDoc.data();
            eventData.id = eventDoc.id; // Ajoutez l'ID de l'événement aux données de l'événement
            return eventData;
        } else {
            console.log("No such event!");
            return null;
        }
    } else {
        console.log("No such date!");
        return null;
    }
}

export const newEvent = async (date: string, event: any) => {
    // get the dateEvents collection
    const dateEventsCollection = collection(firestore, "dateEvents");
    const eventsQuery = query(dateEventsCollection, where("date", "==", date));
    const querySnapshot = await getDocs(eventsQuery);
    let dateDoc
    if (querySnapshot.empty) {
        // if the document with the specified date does not exist, create a new document
        dateDoc = await addDoc(dateEventsCollection, { date: date });
    } else {
        // if the document with the specified date exists, get the reference to the document
        dateDoc = doc(dateEventsCollection, querySnapshot.docs[0].id);
    }
    // get the events collection for the date
    const eventsCollection = collection(dateDoc, "events");
    // add a new event to the collection
    await addDoc(eventsCollection, event);
}