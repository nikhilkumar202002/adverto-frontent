import React from 'react'
import HeroSection from './components/hero/HeroSection'
import MarqueeText from './components/common/MarqueeText'
import CaseStudiesSection from './components/sections/CaseStudiesSection'

const page = () => {
  const sliderContent = [
    "Design",
    "Video Production",
    "Social Media",
    "Creative Direction",
    "Motion Design",
    "Digital Experiences",
    "Brand Strategy",
    "Visual Identity",
  ];

  return (
    <>
      <HeroSection />
      <MarqueeText items={sliderContent} />
      <CaseStudiesSection />
    </>
  )
}

export default page