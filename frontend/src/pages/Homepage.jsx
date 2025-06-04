import React from 'react'
import HeroSection from '../components/home/HeroSection'
import DogBreed from '../components/home/DogBreed'
import PetProducts from '../components/home/PetProducts'
import BlogSection from '../components/home/BlogSection'
import NewsSection from '../components/home/NewsSection'

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <DogBreed />
      <PetProducts />
      <BlogSection />
      <NewsSection />
    </>
  )
}

export default Homepage