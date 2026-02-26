import React from "react";
import "./SoftwareSkill.scss";
import {skillsSection} from "../../portfolio";

export default function SoftwareSkill() {
  const categories =
    skillsSection.skillCategories && skillsSection.skillCategories.length
      ? skillsSection.skillCategories
      : [{title: "Skills", skills: skillsSection.softwareSkills || []}];

  function renderSkill(skill, skillIndex) {
    const skillInner = (
      <>
        <div
          className="skill-icon-wrapper"
          style={{"--skill-accent": skill.iconColor}}
        >
          {skill.iconSrc ? (
            <img
              className="software-skill-image"
              src={skill.iconSrc}
              alt={`${skill.skillName} icon`}
            />
          ) : (
            <i
              className={skill.fontAwesomeClassname}
              style={{color: skill.iconColor}}
            ></i>
          )}
        </div>
        <p>{skill.skillName}</p>
      </>
    );

    return (
      <li
        key={`${skill.skillName}-${skillIndex}`}
        className="software-skill-inline"
        name={skill.skillName}
      >
        {skill.link ? (
          <a
            className="skill-link"
            href={skill.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${skill.skillName} website`}
          >
            {skillInner}
          </a>
        ) : (
          <div className="skill-link">{skillInner}</div>
        )}
      </li>
    );
  }

  return (
    <div className="software-skills-main-div">
      {categories.map((category, categoryIndex) => (
        <div key={`${category.title}-${categoryIndex}`} className="skill-category-block">
          <h3 className="skill-category-title">{category.title}</h3>
          <ul className="dev-icons">
            {(category.skills || []).map((skill, skillIndex) =>
              renderSkill(skill, skillIndex)
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
