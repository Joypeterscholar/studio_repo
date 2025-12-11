'use client';

import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
  Database,
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
  LineChart,
} from '@/app/admin/admin-components';
import { recentSales, recentSignups } from './data';
import { seedDatabase } from '@/lib/seed';
import { useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';


export default function AdminDashboardPage() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleSeedDatabase = async () => {
    if (!firestore) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Firestore is not available.",
        });
        return;
    }
    try {
      await seedDatabase(firestore);
      toast({
        title: "Database Seeded",
        description: "Sample data has been added to Firestore.",
      });
    } catch (error) {
      console.error("Error seeding database:", error);
      toast({
        variant: "destructive",
        title: "Seeding Failed",
        description: "Could not add sample data to Firestore.",
      });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,273</div>
            <p className="text-xs text-muted-foreground">
              +12.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Seed Database</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Button onClick={handleSeedDatabase}>
                    Seed Data
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Populate Firestore with sample data.
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
                Recent signups from the last 7 days.
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
                  <TableHead className="hidden xl:table-column">Type</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Status
                  </TableHead>
                  <TableHead className="hidden xl:table-column">
                    Date
                  </TableHead>
                  <TableHead className="text-right">Age</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSignups.map((signup) => (
                    <TableRow key={signup.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                                <AvatarImage src={signup.avatarUrl} alt="Avatar" />
                                <AvatarFallback>{signup.fallback}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{signup.name}</div>
                        </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                        {signup.type}
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                        {signup.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                        {signup.date}
                    </TableCell>
                    <TableCell className="text-right">{signup.age}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {recentSales.map((sale) => (
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
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ActivityChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
