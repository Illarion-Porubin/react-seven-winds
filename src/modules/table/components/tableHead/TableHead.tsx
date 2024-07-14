import React from "react";
import style from "./TableHead.module.sass";
import { fetchGetTreeRows } from "../../../../redux/slices/contentSlice";
import { useCustomDispatch, useCustomSelector } from "../../../../hooks/store";
import { selectContentData } from "../../../../redux/selectors";
import TableList from "../TableList/TableList";


const TableHead: React.FC = () => {
  const dispatch = useCustomDispatch();
  const treeData = useCustomSelector(selectContentData);

  React.useEffect(() => {
    dispatch(fetchGetTreeRows());
  }, [dispatch]);

  console.log(treeData);

  return (
    <table>
      <thead>
        <tr className={style.categories}>
          <th>Уровень</th>
          <th>Наименование работ</th>
          <th>Основная з/п</th>
          <th>Оборудование</th>
          <th>Накладные расходы</th>
          <th>Сметная прибыль</th>
        </tr>
      </thead>
      <tbody>
        {
          treeData.data.map((node, id) => (
            <TableList node={node} key={id} id={0}/>
          ))
        }
      </tbody>
    </table>
  );
};

export default TableHead;
