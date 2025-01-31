import styles from "./mapBtn.module.css";

export const MapBtn = ({
  index,
  classname,
  name,
  ledig,
  setSelected,
  selected,
}) => {
  return (
    <button
      onClick={() => {
        index != selected ? setSelected(index) : setSelected(null);
      }}
      className={
        ledig
          ? selected == index
            ? styles.btnGreen + " " + classname + " " + styles.selectedGreen
            : styles.btnGreen + " " + classname
          : selected == index
          ? styles.btnRed + " " + classname + " " + styles.selectedRed
          : styles.btnRed + " " + classname
      }
    >
      {name}
    </button>
  );
};
