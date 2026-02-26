import React from "react";
import "./SoftwareSkill.scss";
import {skillsSection} from "../../portfolio";

export default function SoftwareSkill() {
  return (
    <div>
      <div className="software-skills-main-div">
        <ul className="dev-icons">
          {skillsSection.softwareSkills.map((skills, i) => {
            return (
              <li key={i} className="software-skill-inline" name={skills.skillName}>
                <a
                  className="skill-link"
                  href={skills.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${skills.skillName} website`}
                >
                  <div
                    className="skill-icon-wrapper"
                    style={{"--skill-accent": skills.iconColor}}
                  >
                    {skills.iconSrc ? (
                      <img
                        className="software-skill-image"
                        src={skills.iconSrc}
                        alt={`${skills.skillName} icon`}
                      />
                    ) : (
                      <i
                        className={skills.fontAwesomeClassname}
                        style={{color: skills.iconColor}}
                      ></i>
                    )}
                  </div>
                  <p>{skills.skillName}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
