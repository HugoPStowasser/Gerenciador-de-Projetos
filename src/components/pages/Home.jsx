import savings from "../../img/savings.svg"
import { LinkButton } from "../layout/LinkButton";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={styles.homeContainer}>
      <h1>
        Bem vindo ao <span>Costs</span>
      </h1>
      <p>Comece a gerenciar seus projetos agora mesmo</p>
      <LinkButton to="/newproject" text="Criar projeto" />
      <img src={savings} alt="Costs"></img>
    </section>
  );
};

export { Home };
