import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  
  export default function AdminPostsPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
          <CardDescription>Manage user-generated posts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Post management coming soon.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  