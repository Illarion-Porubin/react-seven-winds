export interface IDataNode {
  id: number;
  parentId: number | null;
  rowName: string;
  total: number;
  salary: number;
  mimExploitation: number;
  machineOperatorSalary: number;
  materials: number;
  mainCosts: number;
  supportCosts: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  child: IDataNode[];
}

export interface IUseNode {
  myNode: {
    handleAddChild: () => Promise<void>;
    handleDeleteChild: (nodeId: number) => void;
    handleSaveChange: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  }
}