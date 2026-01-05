import React, { Component } from "react";
import Link from "next/link";
import css from "./Teacher.module.scss"; 
import Headermenu from "../../genericComponents/Headermenu/Headermenu";
import Hero from "../../genericComponents/Hero/Hero";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default class Teacher extends Component {
    render() {
        const blok = this.props.blok || {};

        // 1. BASIS DATA OPHALEN
        const firstName = blok.compellation || "";
        const lastName = blok.lastname || "";
        const fullName = firstName ? `${firstName} ${lastName}` : lastName;

        // 2. CURSUSSEN OPHALEN
        const myCourses = blok.courses || [];
        
        // 3. LOCATIE OPHALEN
        let myLocations = [];
        if (Array.isArray(blok.location)) {
            myLocations = blok.location;
        } else if (blok.location && typeof blok.location === 'object') {
            myLocations = [blok.location];
        }

        // 4. NAVIGATIE OPHALEN (Vorige / Volgende Teacher)
        // Let op: Storyblok maakt van "Previous Teacher" -> "previous_teacher"
        const prevTeacher = blok.previous_teacher; 
        const nextTeacher = blok.next_teacher;

        // 5. HERO SETUP
        const heroBlok = {
            ...blok,
            title: fullName,
            tagline: "" 
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

                        
                            {/* --- COURSES I TEACH --- */}
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

                            {/* --- WHERE TO FIND ME --- */}
                            {myLocations.length > 0 && (
                                <div style={{marginTop: '40px'}}>
                                    <h2 className={css["rich-text-section__title"]}>Where to find me</h2>
                                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px'}}> 
                                        {myLocations.map((loc) => (
                                            <div key={loc.uuid} style={{border: '1px solid #ddd', padding: '15px', borderRadius: '5px'}}>
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

                            {/* --- NAVIGATIE KNOPPEN (NIEUW TOEGEVOEGD) --- */}
                            <div style={{
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                marginTop: '80px', 
                                paddingTop: '20px',
                                borderTop: '2px solid #f0f0f0'
                            }}>
                                {/* Vorige Teacher knop */}
                                <div>
                                    {prevTeacher && (prevTeacher.cached_url || prevTeacher.full_slug || prevTeacher.url) && (
                                        <Link href={`/${prevTeacher.cached_url || prevTeacher.full_slug || prevTeacher.url}`}>
                                            <a style={{fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none', color: '#333'}}>
                                                &larr; Previous Teacher
                                            </a>
                                        </Link>
                                    )}
                                </div>

                                {/* Volgende Teacher knop */}
                                <div>
                                    {nextTeacher && (nextTeacher.cached_url || nextTeacher.full_slug || prevTeacher.url) && (
                                        <Link href={`/${nextTeacher.cached_url || nextTeacher.full_slug || prevTeacher.url}`}>
                                            <a style={{fontSize: '1.2rem', fontWeight: 'bold', textDecoration: 'none', color: '#333'}}>
                                                Next Teacher &rarr;
                                            </a>
                                        </Link>
                                    )}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}