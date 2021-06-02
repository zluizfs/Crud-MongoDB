import { Divider } from '@material-ui/core';

import './index.css';

export default function SubTitle({ ...props }) {
  return (
    <div className="headerSubtitle">
      <h3>{props.title}</h3>
      <Divider />
    </div>
  )
}