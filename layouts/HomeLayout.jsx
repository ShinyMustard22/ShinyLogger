import Navbar from "../components/Navbar";

export default function HomeLayout(props) {
    return (
        <>
        <Navbar/>
        {props.children}
        </>
    );
}