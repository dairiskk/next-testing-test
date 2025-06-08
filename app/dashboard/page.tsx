
'use client'
import type { NextPage } from "next";
import Navbar from "@/components/custom/navbar";
import Post from "@/components/custom/post";




const DashBoard: NextPage = () => {

  return (
      <>
        <Navbar></Navbar>
          <Post username={'dairis'} imageSrc={'https://picsum.photos/800/600'}/>
          <Post username={'dairis'} imageSrc={'https://picsum.photos/800/600'}/>
          <Post username={'dairis'} imageSrc={'https://picsum.photos/800/600'}/>

      </>
  );
};

export default DashBoard;
