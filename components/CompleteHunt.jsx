import { deleteDoc, addDoc } from 'firebase/firestore';
import styles from '../styles/EndHunt.module.css';
import Overlay from './Overlay';

export default function CompleteHunt(props) {
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
        await addDoc(props.completedRef, { name: props.name, encounters: props.encounters });
    }
}