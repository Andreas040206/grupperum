import { useEffect, useRef } from "react";
import styles from "./list.module.css";
import { ListObj } from "./ListObj/ListObj.jsx";

export const List = ({ roomList, selected, setSelected }) => {
  // Create a ref to track the currently selected element
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scroll animation
        block: "nearest", // Center the element in the container
      });
    }
  }, [selected]); // Trigger scrolling when `selected` changes

  return (
    <div className={styles.outerOuterCon}>
      <div className={styles.outerCon}>
        <div className={styles.contentCon}>
          {roomList.map((obj, index) => {
            return (
              <ListObj
                ledig={obj.ledig}
                name={obj.name}
                setSelected={setSelected}
                selected={selected}
                index={index}
                key={index}
                scrollRef={scrollRef} // Pass the ref for the selected item
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
