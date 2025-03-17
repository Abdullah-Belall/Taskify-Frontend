import styles from "@/app/styles/loader.module.css";

export default function Loader() {
  return (
    <div className="fixed w-full h-dvh bg-myOverlay z-10 flex flex-col justify-center items-center">
      <div className={styles.loader}>
        <div className={styles.loadingText}>
          Loading<span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
        </div>
        <div className={styles.loadingBarBackground}>
          <div className={styles.loadingBar}>
            <div className={styles.whiteBarsContainer}>
              <div className={styles.whiteBar}></div>
              <div className={styles.whiteBar}></div>
              <div className={styles.whiteBar}></div>
              <div className={styles.whiteBar}></div>
              <div className={styles.whiteBar}></div>
              <div className={styles.whiteBar}></div>
              <div className={styles.whiteBar}></div>
              <div className={styles.whiteBar}></div>
              <div className={styles.whiteBar}></div>
              <div className={styles.whiteBar}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
