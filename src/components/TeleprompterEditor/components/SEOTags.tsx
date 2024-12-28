import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOTags: React.FC = () => {
  return (
    <Helmet>
      <title>פרומפטר פרו - הטלפרומפטר המתקדם ביותר בישראל</title>
      <meta name="description" content="פרומפטר פרו - כלי טלפרומפטר מתקדם בעברית עם תמיכה בזיהוי קול, גלילה חכמה ועוד המון תכונות מתקדמות." />
      <meta name="keywords" content="טלפרומפטר, פרומפטר, קריינות, הקלטה, זיהוי קול, עברית, ישראל" />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content="פרומפטר פרו - הטלפרומפטר המתקדם ביותר בישראל" />
      <meta property="og:description" content="כלי טלפרומפטר מתקדם בעברית עם תמיכה בזיהוי קול וגלילה חכמה" />
      <meta property="og:image" content="https://prompter.pro/og-image.jpg" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="פרומפטר פרו - טלפרומפטר מתקדם" />
      <meta name="twitter:description" content="כלי טלפרומפטר מתקדם בעברית עם תמיכה בזיהוי קול וגלילה חכמה" />
      
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Hebrew" />
      <link rel="canonical" href="https://prompter.pro" />
    </Helmet>
  );
};

export default SEOTags;