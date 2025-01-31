import styles from "./ListObj.module.css";

export const ListObj = ({
  ledig,
  name,
  selected,
  index,
  scrollRef,
  setSelected,
}) => {
  return (
    <div
      onClick={() => {
        selected == index ? setSelected(null) : setSelected(index);
      }}
      className={
        index == selected ? styles.con + " " + styles.selected : styles.con
      }
      ref={selected === index ? scrollRef : null}
    >
      <div className={styles.header}>
        <span className={styles.text}>{name}</span>
        {ledig ? (
          <div className={styles.ledigText + " " + styles.ledigOrNotText}>
            Ledig
          </div>
        ) : (
          <div className={styles.notLedigText + " " + styles.ledigOrNotText}>
            Optaget
          </div>
        )}
        <button
          className={
            index == selected
              ? styles.flipDropDown + " " + styles.dropDownBtn
              : styles.dropDownBtn
          }
        >
          {"⌄"}
        </button>
      </div>
    </div>
  );
};
