import React from 'react';
import style from "./Item.module.scss"

interface Props {
    level: number;
}

const Item:React.FC<Props> = ({ level }) => {
  const [children, setChildren] = React.useState<JSX.Element[]>([]);

  const handleClick = () => {
    setChildren([...children, <Item key={children.length} level={level + 1} />]);
  };

  return (
    <div className={style.item} style={{ marginLeft: level * 20, border: '1px solid #000', padding: '10px', margin: '10px 0' }}>
      <span className="file-icon" style={{ cursor: 'pointer' }} onClick={handleClick}>📁</span>
      <h3>Title</h3>
      <p>Description</p>
      {children}
    </div>
  );
}

export default Item;
