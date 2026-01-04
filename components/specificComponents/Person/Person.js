import React, { Component } from "react";
import css from "./Person.module.scss";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default class Person extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div {...storyblokEditable(this.props.blok)} className={css["wrapper"]}>
                    <div className={css["content"]}>
                        <div className={[css["box"], css["head"]].join(" ")}>
                            <h1>{this.props.blok.title}</h1>
                        </div>
                        <div className={[css["box"], css["sidebar"]].join(" ")}>
                            <div className={css["personalimage"]}><img src={this.props.blok.photo?.filename} /></div>
                            <div className={css["personaldetails"]}>
                                <div className={css["personaldetailitem"]}>{this.props.blok.title}</div>
                                <div className={css["personaldetailitem"]}>{this.props.blok.dateofbirth}</div>
                            </div>
                        </div>
                        
                        {/* 1. Het blok voor Ervaring */}
                        <div className={[css["box"], css["experience"]].join(" ")}>
                            <h2>Experience</h2>
                            {this.props.blok.experiences?.map((nestedBlok) => (
                                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                            ))}
                        </div>

                        {/* 2. NIEUW: Hier zorgen we dat extra blokken (zoals je Carrousel) getoond worden */}
                        {this.props.blok.bottom_blocks && (
                            <div className={[css["box"], css["experience"]].join(" ")} style={{marginTop: "20px"}}>
                                {this.props.blok.bottom_blocks.map((nestedBlok) => (
                                    <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                                ))}
                            </div>
                        )}

                        <div className={[css["box"], css["foot"]].join(" ")}>
                            <div>&copy; {this.props.blok.title} {new Date().getFullYear()}</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}