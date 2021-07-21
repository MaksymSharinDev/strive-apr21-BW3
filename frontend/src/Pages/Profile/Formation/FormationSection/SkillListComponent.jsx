import SingleSkillList from "./SingleSkillList";

const SkillListComponent = ({ skills }) => {
  return (
    <>
      <hr />
      <SingleSkillList
        skills={skills.industryKnowledge}
        title="Industry Knowledge"
      />
      <SingleSkillList
        skills={skills.toolsTechnologies}
        title="Tools & Technologies"
      />

      <SingleSkillList
        skills={skills.interpersonalSkills}
        title="Interpersonal Skills"
      />

      <SingleSkillList skills={skills.languages} title="Languages" />

      <SingleSkillList skills={skills.otherSkills} title="Other Skills" />
    </>
  );
};

export default SkillListComponent;
