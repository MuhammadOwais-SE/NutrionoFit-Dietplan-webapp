"use client";
import {useEffect} from 'react'
import dbConnect from '@/lib/dbConnect';


export default function Home() {

    useEffect(()=>{
        const databaseApp= async()=>{
            try {
                await dbConnect();
            } catch (error) {
                console.error("Failed to connect database: ",error)
            }
        }
        databaseApp;
    },[])
  return (
    <div className='text-4xl'>
      This is my home page.
    </div>
  )
}
