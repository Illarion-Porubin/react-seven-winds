
import { useAddProjectMutation, useDeleteProjectMutation, useUpdateProjectMutation } from '../redux';
import { IDataNode } from '../types';

interface Props {
  node: IDataNode;
  inputValue?: string | number;
  inputName?: string;
  setActive?: React.Dispatch<React.SetStateAction<number | null>>;
}

//Здесь вся логика API ноды

export const useNode = ({ node, inputName, inputValue, setActive }: Props) => {
  const [addProject] = useAddProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const handleAddChild = async () => {
    const newChild: IDataNode = {
      id: Math.random(),
      parentId: node.id,
      rowName: "",
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
    await addProject({ ...newChild });
  };

  const handleDeleteChild = (nodeId: number) => {
    deleteProject(nodeId);
  };

  const handleSaveChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.setAttribute("readonly", "true");
      const target = e.target as HTMLInputElement;
      if (target.type === "number") {
        updateProject({ ...node, [`${inputName}`]: Number(inputValue) });
      }
      updateProject({ ...node, [`${inputName}`]: inputValue });
      if(setActive){
        setActive(null);
      }
    }
  };

  return {
    myNode: {
      handleAddChild,
      handleDeleteChild,
      handleSaveChange
    }
  }
}
