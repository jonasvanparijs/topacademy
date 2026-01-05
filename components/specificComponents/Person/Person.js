import React, { Component } from "react";
import css from "./Person.module.scss";
// We importeren renderRichText om de Bio te kunnen lezen
import { storyblokEditable, StoryblokComponent, renderRichText } from "@storyblok/react";

export default class Person extends Component {
    render() {
        const blok = this.props.blok || {};
        
        // --- STAP 1: DATA OPHALEN MET DE JUISTE NAMEN UIT JE LIBRARY ---
        
        // In je screenshot heet het plaatje 'image', dus we gebruiken blok.image
        const image = blok.image || {};
        
        const experiences = blok.experiences || [];
        const bottomBlocks = blok.bottom_blocks || [];
        
        const bio = blok.bio;
        const dateOfBirth = blok.dateofbirth;
        const firstName = blok.compellation; 
        const lastName = blok.lastname;

        // --- STAP 2: NAAM SAMENSTELLEN ---
        // Als voornaam EN achternaam zijn ingevuld, plakken we ze aan elkaar.
        // Anders gebruiken we de 'title' als backup.
        let fullName = blok.title;
        if (firstName && lastName) {
            fullName = `${firstName} ${lastName}`;
        }

        return (
            <div {...storyblokEditable(blok)} className={css["wrapper"]}>
                <div className={css["content"]}>
                    
                    {/* DE HEADER */}
                    <div className={[css["box"], css["head"]].join(" ")}>
                        <h1>{fullName}</h1>
                        
                        {/* Datum tonen als die is ingevuld */}
                        {dateOfBirth && (
                            <p style={{marginTop: "10px", fontStyle: "italic"}}>
                                Geboren op: {new Date(dateOfBirth).toLocaleDateString('nl-NL')}
                            </p>
                        )}
                    </div>

                    {/* DE SIDEBAR (FOTO + BIO) */}
                    <div className={[css["box"], css["sidebar"]].join(" ")}>
                        <div className={css["personalimage"]}>
                            {/* Let op: we gebruiken hier nu 'image' i.p.v. 'photo' */}
                            {image.filename && <img src={image.filename} alt={fullName} />}
                        </div>

                        {/* BIO TONEN */}
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
                        <div>&copy; {fullName} {new Date().getFullYear()}</div>
                    </div>

                </div>
            </div>
        );
    }
}