import style from "./TableHead.module.sass";


const TableHead = () => {
  return (
    <div className={style.headProject}>
      {new Array(2).fill("").map((_, id: number) => (
        <button className={style.tableProject} key={id}>
          Строительно-монтажные работы
        </button>
      ))}
    </div>
  );
};

export default TableHead;
