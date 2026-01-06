import React, { Component } from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import css from "./FacilityPage.module.scss";
import Link from "next/link";

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
            <div className={css["info-item"]}>
                <strong>Location: </strong> 
                {blok.location && blok.location.map((loc, index) => (
                    <span key={loc._uid}>
                        {index > 0 && ", "}
                        {/* HIER START DE LINK */}
                        <Link href={"/" + loc.full_slug}>
                            <a style={{ textDecoration: "underline", cursor: "pointer" }}>
                                {loc.name}
                            </a>
                        </Link>
                        {/* HIER EINDIGT DE LINK */}
                    </span>
                ))}
                {!blok.location && "Unknown"}
              </div>
          </div>

          {/* 4. BODY CONTENT (Hier komen andere blokken in te staan) */}
          <div className={css["facility-page__content"]}>
            {blok.body &&
              blok.body.map((nestedBlok) => (
                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
              ))}
          </div>
         {/* NAVIGATIE MET MOOIE KNOPPEN */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px", borderTop: "2px solid #f0f0f0", paddingTop: "30px" }}>

                {/* VORIGE KNOP (Links) */}
                <div style={{ flex: 1, textAlign: "left" }}>
                    {/* HIER ONDER GEBRUIKEN WE NU 'previous_link' IPV 'prev_link' */}
                    {blok.previous_link && blok.previous_link.cached_url && (
                        <Link href={"/" + blok.previous_link.cached_url}>
                            <a style={{ 
                                display: "inline-block", 
                                padding: "12px 24px", 
                                backgroundColor: "#0055AA", 
                                color: "white", 
                                borderRadius: "8px", 
                                textDecoration: "none",
                                fontWeight: "bold",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                            }}>
                                &larr; Previous
                            </a>
                        </Link>
                    )}
                </div>

                {/* VOLGENDE KNOP (Rechts) */}
                <div style={{ flex: 1, textAlign: "right" }}>
                    {blok.next_link && blok.next_link.cached_url && (
                        <Link href={"/" + blok.next_link.cached_url}>
                            <a style={{ 
                                display: "inline-block", 
                                padding: "12px 24px", 
                                backgroundColor: "#0055AA", /* UGent Blauw */
                                color: "white", 
                                borderRadius: "8px", 
                                textDecoration: "none",
                                fontWeight: "bold",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                            }}>
                                Next &rarr;
                            </a>
                        </Link>
                    )}
                </div>

              </div>
            
          

        </div>
      </main>
    );
  }
}