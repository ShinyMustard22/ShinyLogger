import { deleteDoc } from 'firebase/firestore';
import styles from '../styles/EndHunt.module.css';
import Overlay from './Overlay';

export default function DeleteHunt(props) {
    return (
        <>
        <Overlay vis={props.vis}/>
        <div className={styles.message}>
            <h1>Are you sure you want to delete this hunt?</h1>
            <button className={styles.confirm} onClick={deleteHunt}>Yes</button>
        </div>
        </>
    )

    async function deleteHunt() {
        await deleteDoc(props.doc)
    }
}