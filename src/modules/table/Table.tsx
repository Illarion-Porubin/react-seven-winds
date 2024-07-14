import SideBar from "./components/sideBar/SideBar";
import TableTabs from "./components/tableTabs/TableTabs";
import style from "./Table.module.sass";
import TableHead from "./components/tableHead/TableHead";

const Table = () => {
  return (
    <div className={style.table}>
      <SideBar />
      <div className={style.content}>
        <TableTabs />
        <div className={style.list}>
          <TableHead />
        </div>
      </div>
    </div>
  );
};

export default Table;
