import React, { Component } from "react";
import css from "./Teacher.module.scss";
import Headermenu from "../../genericComponents/Headermenu/Headermenu";
import Hero from "../../genericComponents/Hero/Hero";
import { storyblokEditable } from "@storyblok/react";
// We behouden jouw eigen rich text renderer
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default class Teacher extends Component {
    render() {
        const blok = this.props.blok || {};

        // 1. Haal de juiste velden op (zoals ze in Storyblok heten)
        const firstName = blok.compellation || "";
        const lastName = blok.lastname || "";
        
        // 2. Maak de volledige naam (Dit lost "UNDEFINED" op)
        // Als er een voornaam is, plakken we die aan de achternaam
        const fullName = firstName ? `${firstName} ${lastName}` : lastName;

        // 3. Maak de locatie regel (Dit lost "Location: undefined" op)
        // We tonen "Location: ..." ALLEEN als blok.location ook echt bestaat.
        // Omdat je dat veld nu niet hebt, blijft deze waarschijnlijk leeg, en dat is prima.
        let locationTagline = "";
        if (blok.location) {
            locationTagline = "Location: " + blok.location;
        }

        // 4. We maken een speciaal blokje voor de Hero
        // We overschrijven de 'title' en 'tagline' met onze verbeterde versies
        const heroBlok = {
            ...blok,
            title: fullName,    // Hier komt nu netjes "Koen Schoors"
            tagline: locationTagline // Deze blijft leeg als er geen locatie is
        };

        return (
            <div {...storyblokEditable(blok)}>
                {/* Menu doorgeven */}
                <Headermenu blok={this.props.menu ? this.props.menu.content : null} />

                <main>
                    {/* De Hero krijgt nu de juiste naam en geen undefined locatie meer */}
                    <Hero blok={heroBlok} contentTypeTag="course" />

                    <div className={css["teacher-page__main-content"]}>
                        <div id="teacher-page__short-description">
                            <section className={css["rich-text-section--with-navigator"]}>
                                <h2 className={css["rich-text-section__title"]}>My Life</h2>
                                <div className={css["rich-text-section__rich-text"]}>
                                    {/* Jouw project gebruikt deze specifieke functie voor tekst */}
                                    {RichTextToHTML({ document: blok.bio })}
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}