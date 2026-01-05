import React, { Component } from "react";
import css from "./Course.module.scss";
import Link from "next/link";
import Headermenu from "../../genericComponents/Headermenu/Headermenu";
import Hero from "../../genericComponents/Hero/Hero";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
// Als je TeacherCard hebt, kun je die importeren, anders gebruiken we een simpele link
// import TeacherCard from "../TeacherCard/TeacherCard"; 

export default class Course extends Component {
    render() {
        const blok = this.props.blok || {};

        // 1. DATA OPHALEN
        // 'teachers' en 'locations' zijn de veldnamen die je in Storyblok hebt gemaakt
        const myTeachers = blok.teachers || [];
        const myLocations = blok.locations || [];

        return (
            <div {...storyblokEditable(blok)}>
                <Headermenu blok={this.props.menu ? this.props.menu.content : null} />

                <main>
                    <Hero blok={blok} contentTypeTag="course" />

                    <div className={css["course-page__main-content"]}>
                         {/* --- BESCHRIJVING --- */}
                        <div id="course-page__short-description">
                            <section className={css["rich-text-section--with-navigator"]}>
                                <h2 className={css["rich-text-section__title"]}>About this Course</h2>
                                <div className={css["rich-text-section__rich-text"]}>
                                    {RichTextToHTML({ document: blok.description })}
                                </div>
                            </section>
                        </div>

                        {/* --- ONDERAAN: DOCENTEN EN LOCATIES --- */}
                        <div className={css["rich-text-section--with-navigator"]} style={{marginTop: '60px'}}>
                            
                            {/* 1. DOCENTEN */}
                            {myTeachers.length > 0 && (
                                <div style={{marginBottom: '40px'}}>
                                    <h2 className={css["rich-text-section__title"]}>Teachers</h2>
                                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px'}}>
                                        {myTeachers.map((teacher) => (
                                            <div key={teacher.uuid} style={{border: '1px solid #ddd', padding: '15px', borderRadius: '8px'}}>
                                                {/* Simpele weergave van de docent */}
                                                <h3 style={{margin: '0 0 10px 0'}}>{teacher.content.title}</h3>
                                                <Link href={`/${teacher.full_slug}`}>
                                                    <a style={{color: '#0070f3', fontWeight: 'bold', textDecoration: 'none'}}>Bekijk profiel &rarr;</a>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 2. LOCATIES */}
                            {myLocations.length > 0 && (
                                <div>
                                    <h2 className={css["rich-text-section__title"]}>Locations</h2>
                                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px'}}>
                                        {myLocations.map((loc) => (
                                            <div key={loc.uuid} style={{border: '1px solid #ddd', padding: '15px', borderRadius: '8px'}}>
                                                <h3 style={{margin: '0 0 10px 0'}}>{loc.content.title}</h3>
                                                <Link href={`/${loc.full_slug}`}>
                                                    <a style={{color: '#0070f3', fontWeight: 'bold', textDecoration: 'none'}}>Bekijk locatie &rarr;</a>
                                                </Link>
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