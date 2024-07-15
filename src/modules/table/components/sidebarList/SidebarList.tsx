import React from "react";
import icon from "../../../../assets/icon.png";
import style from "./SidebarList.module.sass"

const SidebarList = () => {
    const [active, setActive] = React.useState(0)


  return (
    <>
        {new Array(10).fill("").map((_, id: number) => (
            <div className={style.project} key={id}>
                <button className={id === active ? `${style.projectBtn} ${style.active}` : style.projectBtn} onClick={() => setActive(id)}>
                    <img className={style.projectIcon} src={icon} alt="projectIcon" />
                    <span className={style.text}>по проекту</span>
                </button>
            </div>
        ))}
    </>
  );
};

export default SidebarList;
