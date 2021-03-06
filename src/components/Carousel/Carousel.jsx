import { useState, Fragment } from 'react';
import { carouseldata } from './carouselData';
import styles from './Carousel.module.css';
import { useNavigate } from 'react-router';

export const Carousel = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = carouseldata.length;

    const nextSlide = () => {
        setCurrentSlide(
            currentSlide === slideLength - 1 ? 0 : currentSlide + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide(
            currentSlide === 0 ? slideLength - 1 : currentSlide - 1
        );
    };

    return (
        <section className={`${styles.carousel}`}>
            <button
                onClick={nextSlide}
                className={`btn ${styles.carouselBtn} ${styles.right}`}
            >
                <i className="bx bx-right-arrow"></i>
            </button>
            <button
                onClick={prevSlide}
                className={`btn ${styles.carouselBtn} ${styles.left}`}
            >
                <i className="bx bx-left-arrow"></i>
            </button>
            {carouseldata.map((slide, index) => (
                <div
                    key={index}
                    className={
                        index === currentSlide
                            ? `${styles.activeSlide}`
                            : `${styles.setCurrentSlide}`
                    }
                >
                    {index === currentSlide && (
                        <Fragment>
                            <img
                                className={`${styles.slideImage}`}
                                src={slide.imageUrl}
                                alt={`slide-${index}`}
                            />
                            <div className={`${styles.slideText}`}>
                                <p className={`${styles.tagline}`}>
                                    {slide.tagline}
                                </p>
                                <button
                                    onClick={() => navigate('/products')}
                                    className={`${styles.slideButton}`}
                                >
                                    SHOP
                                </button>
                            </div>
                        </Fragment>
                    )}
                </div>
            ))}
        </section>
    );
};
