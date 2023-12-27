import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

import { useTranslation } from 'react-i18next';
import '../../store/i18n.js';

function Nav() {
  const { t } = useTranslation();

  return (
    <nav>
      <Link to="/text_processor">{t('Text Processor')}</Link>
      <Link to="/movies">{t('Movies')}</Link>
      <Link to="/add_movie">{t('Add Movie')}</Link>
      <Link to="/about_team">{t('About team')}</Link>
      <Link to="/about_project">{t('About Project')}</Link>
    </nav>
  );
}

export default Nav;
