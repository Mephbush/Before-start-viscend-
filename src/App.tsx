@@ .. @@
 import { Toaster } from "@/components/ui/toaster";
 import { Toaster as Sonner } from "@/components/ui/sonner";
 import { TooltipProvider } from "@/components/ui/tooltip";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
+import VisitorTracker from "@/components/analytics/VisitorTracker";
 import Layout from "./components/layout/Layout";
 import Home from "./pages/Home";
 import About from "./pages/About";
@@ .. @@
       <Toaster />
       <Sonner />
       <BrowserRouter>
+        <VisitorTracker />
         <Routes>
           <Route path="/" element={<Layout />}>
             <Route index element={<Home />} />