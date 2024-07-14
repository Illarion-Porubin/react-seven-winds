import React from "react";
import style from "./TableList.module.sass";
import { IDataNode } from "../../../../types";
import { useCustomDispatch } from "../../../../hooks/store";
import {
  addChild,
  deleteChild,
  fetchCreateRowInEntity,
  fetchDeleteRow,
} from "../../../../redux/slices/contentSlice";
import FileIcon from "../../../../assets/file.png";
import TrashIcon from "../../../../assets/TrashFill.png";
import TableInputs from "../tableInput/TableInputs";


interface Props {
  node: IDataNode;
  id: number;
}

const TableList: React.FC<Props> = ({ node, id }) => {
  const dispatch = useCustomDispatch();
  const [active, setActive] = React.useState<number | null>(null);

  const handleAddChild = (parentId: number) => {
    const newFile: IDataNode = {
      id: Math.random(),
      rowName: "string",
      total: 0,
      salary: 0,
      mimExploitation: 0,
      machineOperatorSalary: 0,
      materials: 0,
      mainCosts: 0,
      supportCosts: 0,
      equipmentCosts: 0,
      overheads: 0,
      estimatedProfit: 0,
      child: [],
    };
    dispatch(fetchCreateRowInEntity({ parentId, newChild: newFile }));
    dispatch(addChild({ parentId, newChild: newFile }));
  };

  const handleDeleteChild = (nodeId: number) => {
    dispatch(fetchDeleteRow(nodeId));
    dispatch(deleteChild(nodeId));
  };

  const renderTree = (nodes: IDataNode[], id:number) => {
    return nodes.map((node) => <TableList node={node} id={id + 1} key={node.id}/>);
  };

  return (
    <React.Fragment key={node.id}>
      <tr className={style.rowBorder}>
        <td style={{ paddingLeft: `${id * 20}px` }}>
          <div className={style.icons}>
            <input
              className={style.icon}
              disabled={!!active || active === 0}
              type="image"
              id="file"
              alt="fileIcon"
              src={FileIcon}
              onClick={() => handleAddChild(node.id)}
            />
            <input
              className={style.icon}
              disabled={!!active || active === 0}
              type="image"
              id="trash"
              alt="trashIcon"
              src={TrashIcon}
              onClick={() => handleDeleteChild(node.id)}
            />
          </div>
        </td>
        {[
          node.rowName,
          node.total,
          node.salary,
          node.materials,
          node.mainCosts,
        ].map((value, id) =>
          <TableInputs value={value} active={active} key={id} setActive={setActive} nodeId={node.id} index={id}/>
        )}
      </tr>
      {node.child && node.child.length > 0 && renderTree(node.child, id)}
    </React.Fragment>
  );
};

export default TableList;
