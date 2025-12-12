
'use client';

import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ActivityChart,
  BarChart,
} from '@/app/admin/admin-components';
import { useUsers } from '@/firebase';
import type { User } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardPage() {
  const { data: users, loading: usersLoading } = useUsers();

  const recentSignups = users.slice(0, 5);
  const recentSales: any[] = [];

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              No sales data available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {usersLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{users.length}</div>}
            <p className="text-xs text-muted-foreground">
              +0% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No activity data available
            </p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                    No subscription data
                </p>
            </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Signups</CardTitle>
              <CardDescription>
                Recent signups from your user base.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/admin/users">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden sm:table-cell">Online</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Location
                  </TableHead>
                  <TableHead className="text-right">Age</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersLoading ? Array.from({length: 5}).map((_, i) => (
                     <TableRow key={i}>
                        <TableCell><Skeleton className="h-9 w-full" /></TableCell>
                        <TableCell className="hidden sm:table-cell"><Skeleton className="h-6 w-16" /></TableCell>
                        <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-6 w-8 ml-auto" /></TableCell>
                    </TableRow>
                )) : recentSignups.map((user: User) => (
                    <TableRow key={user.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src={user.image.imageUrl} alt="Avatar" />
                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{user.name}</div>
                        </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant={user.isOnline ? 'default' : 'outline'}>
                        {user.isOnline ? 'Online' : 'Offline'}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {user.location}
                    </TableCell>
                    <TableCell className="text-right">{user.age}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>A list of recent credit purchases.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
             {usersLoading ? Array.from({length: 5}).map((_, i) => (
                 <div key={i} className="flex items-center gap-4">
                     <Skeleton className="h-9 w-9 rounded-full" />
                     <div className="grid gap-1 w-full">
                         <Skeleton className="h-4 w-2/3" />
                         <Skeleton className="h-3 w-1/2" />
                     </div>
                     <Skeleton className="h-5 w-1/4 ml-auto" />
                 </div>
             )) : recentSales.map((sale) => (
                 <div key={sale.id} className="flex items-center gap-4">
                 <Avatar className="hidden h-9 w-9 sm:flex">
                   <AvatarImage src={sale.avatarUrl} alt="Avatar" />
                   <AvatarFallback>{sale.fallback}</AvatarFallback>
                 </Avatar>
                 <div className="grid gap-1">
                   <p className="text-sm font-medium leading-none">{sale.name}</p>
                   <p className="text-sm text-muted-foreground">
                     {sale.email}
                   </p>
                 </div>
                 <div className="ml-auto font-medium">{sale.amount}</div>
               </div>
            ))}
             {!usersLoading && recentSales.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No recent sales.</p>
             )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>New vs. Active users over the last week.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ActivityChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
            <CardDescription>A breakdown of users by age group.</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
