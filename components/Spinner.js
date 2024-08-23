import { BounceLoader } from "react-spinners";
export default function Spinner(props){
    return(
        <BounceLoader color={props.color} speedMultiplier={props.speed} size={props.size}/>
    )
}