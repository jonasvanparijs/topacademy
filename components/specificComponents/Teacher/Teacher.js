import React, { Component } from "react";
// We importeren Link van Next.js voor snelle navigatie
import Link from "next/link"; 
import css from "./Teacher.module.scss";
import Headermenu from "../../genericComponents/Headermenu/Headermenu";
import Hero from "../../genericComponents/Hero/Hero";
import { storyblokEditable } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default class Teacher extends Component {
    render() {
        const blok = this.props.blok || {};

        // 1. DATA OPHALEN
        const firstName = blok.compellation || "";
        const lastName = blok.lastname || "";
        
        // Haal de links op die je in Stap 1 hebt gemaakt
        const nextTeacher = blok.next_teacher;
        const prevTeacher = blok.previous_teacher;

        // 2. NAAM SAMENSTELLEN
        const fullName = firstName ? `${firstName} ${lastName}` : lastName;

        // 3. LOCATIE
        let locationTagline = "";
        if (blok.location) {
            locationTagline = "Location: " + blok.location;
        }

        // 4. HERO BLOK
        const heroBlok = {
            ...blok,
            title: fullName,
            tagline: locationTagline
        };
        
        // Hulpfunctie om te checken of een link geldig is
        const hasLink = (linkField) => linkField && (linkField.cached_url || linkField.url);
        // Hulpfunctie om de URL netjes te maken (zorgen dat er een / voor staat)
        const getUrl = (linkField) => {
            let url = linkField.cached_url || linkField.url || "";
            if (!url.startsWith("/")) {
                url = "/" + url;
            }
            return url;
        };

        return (
            <div {...storyblokEditable(blok)}>
                <Headermenu blok={this.props.menu ? this.props.menu.content : null} />

                <main>
                    <Hero blok={heroBlok} contentTypeTag="course" />

                    <div className={css["teacher-page__main-content"]}>
                        <div id="teacher-page__short-description">
                            <section className={css["rich-text-section--with-navigator"]}>
                                <h2 className={css["rich-text-section__title"]}>My Life</h2>
                                <div className={css["rich-text-section__rich-text"]}>
                                    {RichTextToHTML({ document: blok.bio })}
                                </div>
                            </section>
                            
                            {/* --- HIER KOMEN DE NAVIGATIE KNOPPEN --- */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', paddingBottom: '50px' }}>
                                
                                {/* VORIGE KNOP */}
                                <div>
                                    {hasLink(prevTeacher) && (
                                        <Link href={getUrl(prevTeacher)}>
                                            <a style={{ textDecoration: 'none', fontWeight: 'bold', color: '#333', border: '1px solid #ddd', padding: '10px 20px', borderRadius: '5px' }}>
                                                &larr; Previous Teacher
                                            </a>
                                        </Link>
                                    )}
                                </div>

                                {/* VOLGENDE KNOP */}
                                <div>
                                    {hasLink(nextTeacher) && (
                                        <Link href={getUrl(nextTeacher)}>
                                            <a style={{ textDecoration: 'none', fontWeight: 'bold', color: '#333', border: '1px solid #ddd', padding: '10px 20px', borderRadius: '5px' }}>
                                                Next Teacher &rarr;
                                            </a>
                                        </Link>
                                    )}
                                </div>
                            </div>
                            {/* --- EINDE NAVIGATIE --- */}

                        </div>
                    </div>
                </main>
            </div>
        );
    }
}