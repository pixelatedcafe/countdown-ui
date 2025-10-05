import React from 'react'
import CosmeticsLaunchCountdown from '../_components/CosmeticsLaunchCountdown'
import CosmeticsLaunchCountdownII from '../_components/CosmeticsLaunchCountdownII'
import CosmeticsLaunchCountdownIII from '../_components/CosmeticsLaunchCountdownIII'
import CosmeticsLaunchCountdownIV from '../_components/CosmeticsLaunchCountdownIV'
import CosmeticsLaunchCountdownV from '../_components/CosmeticsLaunchCountdownV'

const page = () => {
  return (
    <div>
      <CosmeticsLaunchCountdown />
      <CosmeticsLaunchCountdownII />
      <CosmeticsLaunchCountdownIII />
      <CosmeticsLaunchCountdownIV />
      <CosmeticsLaunchCountdownV />
    </div>
  )
}

export default page