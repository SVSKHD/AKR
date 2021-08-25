import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import NAVB from "../../layout/NAV"
import {FaSmile} from "react-icons/fa"

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let history = useHistory();
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCount((currentCount) => --currentCount);
      }, 1000);
      // redirect once count is equal to 0
      count === 0 && history.push("/");
      // cleanup
      return () => clearInterval(interval);
    }, [count , history]);
  
    return (
      <div>
      <NAVB/>
      <br/>
      <div className="container p-5 text-center">
        <FaSmile size={40}/>  
        <br className="mb-2"/>
        <h6 className="Hometext"> 
         Loading up in {count}
        </h6>
      </div>
      </div>
    );
  };
  
  export default LoadingToRedirect;