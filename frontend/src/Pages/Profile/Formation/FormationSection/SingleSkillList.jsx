import styles from "../../../../modules/skills.module.css";
const SingleSkillList = ({ skills, title }) => {
  return (
    <>
      <h3 className={styles.newSkill} style={{ marginTop: "2rem" }}>
        {title}
      </h3>
      <div className={styles.divider}></div>
      {skills.map((skill) => (
        <span className={styles.header} key={skill}>
          {" "}
          {skill}{" "}
        </span>
      ))}
    </>
  );
};

export default SingleSkillList;
