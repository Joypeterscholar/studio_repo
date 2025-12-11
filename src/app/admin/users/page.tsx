
'use client';

import * as React from 'react';
import Image from 'next/image';
import { File, ListFilter, MoreHorizontal, PlusCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUsers } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { placeholderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => {
    return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};


export default function AdminUsersPage() {
  const { data: users, loading } = useUsers();

  const TableSkeleton = () => (
    Array.from({length: 10}).map((_, i) => (
        <TableRow key={i}>
            <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-12 w-12 rounded-full" />
            </TableCell>
            <TableCell><Skeleton className="h-6 w-32" /></TableCell>
            <TableCell><Skeleton className="h-6 w-16" /></TableCell>
            <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-24" /></TableCell>
            <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-40" /></TableCell>
            <TableCell>
                <Skeleton className="h-8 w-8" />
            </TableCell>
        </TableRow>
    ))
  );

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="banned" className="hidden sm:flex">
            Banned
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Banned</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add User
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage your users and view their profiles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Location
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Interests
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? <TableSkeleton /> : users.map((user) => {
                    const image = user.image ? findImage(user.image.id) : placeholderImages[0];
                    return (
                        <TableRow key={user.id}>
                        <TableCell className="hidden sm:table-cell">
                        <Image
                            alt="User avatar"
                            className="aspect-square rounded-full object-cover"
                            height="48"
                            src={image.imageUrl}
                            width="48"
                            data-ai-hint={image.imageHint}
                        />
                        </TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>
                        <Badge variant={user.isOnline ? 'default' : 'outline'}
                            className={user.isOnline ? 'bg-green-500 hover:bg-green-600' : ''}
                        >
                            {user.isOnline ? 'Online' : 'Offline'}
                        </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        {user.location}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                        {user.interests.slice(0, 3).join(', ')}
                        </TableCell>
                        <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                                Ban
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    )
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
                {loading ? <Skeleton className="h-4 w-32" /> : `Showing <strong>1-${users.length}</strong> of <strong>${users.length}</strong> users`}
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
