import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const FacilityPage = ({ blok }) => (
  <main {...storyblokEditable(blok)} style={{ padding: '20px' }}>
    {/* 1. Toon de Titel */}
    <h1>{blok.title}</h1>

    {/* 2. Toon de Foto */}
    {blok.main_image && (
      <img src={blok.main_image.filename} alt={blok.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
    )}

    {/* 3. LOGICA: Toon extra info op basis van je vinkjes */}
    <div style={{ background: '#f0f0f0', padding: '15px', marginTop: '20px', borderRadius: '8px' }}>
      <h3>Faciliteiten info:</h3>
      <ul>
        <li>Categorie: {blok.category}</li>
        <li>Status: <strong>{blok.opening_status}</strong></li>
        
        {/* Logisch veld 1: Wifi */}
        {blok.has_wifi ? (
          <li>✅ Gratis Wifi beschikbaar (Eduroam)</li>
        ) : (
          <li>❌ Geen Wifi in dit gebouw</li>
        )}

        {/* Logisch veld 2: Studentenkaart */}
        {blok.requires_student_card && (
          <li style={{ color: 'red', fontWeight: 'bold' }}>⚠️ Studentenkaart verplicht!</li>
        )}
      </ul>
    </div>

    {/* 4. Toon de rest van de blokken die je in de body sleept */}
    <div className="mt-4">
      {blok.body && blok.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  </main>
);

export default FacilityPage;