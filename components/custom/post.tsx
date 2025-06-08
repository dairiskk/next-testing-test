"use client";
import { Heart, MessageCircle, Share } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PostProps {
    username: string;
    avatarSrc?: string;
    imageSrc?: string; // optional, uses default if not provided
    caption?: string;
    likes?: number;
    comments?: number;
}

export default function Post({
                                 username,
                                 avatarSrc,
                                 imageSrc = "https://picsum.photos/800/600",
                                 caption,
                                 likes = 0,
                                 comments = 0,
                             }: PostProps) {
    return (
        // Ensure the post is positioned below a fixed navbar (h-16)
        <div className="mt-16">
            <Card className="w-full max-w-md md:max-w-lg mx-auto bg-color-card shadow-lg rounded-lg overflow-hidden">
                {/* Post Header */}
                <CardHeader className="flex items-center p-4">
                    <Avatar className="h-10 w-10">
                        {avatarSrc ? (
                            <AvatarImage src={avatarSrc} alt={username} />
                        ) : (
                            <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                        )}
                    </Avatar>
                    <span className="ml-3 font-semibold text-color-foreground">
            {username}
          </span>
                </CardHeader>

                {/* Post Image using native <img> to avoid Next.js domain config */}
                <CardContent className="p-0">
                    <div className="w-full h-64 md:h-96 relative">
                        <img
                            src={imageSrc}
                            alt="Post image"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </CardContent>

                {/* Post Actions & Info */}
                <CardFooter className="flex flex-col p-4 space-y-3">
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon">
                            <Heart className="text-color-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <MessageCircle className="text-color-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Share className="text-color-foreground" />
                        </Button>
                    </div>

                    {/* Likes Count */}
                    <div className="text-sm font-medium text-color-foreground">
                        {likes} {likes === 1 ? 'like' : 'likes'}
                    </div>

                    {/* Caption */}
                    {caption && (
                        <div className="text-sm text-color-foreground">
                            <span className="font-semibold mr-1">{username}</span>
                            {caption}
                        </div>
                    )}

                    {/* Comments Link */}
                    <button className="text-xs text-color-secondary hover:underline self-start">
                        View all {comments} {comments === 1 ? 'comment' : 'comments'}
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
}
