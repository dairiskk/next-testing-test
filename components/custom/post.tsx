"use client";

import { Heart, MessageCircle, Share } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PostProps {
    username: string;
    avatarSrc?: string;
    imageSrc?: string;
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
        <div className="mt-6 px-4">
            <Card className="w-full max-w-2xl mx-auto rounded-xl border bg-background shadow-sm overflow-hidden">
                {/* Header: tight like Instagram */}
                <div className="flex items-center gap-3 px-4 py-1.5">
                    <Avatar className="h-8 w-8">
                        {avatarSrc ? (
                            <AvatarImage src={avatarSrc} alt={username} />
                        ) : (
                            <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
                        )}
                    </Avatar>
                    <span className="text-sm font-medium text-foreground leading-none">
            {username}
          </span>
                </div>

                {/* Image */}
                <div className="w-full h-72 md:h-96">
                    <img
                        src={imageSrc}
                        alt="Post content"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-5 px-4 py-3">
                    <ActionButton icon={<Heart className="w-5 h-5" />} label="Like" />
                    <ActionButton icon={<MessageCircle className="w-5 h-5" />} label="Comment" />
                    <ActionButton icon={<Share className="w-5 h-5" />} label="Share" />
                </div>

                {/* Info Section */}
                <div className="px-4 pb-4 space-y-2">
                    {/* Likes */}
                    <div className="text-sm font-semibold text-foreground">
                        {likes} {likes === 1 ? "like" : "likes"}
                    </div>

                    {/* Caption */}
                    {caption && (
                        <div className="text-sm text-foreground leading-snug">
                            <span className="font-semibold mr-1">{username}</span>
                            {caption}
                        </div>
                    )}

                    {/* View Comments */}
                    <button className="text-xs text-muted-foreground hover:underline">
                        View all {comments} {comments === 1 ? "comment" : "comments"}
                    </button>
                </div>
            </Card>
        </div>
    );
}

// Icon button component
function ActionButton({
                          icon,
                          label,
                      }: {
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label={label}
            className="hover:bg-accent text-muted-foreground hover:text-foreground transition"
        >
            {icon}
        </Button>
    );
}
