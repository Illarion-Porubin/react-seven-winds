import React from "react";
import style from "./TableInputs.module.sass";
import { useCustomDispatch } from "../../../../hooks/store";
import { updateNodeValue } from "../../../../redux/slices/contentSlice";

interface Props {
  value: string | number;
  active: number | null;
  setActive: React.Dispatch<React.SetStateAction<number | null>>;
  nodeId: number;
  index: number;
}

const TableInputs: React.FC<Props> = ({
  value,
  active,
  setActive,
  nodeId,
  index,
}) => {
  const [inputValue, setInputValue] = React.useState(value);
  const dispatch = useCustomDispatch();

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.setAttribute("readonly", "true");
    setActive(null);
  };

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLInputElement>,
    nodeId: number
  ) => {
    e.currentTarget.removeAttribute("readonly");
    setActive(nodeId);
  };

  const handleSaveChange = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nodeId: number,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.currentTarget.setAttribute("readonly", "true");
      dispatch(updateNodeValue({ nodeId, index, value: String(inputValue) }));
      setActive(null);
    }
  };

  return (
    <>
      {!isNaN(Number(inputValue)) && isFinite(Number(inputValue)) ? (
        <td>
          <input
            className={
              active === nodeId
                ? `${style.cell} ${style.active}`
                : `${style.cell}`
            }
            type="number"
            value={inputValue}
            readOnly
            onBlur={onBlur}
            onDoubleClick={(e) => handleDoubleClick(e, nodeId)}
            onKeyDown={(e) => handleSaveChange(e, nodeId, index)}
            onChange={(e) => setInputValue(e.target.value.replace(/[^\d]/g, ""))}
          />
        </td>
      ) : (
        <td>
          <input
            className={
              active === nodeId
                ? `${style.cell} ${style.active}`
                : `${style.cell}`
            }
            type="text"
            value={inputValue}
            readOnly
            onBlur={onBlur}
            onDoubleClick={(e) => handleDoubleClick(e, nodeId)}
            onKeyDown={(e) => handleSaveChange(e, nodeId, index)}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </td>
      )}
    </>
  );
};

export default TableInputs;
