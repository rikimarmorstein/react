import loadingImage from "../../../Assets/Images/Loading.gif";
import "./Loading.css";

function Loading(): JSX.Element {
    return (
        <div className="Loading">
						<img src={loadingImage}/>

        </div>
    );
}

export default Loading;
