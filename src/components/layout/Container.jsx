import styles from "./Container.module.css";

const Container = (props) => {
  return (
    <div className={`${styles.container} ${props.customClass}`}>
      {props.children}
    </div>
  );
};

export { Container };
