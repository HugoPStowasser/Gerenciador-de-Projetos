import { Message } from "../layout/Message";
import { useLocation } from "react-router-dom";
import styles from "./Projects.module.css";
import { Container } from "../layout/Container";
import { LinkButton } from "../layout/LinkButton";
import { ProjectCard } from "../project/ProjectCard";
import { useEffect, useState } from "react";
import { Loading } from "../layout/Loading";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  const location = useLocation();

  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  const removeProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id));
        setProjectMessage("Projeto removido com sucesso!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.projectContainer}>
      <div className={styles.titleContainer}>
        <h1>Meus projetos</h1>
        <LinkButton to="/newproject" text="Criar projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container customClass="start">
        <div className={styles.flexContainer}>

        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            budget={project.budget}
            category={project.category.name}
            handleRemove={removeProject}
            />
            ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.lenght === 0 && (
          <p>Não há projetos cadastrados!</p>
          )}
          </div>
      </Container>
    </div>
  );
};

export { Projects };
