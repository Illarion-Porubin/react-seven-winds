import React from "react";
import style from "./TableInputs.module.sass";
import { IDataNode, IUseNode } from "../../../../types";
import { useNode } from "../../../../hooks/useNode";



interface Props {
  field: { value: string | number; key: string };
  active: number | null;
  setActive: React.Dispatch<React.SetStateAction<number | null>>;
  node: IDataNode;
}


const TableInputs: React.FC<Props> = ({ field, active, setActive, node }) => {
  const [inputValue, setInputValue] = React.useState(field.value);
  const {myNode}: IUseNode = useNode({node, inputValue, inputName: field.key, setActive});

  // убираем возможность редактирование инпута при клике на другой тег
  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.setAttribute("readonly", "true");
    // если сбрасываем поле и устанавливаем active = null
    setInputValue(field.value);
    setActive(null);
  };

  // по двойному клику запускуаем редактирование инпутов
  const handleDoubleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(node.id);
    e.currentTarget.removeAttribute("readonly");
    setActive(node.id);
  };

  // обработчик value инпута, допускаем ввод текста для rowName
  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    return field.key !== "rowName"
      ? e.target.value.replace(/[^\d]/g, "")
      : e.target.value;
  };

  // вешаем стили на активный класс
  // при отсутствии каких либо данных отображайте строку в режиме редактирования
  const checkClass = active === node.id || node.id === 0 ? `${style.cell} ${style.active}` : `${style.cell}`

  return (
    <>
      <td>
        <input
          className={checkClass}    
          type={field.key !== "rowName" ? "number" : "text"}
          value={inputValue}
          name={field.key}
          readOnly={!node.id ? false : true}
          onBlur={onBlur}
          onDoubleClick={(e) => handleDoubleClick(e)}
          onKeyDown={(e) => myNode.handleSaveChange(e, node)}
          onChange={(e) => setInputValue(handler(e))}
        />
      </td>
    </>
  );
};

export default TableInputs;
