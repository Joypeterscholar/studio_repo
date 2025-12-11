'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';

const allPages = [
  { href: '/home', label: 'Home Feed' },
  { href: '/discover', label: 'Discover' },
  { href: '/discover-map', label: 'Discover (Map)' },
  { href: '/discover-from', label: 'Discover From' },
  { href: '/matches', label: 'Matches' },
  { href: '/likes', label: 'Likes' },
  { href: '/connections', label: 'Connections' },
  { href: '/messages', label: 'Messages' },
  { href: '/messages/user_2', label: 'Conversation with a User' },
  { href: '/profile', label: 'My Profile' },
  { href: '/user/user_3', label: 'View Another User Profile' },
  { href: '/post/post_1', label: 'View Post' },
  { href: '/create-post', label: 'Create Post' },
  { href: '/create-status', label: 'Create Status' },
  { href: '/recent-posts', label: 'My Recent Posts' },
  { href: '/story', label: 'Story Page' },
  { href: '/wallet', label: 'Wallet' },
  { href: '/buy-credits', label: 'Buy Credits' },
  { href: '/buy-credits-v1', label: 'Buy Credits (V1)' },
  { href: '/buy-credits-v2', label: 'Buy Credits (V2)' },
  { href: '/send-credits', label: 'Send Credits' },
  { href: '/send-credits-v1', label: 'Send Credits (V1)' },
  { href: '/settings', label: 'Settings' },
  { href: '/notifications', label: 'Notifications' },
  { href: '/search', label: 'Search' },
  { href: '/search-suggestions', label: 'Search Suggestions' },
  { href: '/block-user', label: 'Block User Confirmation' },
  { href: '/delete-account', label: 'Delete Account Confirmation' },
  { href: '/interests', label: 'Interests Selection' },
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Sign Up' },
  { href: '/reset-password', label: 'Reset Password' },
  { href: '/password-reset-code', label: 'Password Reset Code' },
  { href: '/new-password', label: 'New Password' },
  { href: '/verify-email', label: 'Verify Email' },
  { href: '/verify-email-success', label: 'Verify Email Success' },
  { href: '/video-call/user_4', label: 'Video Call' },
  { href: '/admin', label: 'Admin Dashboard' },
];


export default function Onboarding() {

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6">
        <header className="flex items-center justify-center mb-8">
            <Logo isLinqUp className="w-40 text-primary" />
        </header>
        <main className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Application Testing Hub</h1>
                <p className="text-muted-foreground mt-2">Use this page to navigate to and test every feature of your application.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allPages.sort((a,b) => a.label.localeCompare(b.label)).map(page => (
                    <Link href={page.href} key={page.href} passHref>
                       <Button variant="outline" className="w-full h-auto justify-start text-left py-3 rounded-lg">
                           {page.label}
                       </Button>
                    </Link>
                ))}
            </div>

            <div className="text-center mt-12">
                 <Link href="/home" passHref>
                       <Button size="lg">Start Using The App</Button>
                 </Link>
            </div>
        </main>
    </div>
  );
}
