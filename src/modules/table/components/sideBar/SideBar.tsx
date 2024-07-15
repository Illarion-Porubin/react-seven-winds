import style from "./SideBar.module.sass";
import arrow from "../../../../assets/arrow2.png";
import SidebarList from "../sidebarList/SidebarList";


// просто sidebar

const SideBar = () => {
  return (
    <div className={style.sidebar}>
      <div className={style.sidebarInfo}>
        <div className={style.sidebarInfoWrap}>
          <p className={style.title}>Название проекта</p>
          <p className={style.desc}>Аббревиатура</p>
          <button className={style.arrowBtn}>
            <img className={style.arrow} src={arrow} alt="arrow" />
          </button>
        </div>
      </div>
      <div className={style.sidebarList}>
        <SidebarList/>
      </div>
    </div>
  );
};

export default SideBar;
