import React, { useState, Fragment } from "react";
import Check from '@material-ui/icons/Check';
import './color.css'
const Color = (props) => {
  // this is custom color pallate u can send 12 colors as a data.
  // one funtion which will return the color selected
  
  return(
        
        <div className="colorpallate_row">
        {props.colors.map((item,index)=>(
            <button  key={index} onClick={()=>props.hadleSelect(index)} style={{background:'transparent',border:'none',outline:'none',padding:0,marginRight:0}}>
            <div className="colorpallate_element" style={{background:item.color}}>
            {item.isSelect?
            <div  className="colorpallate_close">
              <Check   style={{color:item.color,fontSize:"10px",outline:'none'}}/>
            </div>:null
            }
           </div>
           </button>
        ))
          
        }
        </div>
  )
  
};

export default Color;
