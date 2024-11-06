import React from 'react'
import { Metadata } from 'next'
import EcosystemCallCard from './(app)/image/page';

export const metadata: Metadata = {
    title: "Solana Ecosystem Attendee Card",
   description: "A Website to generate Attendee for the Solana Ecosystem Card",
  };

const page = () => {
  return (
    <div>
      <EcosystemCallCard/>
    </div>
  )
}

export default page