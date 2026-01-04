import React, { Component } from "react";
import css from "./Person.module.scss";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default class Person extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // We maken variabelen voor de data, zodat we zeker weten dat het bestaat
        const blok = this.props.blok || {};
        const photo = blok.photo || {};
        const experiences = blok.experiences || [];
        const bottomBlocks = blok.bottom_blocks || [];

        return (
            <div {...storyblokEditable(blok)} className={css["wrapper"]}>
                <div className={css["content"]}>
                    
                    {/* DE HEADER */}
                    <div className={[css["box"], css["head"]].join(" ")}>
                        <h1>{blok.title || "Naam ontbreekt"}</h1>
                    </div>

                    {/* DE SIDEBAR (FOTO + INFO) */}
                    <div className={[css["box"], css["sidebar"]].join(" ")}>
                        <div className={css["personalimage"]}>
                            {photo.filename && <img src={photo.filename} alt="Person" />}
                        </div>
                        <div className={css["personaldetails"]}>
                            <div className={css["personaldetailitem"]}>{blok.title}</div>
                            <div className={css["personaldetailitem"]}>{blok.dateofbirth}</div>
                        </div>
                    </div>
                    
                    {/* ERVARING */}
                    <div className={[css["box"], css["experience"]].join(" ")}>
                        <h2>Experience</h2>
                        {experiences.map((nestedBlok) => (
                            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                        ))}
                    </div>

                    {/* DE CARROUSEL (EXTRA VEILIG GEMAAKT) */}
                    {bottomBlocks.length > 0 && (
                        <div className={[css["box"], css["experience"]].join(" ")} style={{marginTop: "20px"}}>
                            {bottomBlocks.map((nestedBlok) => (
                                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                            ))}
                        </div>
                    )}

                    {/* FOOTER */}
                    <div className={[css["box"], css["foot"]].join(" ")}>
                        <div>&copy; {blok.title} {new Date().getFullYear()}</div>
                    </div>
                </div>
            </div>
        );
    }
}