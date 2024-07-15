import React from "react";
import style from "./TableHead.module.sass";
import TableList from "../TableList/TableList";
import { IDataNode, IUseNode } from "../../../../types";
import { useGetProjectsQuery } from "../../../../redux";
import { useNode } from "../../../../hooks/useNode";

// верхушка таблицы, здесь наименование столбцов, далее мапим саму таблицу

const TableHead: React.FC = () => {
  const { data = [], isLoading } = useGetProjectsQuery(undefined);
  const { myNode }: IUseNode = useNode({});

  if (isLoading) return <h1>Loading...</h1>;

  // проверяем если массив пуст. 
  // при отсутствии каких либо данных отображайте строку в режиме редактирования.
  // готово)
  const displayData = data.length > 0 ? data : [myNode.newNode];

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
        {displayData.map((node: IDataNode, id: number) => (
          <TableList node={node} key={id} id={0} />
        ))}
      </tbody>
    </table>
  );
};

export default TableHead;
