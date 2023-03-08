import styles from "./Container.modules.css";

const Container = (props) => {
  return (
    <div className={`${styles.container} ${styles[props.customClass]}`}>
      {props.children}
    </div>
  );
};

export { Container };
