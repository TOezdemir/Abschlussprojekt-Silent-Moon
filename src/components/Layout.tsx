import { Outlet } from "react-router-dom";
import "./layout.css";

export default function Layout(){
    return (
        <div className="layout">
          <div className="phone-frame">
            <div className="screen">
              <Outlet /> 
            </div>
          </div>
        </div>
      );
    }