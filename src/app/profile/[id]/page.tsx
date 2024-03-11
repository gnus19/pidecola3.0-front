"use client"

import { ProfileDetails } from "@/components/ProfileDetails"

export default function Page({params}: {params:{ params: {id : number}}}) {
  return (
    <ProfileDetails params={params}/>
  )
}