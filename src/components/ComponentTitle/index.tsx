import { useLocation } from "react-router-dom";

const ComponentTitle = () => {
  const location = useLocation();

  const showComponentTitle = () => {
    let txt = location.pathname.substring(1, location.pathname.length);
    let longerPath = txt.includes("/");
    if(longerPath){
      let ix = txt.indexOf("/");
      return txt.charAt(0).toUpperCase() + txt.substring(1, ix);
    }
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  };

  return (
    <div className="d-flex justify-content-center">
        <h5 style={{fontFamily: 'Source Serif Pro', fontSize: '19px'}}>{showComponentTitle()}</h5>
    </div>
  );
};

export default ComponentTitle;
