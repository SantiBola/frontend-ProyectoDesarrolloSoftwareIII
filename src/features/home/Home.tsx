import CateringPage from "../../components/Catering";
import { Reservation } from "../../components/Reservation";
import Schedule from "../../components/Schedule";

export default function Home() {
    return (
        <div>
            
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            <Schedule />
            <Reservation />
            <CateringPage/>
        </div>
    );
}