import { useEffect, useState } from "react";
import { Map } from "./Map/map";
import { List } from "./List/list";
import styles from "./App.module.css";

function App() {
  const [selected, setSelected] = useState(null);
  const [roomList, setRoomList] = useState([
    { name: "D2316", ledig: false },
    { name: "D2315", ledig: false },
    { name: "Omrode3", ledig: false },
    { name: "D2224", ledig: true },
    { name: "D2222", ledig: true },
    { name: "D2223", ledig: true },
    { name: "D2166", ledig: false },
    { name: "D2163", ledig: false },
    { name: "D2164", ledig: false },
    { name: "Omrode1", ledig: false },
  ]);
  const [showList, setShowList] = useState(window.innerWidth >= 800);

  useEffect(() => {
    const handleResize = () => {
      setShowList(window.innerWidth >= 800);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchDataForAllRooms = () => {
      const roomApiEndpoints = roomList.map(
        (room) =>
          `https://io.adafruit.com/api/v2/Anden/feeds/${room.name.toLocaleLowerCase()}`
      );

      Promise.all(
        roomApiEndpoints.map((endpoint) =>
          fetch(endpoint)
            .then((response) => {
              if (!response.ok) {
                console.warn(
                  `Request failed for ${endpoint} with status ${response.status}`
                );
                return null;
              }
              return response.json();
            })
            .catch((error) => {
              console.warn(`Fetch error for ${endpoint}:`, error);
              return null;
            })
        )
      ).then((results) => {
        setRoomList((prevRoomList) =>
          prevRoomList.map((room, index) => {
            const sensorData = results[index];
            if (sensorData) {
              const sensorValue = parseInt(sensorData.last_value, 10);
              return { ...room, ledig: sensorValue === 1 };
            }
            return room;
          })
        );
      });
    };

    const intervalId = setInterval(fetchDataForAllRooms, 30000); // Fetch every 30 seconds
    fetchDataForAllRooms(); // Fetch immediately on mount

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <div className={styles.con}>
      {showList && (
        <List
          roomList={roomList}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      <Map roomList={roomList} selected={selected} setSelected={setSelected} />
    </div>
  );
}

export default App;
