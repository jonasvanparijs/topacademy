import React, { Component } from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import css from "./FacilityPage.module.scss";

export default class FacilityPage extends Component {
  render() {
    const { blok } = this.props;

    return (
      <main className={css["facility-page"]} {...storyblokEditable(blok)}>
        
        {/* De grid-container (deze regelt de breedte en marges) */}
        <div className={css["facility-page__main-content"]}>

          {/* 1. HEADER & TITEL */}
          <div className={css["facility-page__header"]}>
            <h1>{blok.Title}</h1>
            {blok.category && (
              <span className={css["tag"]}>{blok.category}</span>
            )}
          </div>

          {/* 2. HOOFDAFBEELDING */}
          {blok.main_image && blok.main_image.filename && (
            <div className={css["facility-page__image-container"]}>
              <img src={blok.main_image.filename} alt={blok.Title} />
            </div>
          )}

          {/* 3. INFO BLOKJES (Wifi, Status, etc.) */}
          <div className={css["facility-page__info-grid"]}>
            <div className={css["info-item"]}>
              <strong>Wifi:</strong> {blok.has_wifi ? "✅ Yes" : "❌ No"}
            </div>
            <div className={css["info-item"]}>
              <strong>Student Card:</strong> {blok.requires_student_card ? "Required" : "Not needed"}
            </div>
            <div className={css["info-item"]}>
              <strong>Status:</strong> {blok.opening_status}
            </div>
          </div>

          {/* 4. BODY CONTENT (Hier komen andere blokken in te staan) */}
          <div className={css["facility-page__content"]}>
            {blok.body &&
              blok.body.map((nestedBlok) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
              ))}
          </div>
          <div className={css["info-item"]}>
                <strong>Location:</strong> {blok.location && blok.location.map((loc, index) => (
                    <span key={loc._uid}>
                        {index > 0 && ", "}
                        {loc.name}
                    </span>
                ))}
                {!blok.location && "Unknown"}
              </div>

        </div>
      </main>
    );
  }
}