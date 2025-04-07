import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import BookDetail from "@/pages/book-detail";
import BlogDetail from "@/pages/blog-detail";
import ProjectDetail from "@/pages/project-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/books/:id" component={BookDetail} />
      <Route path="/blogs/:id" component={BlogDetail} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
