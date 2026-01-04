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
                            {/* AANGEPAST: Alleen title tonen, geen firstname/lastname meer */}
                            <h1>{this.props.blok.title}</h1>
                        </div>
                        <div className={[css["box"], css["sidebar"]].join(" ")}>
                            {/* AANGEPAST: Vraagteken toegevoegd voor veiligheid */}
                            <div className={css["personalimage"]}><img src={this.props.blok.photo?.filename} /></div>
                            <div className={css["personaldetails"]}>
                                {/* AANGEPAST: Alleen title */}
                                <div className={css["personaldetailitem"]}>{this.props.blok.title}</div>
                                <div className={css["personaldetailitem"]}>{this.props.blok.dateofbirth}</div>
                                {/* AANGEPAST: Locatie regel is hier verwijderd */}
                            </div>
                        </div>
                        <div className={[css["box"], css["experience"]].join(" ")}>
                            <h2>Experience</h2>
                            {this.props.blok.experiences?.map((nestedBlok) => (
                                <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
                            ))}
                        </div>
                        <div className={[css["box"], css["foot"]].join(" ")}>
                            {/* AANGEPAST: Ook hier title gebruikt ipv firstname/lastname */}
                            <div>&copy; {this.props.blok.title} {new Date().getFullYear()}</div>
                        </div>
                    </div>
                </div>
            </>
        );
        
    }
}