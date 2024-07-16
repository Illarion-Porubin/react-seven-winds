import React from "react";
import style from "./TableList.module.sass";
import FileIcon from "../../../../assets/file.png";
import TrashIcon from "../../../../assets/TrashFill.png";
import TableInputs from "../tableInput/TableInputs";
import { IDataNode, IUseNode } from "../../../../types";

import Xarrow from "react-xarrows";
import { useNode } from "../../../../hooks/useNode";

interface Props {
  node: IDataNode;
  id: number;
}

const TableList: React.FC<Props> = ({ node, id }) => {
  const [active, setActive] = React.useState<number | null>(null);
  const { myNode }: IUseNode = useNode({ node });

  const renderTree = (nodes: IDataNode[], id: number) => {
    return nodes.map((node) => (
      <TableList node={node} id={id + 1} key={node.id} />
    ));
  };

  // Ошибка Warning: validateDOMNesting(...): <div> cannot appear as a child of <tbody>, ругается не на div на 61стр, а на Xarrow 31стр
  const renderLine = (nodes: IDataNode[]) => {
    return nodes.map((child) => (
      <React.Fragment key={child.id}>
        <Xarrow 
          start={String(node.id)} 
          end={String(child.id)} 
          key={`${node.id}-${child.id}`}
          path="grid"
          gridBreak="50%"
          startAnchor="bottom"
          endAnchor="left"
          strokeWidth={1}
          color="#C6C6C6"
          showHead={false}
         />
      </React.Fragment>
    ));
  };

  // эти ключи будут динамически заменяться для обновления узла
  const editingFields: { value: string | number; key: keyof IDataNode }[] = [
    { value: node.rowName, key: "rowName" },
    { value: node.mimExploitation, key: "mimExploitation" },
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
              id={String(node.id)}
              className={style.icon}
              disabled={!!active}
              style={{ zIndex: active ? -10 : 0 }}
              type="image"
              name={`file`}
              alt="fileIcon"
              src={FileIcon}
              onClick={myNode.handleAddChild}
            />
            <input
              className={style.icon}
              disabled={!!active || active === 0}
              type="image"
              name="trash"
              alt="trashIcon"
              src={TrashIcon}
              onClick={() => myNode.handleDeleteChild(Number(node.id))}
            />
          </div>
        </td>
        {editingFields.map((field, idx) => (
          <TableInputs
            key={idx}
            field={field}
            active={active}
            setActive={setActive}
            node={node}
          />
        ))}
      </tr>
      {node.child && node.child.length > 0 && renderTree(node.child, id)} 
      {node.child && node.child.length > 0 && renderLine(node.child)}
    </>
  );
};

export default TableList;