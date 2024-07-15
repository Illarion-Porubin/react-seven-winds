
import { useAddProjectMutation, useDeleteProjectMutation, useGetProjectsQuery, useUpdateProjectMutation } from '../redux';
import { IDataNode } from '../types';

interface Props {
  node?: IDataNode;
  inputValue?: string | number;
  inputName?: string;
  setActive?: React.Dispatch<React.SetStateAction<number | null>>;
}

//Здесь вся логика API ноды

export const useNode = ({ node, inputName, inputValue, setActive }: Props) => {
  const { data = [] } = useGetProjectsQuery(undefined);
  const [addProject] = useAddProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [updateProject] = useUpdateProjectMutation();


  const newNode: IDataNode = {
    id: node && (!!data.length) ? 0 : null,
    parentId: node && (!!data.length) ? node.id : null,
    rowName: "", // после сохранения этот объект отправится в пустой массив data
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

  const handleAddChild = async () => {
    console.log(newNode);
    await addProject({ ...newNode, id: 0 });
  };

  const handleDeleteChild = (nodeId: number) => {
    deleteProject(nodeId);
  };

  const handleSaveChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && node) {
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
      newNode,
      handleAddChild,
      handleDeleteChild,
      handleSaveChange
    }
  }
}
