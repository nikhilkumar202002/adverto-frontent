import React from 'react'
import HeroSection from './components/hero/HeroSection'
import MarqueeText from './components/common/MarqueeText'
import CaseStudiesSection from './components/sections/CaseStudiesSection'
import ServicesSection from './components/sections/ServicesSection'
import StorySection from './components/sections/StorySection'
import TeamSection from './components/sections/TeamSection'
import FaqSection from './components/sections/FaqSection'

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
      <ServicesSection />
      <StorySection />
      <TeamSection />
      <FaqSection />
    </>
  )
}

export default page