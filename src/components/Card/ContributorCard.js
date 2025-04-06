import React from "react";
import { FaGithub } from "react-icons/fa";
import "../../styles/ContributorCard.css";

export default function ContributorCard({ name, role, avatar, github }) {
  return (
    <div className="contributor-card">
      <img src={avatar} alt={`${name}'s avatar`} className="avatar" />
      <h3 className="name">{name}</h3>
      <p className="role">{role}</p>
      <a href={github} target="_blank" rel="noopener noreferrer" className="github-link">
        <FaGithub className="github-icon" /> GitHub
      </a>
    </div>
  );
}
