import React from "react";
import style from "./TableList.module.sass";
import FileIcon from "../../../../assets/file.png";
import TrashIcon from "../../../../assets/TrashFill.png";
import TableInputs from "../tableInput/TableInputs";
import { IDataNode, IUseNode } from "../../../../types";
import { useNode } from "../../../../hooks/useNode";

interface Props {
  node: IDataNode;
  id: number;
}

const TableList: React.FC<Props> = ({ node, id }) => {
  const [active, setActive] = React.useState<number | null>(null);
  const {myNode}: IUseNode = useNode({node}); //вынес всю логику в отдельный хук

  const renderTree = (nodes: IDataNode[], id: number) => {
    return nodes.map((node) => (
      <TableList node={node} id={id + 1} key={node.id} />
    ));
  };

  //мапим нужные поля и ключи к ним, эти ключи будем динамически подставлять для обновления node
  const editingFields: { value: string | number; key: string }[] = [
    { value: node.rowName, key: "rowName" },
    { value: node.total, key: "total" },
    { value: node.salary, key: "salary" },
    { value: node.materials, key: "materials" },
    { value: node.mainCosts, key: "mainCosts" },
  ];

  return (
    <>
      <tr className={style.rowBorder}>
        <td style={{ paddingLeft: `${id * 20}px` }}>
          <div className={style.icons}>
            <input
              className={style.icon}
              disabled={!!active}
              style={{ zIndex: active ? -10 : 0 }}
              type="image"
              name="file"
              alt="fileIcon"
              src={FileIcon}
              onClick={() => myNode.handleAddChild()}
            />
            <input
              className={style.icon}
              disabled={!!active || active === 0}
              type="image"
              name="trash"
              alt="trashIcon"
              src={TrashIcon}
              onClick={() => myNode.handleDeleteChild(node.id)}
            />
          </div>
        </td>
        {editingFields.map((field, id) => (
          // сюда мапятся выбранные инпуты
          <TableInputs
            key={id}
            field={field}
            active={active}
            setActive={setActive}
            node={node}
          />
        ))}
      </tr>
      {node.child && node.child.length > 0 && renderTree(node.child, id)}
    </>
  );
};

export default TableList;
