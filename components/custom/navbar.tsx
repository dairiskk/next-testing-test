"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const navItems = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <header className="w-full bg-color-card bg-opacity-100 shadow-md fixed top-0 left-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-xl font-bold text-color-primary">
                        MyLogo
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        {navItems.map(item => (
                            <Link key={item.href}
                                  href={item.href}
                                  className="text-color-foreground hover:text-color-primary font-medium transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setOpen(prev => !prev)}>
                            {open ? <X /> : <Menu />}
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${open ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-3/4 bg-color-card bg-opacity-100 p-6 shadow-lg transition-transform duration-300 ease-in-out z-50 ${open ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between mb-8">
                    <span className="text-lg font-semibold text-color-foreground">Menu</span>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                        <X />
                    </Button>
                </div>
                <div className="flex flex-col space-y-6">
                    {navItems.map(item => (
                        <Link key={item.href}
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="text-lg font-semibold text-color-foreground hover:text-color-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
