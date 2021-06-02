import { Button } from '@material-ui/core';

import './index.css';

export default function TheButton({...props}) {
  return (
    <Button 
      color="primary"
      className="button"
      disableRipple
      disableElevation
      {...props}
    >
      {props.children}
    </Button>
  )
}