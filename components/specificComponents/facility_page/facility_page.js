import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import "./Facility_page.module.scss"; // IMPORT HIER JE SCSS

const FacilityPage = ({ blok }) => (
  <div {...storyblokEditable(blok)} className="facility-page">
    <header className="facility-header">
      <h1>{blok.title}</h1>
      <p>UGent Faciliteit: {blok.category}</p>
    </header>

    <div className="facility-content">
      {blok.main_image && (
        <img className="main-image" src={blok.main_image.filename} alt={blok.title} />
      )}

      <div className="logic-grid">
        {/* Kaart 1: Wifi logica */}
        <div className="info-card">
          <h4>Connectiviteit</h4>
          {blok.has_wifi ? "📶 Eduroam Wifi beschikbaar" : "📵 Geen publieke wifi"}
        </div>

        {/* Kaart 2: Kaart-verplichting logica met extra CSS class */}
        <div className={`info-card ${blok.requires_student_card ? 'warning' : ''}`}>
          <h4>Toegang</h4>
          <p>Status: {blok.opening_status}</p>
          {blok.requires_student_card && <p>⚠️ Studentenkaart verplicht!</p>}
        </div>
      </div>

      <div className="body-content">
        {blok.body && blok.body.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </div>
  </div>
);

export default FacilityPage;