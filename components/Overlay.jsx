import styles from '../styles/Overlay.module.css';

export default function Overlay(props) {
  return (
    <div className={styles.overlay} onClick = {() => props.vis(false)}></div>
  )
}