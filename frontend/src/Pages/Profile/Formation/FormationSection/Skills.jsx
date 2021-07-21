import { Button, Card } from "react-bootstrap";
import styles from "../../../../modules/skills.module.css";
import skillList from "../../../../data/skills.json";
import SkillListComponent from "./SkillListComponent";
import { IconContext } from "react-icons";
import { BsPencil } from "react-icons/bs";
import { GrCompliance } from "react-icons/gr";
import { useState, useEffect } from "react";
const Skills = () => {
  const [skills, setSkills] = useState(skillList.skills);
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <Card>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <h4 className={styles.header}>Skills & endorsements</h4>
            <div className={styles.buttons}>
              <p className={styles.newSkill}>Add a new skill</p>
              <IconContext.Provider value={{ className: styles.icon }}>
                <div>
                  <BsPencil />
                </div>
              </IconContext.Provider>
            </div>
          </div>
          <div>
            <Button variant="outline-primary" className={styles.quiz}>
              Take skill quiz
            </Button>
          </div>
          <div className={styles.endorsemenets}>
            {skills.endorsements.map((item) =>
              item.passed ? (
                <div key={item.name}>
                  <h6>{item.name}</h6> <div className={styles.divider}></div>
                </div>
              ) : (
                <div key={item.name}>
                  <h6>{item.name}</h6>
                  <p>You don’t have any endorsements for this skill yet</p>
                  <GrCompliance />
                  <a href="/" className={styles.anchor}>
                    LinkedIn Skill Assessment badge
                  </a>
                  <div className={styles.divider}></div>
                </div>
              )
            )}
            {skills.mainSkills.map((item) => (
              <h6 key={item}>{item}</h6>
            ))}
          </div>
          <div>{expanded && <SkillListComponent skills={skills} />}</div>
          <div>
            <p
              onClick={() => {
                setExpanded(!expanded);
              }}
              className={styles.expander}
            >
              {expanded ? (
                <div>
                  <hr /> <span>Show less</span>
                </div>
              ) : (
                <div>
                  <hr /> <span>Show more</span>
                </div>
              )}
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Skills;
