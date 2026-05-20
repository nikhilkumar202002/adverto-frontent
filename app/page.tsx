import React from 'react'
import HeroSection from './components/hero/HeroSection'
import MarqueeText from './components/common/MarqueeText'

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
      <main className="min-h-screen bg-black">
        <MarqueeText items={sliderContent} />
      </main>
    </>
  )
}

export default page