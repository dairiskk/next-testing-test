
'use client'
import type { NextPage } from "next";
import Navbar from "@/components/custom/navbar";
import Post from "@/components/custom/post";




const DashBoard: NextPage = () => {
    const posts = [
        {
            username: "john_doe",
            avatarSrc: "/avatars/john.png",
            imageSrc: "https://picsum.photos/id/1018/800/600",
            caption: "Beautiful day in the city!",
            likes: 128,
            comments: 34,
        },
        {
            username: "jane_smith",
            caption: "New project launched 🚀",
            likes: 240,
            comments: 12,
        },
    ];
  return (
      <>
          <Navbar></Navbar>
          <div className="space-y-1 px-0">
              {posts.map((post, idx) => (
                  <Post key={idx} {...post} />
              ))}
          </div>

      </>
  );
};

export default DashBoard;
