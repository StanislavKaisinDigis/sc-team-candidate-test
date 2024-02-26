import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { DAYS_OF_WEEK, TIMES } from "./constants";

const heatMapColorForValue = (value: number, maxValue: number) => {
  const h = (1.0 - value / maxValue) * 90;
  return "hsl(" + h + ", 100%, 50%)";
};

function App() {
  const [result, setResult] = useState<{
    maxValue: number;
    timeKeysMap: Map<string, number>;
  } | null>(null);

  useEffect(() => {
    const myWorker = new Worker(new URL("worker.ts", import.meta.url), {
      type: "module",
    });
    myWorker.onmessage = function (event) {
      setResult(event.data);
    };
    if (myWorker) {
      setTimeout(() => {
        myWorker.postMessage(5);
      }, 200);
    }
    return () => {
      myWorker.terminate();
    };
  }, []);

  if (!result) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.daysWrapper}>
          {DAYS_OF_WEEK.map((item) => {
            return <div key={item}>{item}</div>;
          })}
        </div>
        <div>
          <div className={styles.gridWrapper}>
            {result &&
              [...result.timeKeysMap].map((item) => {
                const backgroundColor = heatMapColorForValue(
                  item[1],
                  result.maxValue
                );
                return (
                  <div className={styles.bucket} key={item[0]}>
                    <div
                      className={styles.bucketValue}
                      style={{
                        backgroundColor,
                      }}
                    ></div>
                  </div>
                );
              })}
          </div>
          <div className={styles.timeWrapper}>
            {TIMES.map((item) => {
              return <div key={item}>{item}</div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
