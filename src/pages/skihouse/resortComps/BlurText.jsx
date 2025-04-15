import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSprings, animated } from '@react-spring/web';

const BlurText = (props) => {
  const {
    text = '',
    delay = 200,
    className = '',
    animateBy = 'words',
    direction = 'bottom',
    threshold = 0.1,
    rootMargin = '0px',
    animationFrom,
    animationTo,
    easing = 'easeOutCubic',
    onAnimationComplete,
  } = props;

  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);

  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,50px,0)' };

  const defaultTo = [
    {
      filter: 'blur(5px)',
      opacity: 0.5,
      transform: direction === 'top' ? 'translate3d(0,5px,0)' : 'translate3d(0,-5px,0)',
    },
    { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
          animatedCount.current = 0;
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const springs = useSprings(
    elements.length,
    elements.map((_, i) => ({
      from: animationFrom || defaultFrom,
      to: inView
        ? async (next) => {
          for (const step of animationTo || defaultTo) {
            await next(step);
          }
          animatedCount.current += 1;
          if (animatedCount.current === elements.length && onAnimationComplete) {
            onAnimationComplete();
          }
        }
        : animationFrom || defaultFrom,
      delay: i * delay,
      config: { easing },
    }))
  );

  return (
    <p ref={ref} className={`blur-text ${className}`}>
      {springs.map((props, index) => (
        <animated.span
          key={index}
          style={{
            ...props,
            display: 'inline-block',
            willChange: 'transform, filter, opacity',
          }}
        >
          {elements[index] === ' ' ? '\u00A0' : elements[index]}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </animated.span>
      ))}
    </p>
  );
};

// ✅ PropTypes 驗證
BlurText.propTypes = {
  text: PropTypes.string,
  delay: PropTypes.number,
  className: PropTypes.string,
  animateBy: PropTypes.oneOf(['words', 'letters']),
  direction: PropTypes.oneOf(['top', 'bottom']),
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  animationFrom: PropTypes.object,
  animationTo: PropTypes.arrayOf(PropTypes.object),
  easing: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onAnimationComplete: PropTypes.func,
};

export default BlurText;
