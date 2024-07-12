import React, { useState } from 'react';
import { addChild, deleteChild, updateNodeValue } from '../../../../redux/slices/contentSlice';
import FileIcon from '../../../../assets/file.png';
import TrashIcon from '../../../../assets/TrashFill.png';
import style from './Item.module.sass';
import { useCustomDispatch, useCustomSelector } from '../../../../hooks/store';
import { selectContentData } from '../../../../redux/selectors';

interface DataNode {
  id: number;
  rowName: string;
  total: number;
  salary: number;
  materials: number;
  mainCosts: number;
  child?: DataNode[];
  level: number; 
}

const Item: React.FC = () => {
  const dispatch = useCustomDispatch();
  const treeData = useCustomSelector(selectContentData)
  const [active, setActive] = useState<number | null>(null);

  console.log(treeData);

  React.useEffect(() => {
    // dispatch(fetchGetContent())
  }, [dispatch])

  const handleAddChild = (parentId: number) => {
    const newFile: DataNode = {
      id: Math.random(), 
      rowName: '',
      total: 0,
      salary: 0,
      materials: 0,
      mainCosts: 0,
      child: [],
      level: 0 // Nesting levels
    };
    dispatch(addChild({ parentId, newChild: newFile }));
  };

  const handleDeleteChild = (nodeId: number) => {
    dispatch(deleteChild(nodeId));
  };

  const handleInputChange = (nodeId: number, index: number, value: string) => {
    dispatch(updateNodeValue({ nodeId, index, value }));
  };

  const handleDoubleClick = (nodeId: number) => {
    setActive(nodeId);
  };

  const handleSaveChange = (e: React.KeyboardEvent<HTMLInputElement>, nodeId: number, index: number) => {
    if (e.key === 'Enter') {
      handleInputChange(nodeId, index, e.currentTarget.value);
      setActive(null)
      console.log(`Saved changes for node ${nodeId}:`, e.currentTarget.value);
    }
  };

  const renderTree = (nodes: DataNode[]) => {
    return nodes.map((node) => (
      <React.Fragment key={node.id}>
        <tr className={style.rowBorder}>
          <td style={{ paddingLeft: `${node.level * 30}px` }}>
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
            node.total.toString(),
            node.salary.toString(),
            node.materials.toString(),
            node.mainCosts.toString(),
          ].map((value, index) => (
            <td key={index} onDoubleClick={() => handleDoubleClick(node.id)}>
              <input
                className={active === node.id ? `${style.editable}` : `${style.disabled}`}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(node.id, index, e.target.value)}
                onKeyDown={(e) => handleSaveChange(e, node.id, index)}
              />
            </td>
          ))}
        </tr>
        {node.child && node.child.length > 0 && renderTree(node.child)}
      </React.Fragment>
    ));
  };

  return (
    <table className="file-tree">
      <thead>
        <tr>
          <th>File</th>
          <th>Row Name</th>
          <th>Total</th>
          <th>Salary</th>
          <th>Materials</th>
          <th>Main Costs</th>
        </tr>
      </thead>
      <tbody>{renderTree(treeData.data)}</tbody>
    </table>
  );
};

export default Item;
