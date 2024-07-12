
import Item from "../item/Item";
import style from "./ItemList.module.sass";

const ItemList = () => {
  return (
    <div className={style.list}>
      <Item/>
    </div>
  );
};

export default ItemList;
