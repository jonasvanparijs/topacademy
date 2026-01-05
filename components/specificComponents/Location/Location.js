import React, { Component } from "react";
import css from "./Location.module.scss"; 
import Link from "next/link";
import Headermenu from "../../genericComponents/Headermenu/Headermenu";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default class Location extends Component {
    render() {
        const blok = this.props.blok || {};

        // 1. DATA OPHALEN
        const myTeachers = blok.teachers || [];
        const myCourses = blok.courses || [];
        const image = blok.image || {}; 
        const myBlocks = blok.additionalstuff || [];

        return (
            <div {...storyblokEditable(blok)}>
                <Headermenu blok={this.props.menu ? this.props.menu.content : null} />

                <main style={{maxWidth: '1200px', margin: '0 auto', padding: '20px'}}>
                    {/* 1. TITEL */}
                    <h1 style={{fontSize: '3rem', marginBottom: '20px'}}>{blok.title}</h1>

                    {/* 2. AFBEELDING (Nu weer bovenaan!) */}
                    {image.filename && (
                        <img 
                            src={image.filename} 
                            alt={blok.title} 
                            style={{
                                width: '100%', 
                                maxHeight: '500px', 
                                objectFit: 'cover', 
                                borderRadius: '10px',
                                marginBottom: '40px' // Beetje ruimte onder de foto
                            }} 
                        />
                    )}

                    {/* 3. JE BLOKKEN (LeftRightBlock, Intro, etc.) */}
                    <div style={{marginBottom: '40px'}}>
                        {myBlocks.map((nestedBlok) => (
                             <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                        ))}
                    </div>

                    {/* 4. EXTRA BESCHRIJVING */}
                    {blok.description && (
                        <div style={{fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '40px'}}>
                             {RichTextToHTML({ document: blok.description })}
                        </div>
                    )}
                    
                    {/* 5. ONDERAAN: DOCENTEN EN CURSUSSEN */}
                    <div style={{marginTop: '60px', borderTop: '2px solid #eee', paddingTop: '40px'}}>
                        
                        {/* CURSUSSEN */}
                        {myCourses.length > 0 && (
                            <div style={{marginBottom: '40px'}}>
                                <h2>Courses at this location</h2>
                                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px'}}>
                                    {myCourses.map((course) => (
                                        <div key={course.uuid} style={{border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9'}}>
                                            <h3 style={{marginTop: 0}}>{course.content.title}</h3>
                                            <Link href={`/${course.full_slug}`}>
                                                <a style={{color: '#0070f3', textDecoration: 'none', fontWeight: 'bold'}}>Bekijk cursus &rarr;</a>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* DOCENTEN */}
                        {myTeachers.length > 0 && (
                            <div>
                                <h2>Teachers here</h2>
                                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px'}}>
                                    {myTeachers.map((teacher) => (
                                        <div key={teacher.uuid} style={{border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center'}}>
                                            {teacher.content.image && teacher.content.image.filename && (
                                                <img src={teacher.content.image.filename} alt={teacher.content.title} style={{width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px'}} />
                                            )}
                                            <h4 style={{margin: '0 0 10px 0'}}>{teacher.content.title}</h4>
                                            <Link href={`/${teacher.full_slug}`}>
                                                <a style={{fontSize: '0.9rem', color: '#0070f3'}}>Bekijk profiel</a>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        );
    }
}