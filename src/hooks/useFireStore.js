import React, { useState ,useEffect} from 'react';
import { db } from '../firebase/config';
import {query,orderBy,where, onSnapshot,collection, getDocs} from 'firebase/firestore'
const useFirestore = (collections, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = collection(db,collections);
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }
      
      collectionRef = query(collectionRef,orderBy('createdAt'),where(condition.fieldName,condition.operator,condition.compareValue))
        
    }
    const unsubscribed = onSnapshot((collectionRef),snapshot=>{
            const documents = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            
          }));
          setDocuments(documents);
    })

    
    return unsubscribed;
}, [collections, condition]);
  return documents;
};

export default useFirestore;