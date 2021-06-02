import React from 'react';
import { Dialog, Grow } from '@material-ui/core';

import './index.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow
    ref={ref} {...props}
  />;
});

export default function DialogBox({...props }) {
  return (
    <Dialog
      {...props}
      fullWidth
      TransitionComponent={Transition}
      maxWidth="sm"
    >
      <div className="modal">
        <div className="modalTitle">
          <h4>{props.title}</h4>
        </div>
        <div className="modalBody">
          {props.children}
        </div>
      </div>

    </Dialog>
  );
}