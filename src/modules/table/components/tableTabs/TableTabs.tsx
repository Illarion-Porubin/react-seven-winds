import style from "./TableTabs.module.sass";


const TableTabs = () => {
  
  return (
    <div className={style.headProject}>
      {new Array(1).fill("").map((_, id: number) => (
        <button className={style.tableProject} key={id}>
          Строительно-монтажные работы
        </button>
      ))}
    </div>
  );
};

export default TableTabs;
