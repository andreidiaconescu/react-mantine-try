import { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, NavLink } from '@mantine/core';
import { Carousel, Embla } from '@mantine/carousel';

import classes from './CitizenCreateProfileInitialCarousel.module.css';
import { CitizenPageFrame } from '@/components/CitizenPageFrame/CitizenPageFrame';
import { CitizenHeader } from '../components/CitizenHeader/CitizenHeader';
import citizenCreateProfileInitialCarousel_slide1Url from './CitizenCreateProfileInitialCarousel_slide1.png';
import citizenCreateProfileInitialCarousel_slide2Url from './CitizenCreateProfileInitialCarousel_slide2.png';
import citizenCreateProfileInitialCarousel_slide3Url from './CitizenCreateProfileInitialCarousel_slide3.png';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';

export function CitizenCreateProfileInitialCarousel() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);
  console.log('CitizenCreateProfileInitialCarousel citizenPreferences', citizenPreferences);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams({
    registerEmail: '',
    initialOperatorId: '',
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onNavigate = (nextRoute: string) => {
    // copy local preferences to higher level state (in CitizenCreateProfile)
    citizenPreferences.registerEmail = searchParams.get('registerEmail');
    citizenPreferences.initialOperatorId = searchParams.get('initialOperatorId');
    console.log(
      'CitizenCreateProfileInitialCarousel.onNavigate citizenPreferences',
      citizenPreferences
    );
    setCitizenPreferences(citizenPreferences);

    if (embla.canScrollNext()) {
      embla.scrollNext();
    } else {
      navigate(nextRoute);
    }
  };

  return (
    <>
      <CitizenPageFrame>
        <CitizenHeader />
        <div className={classes.pageContent}>
          <Carousel
            withIndicators
            classNames={{
              slide: classes.mantine_carousel_slide,
              indicators: classes.mantine_carousel_indicators,
              indicator: classes.mantine_carousel_indicator,
            }}
            getEmblaApi={setEmbla}
          >
            <Carousel.Slide>
              <img
                className={classes.citizenCreateProfileInitialCarousel_slide}
                src={citizenCreateProfileInitialCarousel_slide1Url}
                alt="decoration only"
              />
              <div className={classes.contentTitle}>
                Dcouvr et ses partenaires vous recommandent des activités et des événements
                culturels
              </div>
              <div className={classes.firstParagraph}>
                <NavLink
                  label="Découvrir tous nos partenaires"
                  classNames={{
                    root: classes.nav_link_discover_all_partners_root,
                    label: classes.nav_link_discover_all_partners_label,
                    body: classes.nav_link_discover_all_partners_body,
                  }}
                />
              </div>
            </Carousel.Slide>
            <Carousel.Slide>
              <div className={classes.headImage}>
                <img
                  className={classes.citizenCreateProfileInitialCarousel_slide}
                  src={citizenCreateProfileInitialCarousel_slide2Url}
                  alt="decoration only"
                />
              </div>
              <div className={classes.contentTitle}>
                Dcouvr vous permet de gérer vos préférences en 1 profil unique
              </div>
            </Carousel.Slide>
            <Carousel.Slide>
              <div className={classes.headImage}>
                <img
                  className={classes.citizenCreateProfileInitialCarousel_slide}
                  src={citizenCreateProfileInitialCarousel_slide3Url}
                  alt="decoration only"
                />
              </div>
              <div className={classes.contentTitle}>
                Une série d’avantages tels que des réductions sur vos billets d’entrée et d’autres
                privilèges
              </div>
            </Carousel.Slide>
          </Carousel>

          <Button
            variant="filled"
            className={classes.nextButton}
            classNames={{
              root: classes.but_next_root,
              label: classes.but_next_label,
            }}
            onClick={() => {
              onNavigate('/citizen/create-profile/preferred-areas');
            }}
          >
            Suivant
          </Button>
        </div>
      </CitizenPageFrame>
    </>
  );
}
