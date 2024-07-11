import React from "react";
import icon from "../../assets/icon.png";
import arrow from "../../assets/arrow.png";
import style from "./Head.module.sass";

export const Head = () => {
  const navlist = ["Просмотр", "Управление"];
  const [active, setActive] = React.useState(0);

  return (
    <div className="container">
      <div className={style.head}>
        <nav className={style.navigate}>
          <button className={style.navIcon}>
            <img src={icon} alt={"icon"} />
          </button>
          <button className={style.navIcon}>
            <img src={arrow} alt={"arrow"} />
          </button>
          <ul className={style.navlist}>
            {navlist.map((item, id: number) => (
                <li className={style.item} key={id}>
                <button className={id === active ? `${style.itemBtn} ${style.active}` : style.itemBtn} onClick={() => setActive(id)}>
                    {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
