import React, {useState} from "react";
import "./ExperienceCard.scss";

export default function ExperienceCard({cardInfo, isDark}) {
  const [isImageBroken, setIsImageBroken] = useState(false);

  function resolveImageSrc(imageSrc) {
    if (!imageSrc) {
      return null;
    }
    if (typeof imageSrc === "string") {
      return imageSrc;
    }
    if (typeof imageSrc === "object" && imageSrc.default) {
      return imageSrc.default;
    }
    return null;
  }

  function getCompanyInitials(companyName = "") {
    return companyName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase())
      .join("");
  }

  const imageSrc = resolveImageSrc(cardInfo.companylogo);
  const hasLogo = imageSrc && !isImageBroken;

  return (
    <div className={isDark ? "experience-card-dark" : "experience-card"}>
      <div className="experience-banner">
        <div className="experience-company-meta">
          <div>
            <p className="experience-company-label">Organization</p>
            <h3 className="experience-text-company">{cardInfo.company}</h3>
          </div>
          <div className="experience-logo-shell" aria-hidden="true">
            {hasLogo ? (
              <img
                className="experience-roundedimg"
                src={imageSrc}
                alt=""
                onError={() => setIsImageBroken(true)}
              />
            ) : (
              <span className="experience-logo-fallback">
                {getCompanyInitials(cardInfo.company)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="experience-text-details">
        <h5
          className={
            isDark
              ? "experience-text-role dark-mode-text"
              : "experience-text-role"
          }
        >
          {cardInfo.role}
        </h5>
        <p
          className={
            isDark
              ? "experience-text-date dark-mode-text"
              : "experience-text-date"
          }
        >
          {cardInfo.date}
        </p>
        <p
          className={
            isDark
              ? "subTitle experience-text-desc dark-mode-text"
              : "subTitle experience-text-desc"
          }
        >
          {cardInfo.desc}
        </p>
        {cardInfo.descBullets && cardInfo.descBullets.length ? (
          <ul className="experience-bullets">
            {cardInfo.descBullets.map((item, i) => (
              <li
                key={i}
                className={
                  isDark
                    ? "experience-bullet subTitle dark-mode-text"
                    : "experience-bullet subTitle"
                }
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
