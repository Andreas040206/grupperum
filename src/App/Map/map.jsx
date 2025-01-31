import styles from "./map.module.css";
import mapSrc from "../../assets/map.png";
import { MapBtn } from "./MapBtn/mapBtn";

export const Map = ({ roomList, selected, setSelected }) => {
  const btnStyleList = [
    styles.btn1 + " " + styles.sal2,
    styles.btn2 + " " + styles.sal2,
    styles.btn3 + " " + styles.sal2,
    styles.btn4 + " " + styles.sal1,
    styles.btn5 + " " + styles.sal1,
    styles.btn6 + " " + styles.sal1,
    styles.btn7 + " " + styles.stuen,
    styles.btn8 + " " + styles.stuen,
    styles.btn9 + " " + styles.stuen,
    styles.btn10 + " " + styles.stuen,
  ];

  return (
    <div className={styles.contentCon}>
      <div className={styles.con}>
        <img className={styles.map} src={mapSrc} />
        {roomList.map((obj, index) => {
          return (
            <MapBtn
              classname={styles.btn + " " + btnStyleList[index]}
              name={obj.name}
              index={index}
              ledig={obj.ledig}
              setSelected={setSelected}
              selected={selected}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};
