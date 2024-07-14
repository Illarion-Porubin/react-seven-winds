import React from "react";
import style from "./TableHead.module.sass";
import TableList from "../TableList/TableList";
import { IDataNode } from "../../../../types";
import { useGetProjectsQuery } from "../../../../redux";

const TableHead: React.FC = () => {
  const { data = [], isLoading } = useGetProjectsQuery(undefined);

  if (isLoading) return <h1>Loading...</h1>;

  // верхушка таблицы, здесь наименование столбцов, далее мапим саму таблицу

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
        {data.map((node: IDataNode, id: number) => (
          <TableList node={node} key={id} id={0} />
        ))}
      </tbody>
    </table>
  );
};

export default TableHead;
