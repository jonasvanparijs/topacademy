import React, { Component } from "react";
import css from "./Person.module.scss";
// Deze import heb je nodig voor de Bio
import { storyblokEditable, StoryblokComponent, renderRichText } from "@storyblok/react";

export default class Person extends Component {
    render() {
        const blok = this.props.blok || {};

        // 1. DATA OPHALEN (Let op: hier gebruiken we de namen uit jouw Storyblok screenshot)
        
        // Plaatje heet 'image' in jouw blok, niet 'photo'
        const image = blok.image || {};
        
        // Namen ophalen
        const firstName = blok.compellation;
        const lastName = blok.lastname;
        
        // Overige velden
        const bio = blok.bio;
        const dateOfBirth = blok.dateofbirth;
        const experiences = blok.experiences || [];
        const bottomBlocks = blok.bottom_blocks || [];

        // 2. NAAM SAMENSTELLEN
        // We maken één naam van de voor- en achternaam
        let displayName = blok.title; // Begin met de titel als backup
        
        if (firstName && lastName) {
            displayName = `${firstName} ${lastName}`;
        } else if (lastName) {
            displayName = lastName;
        }

        return (
            <div {...storyblokEditable(blok)} className={css["wrapper"]}>
                <div className={css["content"]}>
                    
                    {/* HEADER: NAAM EN DATUM */}
                    <div className={[css["box"], css["head"]].join(" ")}>
                        <h1>{displayName}</h1>
                        
                        {/* Datum alleen tonen als die is ingevuld */}
                        {dateOfBirth && (
                            <p style={{marginTop: "10px", fontStyle: "italic"}}>
                                Geboren op: {new Date(dateOfBirth).toLocaleDateString('nl-NL')}
                            </p>
                        )}
                    </div>

                    {/* SIDEBAR: FOTO EN BIO */}
                    <div className={[css["box"], css["sidebar"]].join(" ")}>
                        <div className={css["personalimage"]}>
                            {/* We gebruiken hier 'image' omdat we dat hierboven hebben opgehaald */}
                            {image.filename && <img src={image.filename} alt={displayName} />}
                        </div>

                        {/* BIO */}
                        {bio && (
                            <div style={{marginTop: "20px", lineHeight: "1.6"}}>
                                {renderRichText(bio)}
                            </div>
                        )}
                    </div>

                    {/* ERVARING */}
                    <div className={[css["box"], css["experience"]].join(" ")}>
                        <h2>Experience</h2>
                        {experiences.map((nestedBlok) => (
                            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                        ))}
                    </div>

                    {/* CARROUSEL */}
                    {bottomBlocks.length > 0 && (
                        <div className={[css["box"], css["experience"]].join(" ")} style={{marginTop: "20px"}}>
                            {bottomBlocks.map((nestedBlok) => (
                                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                            ))}
                        </div>
                    )}
                    
                    {/* FOOTER */}
                    <div className={[css["box"], css["foot"]].join(" ")}>
                        <div>&copy; {displayName} {new Date().getFullYear()}</div>
                    </div>

                </div>
            </div>
        );
    }
}