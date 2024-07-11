import ItemList from "./components/itemList/ItemList";
import SideBar from "./components/sideBar/SideBar";
import TableHead from "./components/tableHead/TableHead";
import style from "./Table.module.sass";

const Table = () => {
  return (
    <div className={style.table}>
      <SideBar />
      <div className={style.content}>
        <TableHead />
        <ItemList />
      </div>
    </div>
  );
};

export default Table;
