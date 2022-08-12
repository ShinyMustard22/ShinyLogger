import { deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from '../firebase/clientApp';
import { onAuthStateChanged } from 'firebase/auth';
import styles from '../styles/EndHunt.module.css';
import Overlay from './Overlay';

export default function CompleteHunt(props) {
    let uid;

    onAuthStateChanged(auth, user => {
        if (user) {
            uid = user.uid;
        }
    })

    return (
        <>
        <Overlay vis={props.vis}/>
        <div className={styles.message}>
            <h1>Congratulations on completing the hunt!</h1>
            <button className={styles.confirm} onClick={completeHunt}>Confirm</button>
        </div>
        </>
    )

    async function completeHunt() {
        await deleteDoc(props.doc);
        await addDoc(props.completedRef, { 
                name: props.name, 
                encounters: props.encounters ,
                uid: uid,
                huntEnded: serverTimestamp()
            });
    }
}