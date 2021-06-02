import React from 'react';

import './index.css';

export default function PageTitle({...props}){
  return (
    <div className="pageTitle">     
      <h2>{props.title}</h2>
      <p>{props.subtitle}</p>
    </div>
  )
}