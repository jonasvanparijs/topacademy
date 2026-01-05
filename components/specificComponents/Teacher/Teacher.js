import React, { Component } from "react";
import Link from "next/link";
// Zorg dat css correct verwijst naar jouw module file
import css from "./Teacher.module.scss"; 
import Headermenu from "../../genericComponents/Headermenu/Headermenu";
import Hero from "../../genericComponents/Hero/Hero";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default class Teacher extends Component {
    render() {
        const blok = this.props.blok || {};

        // 1. DATA OPHALEN
        const firstName = blok.compellation || "";
        const lastName = blok.lastname || "";
        const fullName = firstName ? `${firstName} ${lastName}` : lastName;

        // Ophalen van Cursussen (Array)
        const myCourses = blok.courses || [];
        
        // Ophalen van Locatie
        // Omdat het een Multi-Options veld is, is het vaak een array. 
        // We zorgen dat we er altijd een lijstje van maken voor de zekerheid.
        let myLocations = [];
        if (Array.isArray(blok.location)) {
            myLocations = blok.location;
        } else if (blok.location && typeof blok.location === 'object') {
            // Als het per ongeluk toch 1 los object is, stoppen we het in een lijstje
            myLocations = [blok.location];
        }

        // We halen de 'Location: ...' tekst hier weg uit de tagline, 
        // want we willen het nu mooi onderaan tonen.
        const heroBlok = {
            ...blok,
            title: fullName,
            tagline: "" // Leeg gelaten zodat het lelijke nummer weg is
        };

        return (
            <div {...storyblokEditable(blok)}>
                <Headermenu blok={this.props.menu ? this.props.menu.content : null} />

                <main>
                    <Hero blok={heroBlok} contentTypeTag="course" />

                    <div className={css["teacher-page__main-content"]}>
                        <div id="teacher-page__short-description">
                            
                            {/* BIO */}
                            <section className={css["rich-text-section--with-navigator"]}>
                                <h2 className={css["rich-text-section__title"]}>My Life</h2>
                                <div className={css["rich-text-section__rich-text"]}>
                                    {RichTextToHTML({ document: blok.bio })}
                                </div>
                            </section>

                            {/* ERVARING */}
                             <div className={css["rich-text-section--with-navigator"]} style={{marginTop: '40px'}}>
                                <h2 className={css["rich-text-section__title"]}>Experience</h2>
                                {blok.experiences && blok.experiences.map((nestedBlok) => (
                                    <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                                ))}
                            </div>

                            {/* --- DE BLOKKEN ONDERAAN --- */}

                            {/* 1. COURSES I TEACH */}
                            {myCourses.length > 0 && (
                                <div style={{marginTop: '60px', borderTop: '1px solid #eee', paddingTop: '40px'}}>
                                    <h2 className={css["rich-text-section__title"]}>Courses I teach</h2>
                                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px'}}>
                                        {myCourses.map((course) => (
                                            <div key={course.uuid} style={{border: '1px solid #ddd', padding: '15px', borderRadius: '5px'}}>
                                                <h3 style={{margin: '0 0 10px 0'}}>{course.content.title}</h3>
                                                <Link href={`/${course.full_slug}`}>
                                                    <a style={{color: '#0070f3', textDecoration: 'none', fontWeight: 'bold'}}>Bekijk cursus &rarr;</a>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 2. MY LOCATION (Nieuw!) */}
                            {myLocations.length > 0 && (
                                <div style={{marginTop: '40px'}}>
                                    <h2 className={css["rich-text-section__title"]}>Where to find me</h2>
                                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px'}}> 
                                        {myLocations.map((loc) => (
                                            <div key={loc.uuid} style={{border: '1px solid #ddd', padding: '15px', borderRadius: '5px'}}>
                                                {/* We checken of we de titel hebben (object), anders is de resolutie mislukt */}
                                                <h3 style={{margin: '0 0 10px 0'}}>
                                                    {loc.content ? loc.content.title : "Locatie laden..."}
                                                </h3>
                                                
                                                {loc.full_slug && (
                                                    <Link href={`/${loc.full_slug}`}>
                                                        <a style={{color: '#0070f3', textDecoration: 'none', fontWeight: 'bold'}}>Bekijk locatie &rarr;</a>
                                                    </Link>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}