import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ServicesPage from '@/components/pages/ServicesPage';
import EngagementPage from '@/components/pages/EngagementPage';
import ProcessPage from '@/components/pages/ProcessPage';
import CaseStudiesPage from '@/components/pages/CaseStudiesPage';
import FounderLetterPage from '@/components/pages/FounderLetterPage';
import ApplicationPage from '@/components/pages/ApplicationPage';
import FAQPage from '@/components/pages/FAQPage';
import PrivacyPage from '@/components/pages/PrivacyPage';
import TermsPage from '@/components/pages/TermsPage';
import PhilosophyPage from '@/components/pages/PhilosophyPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "services",
        element: <ServicesPage />,
        routeMetadata: {
          pageIdentifier: 'services',
        },
      },
      {
        path: "engagement",
        element: <EngagementPage />,
        routeMetadata: {
          pageIdentifier: 'engagement',
        },
      },
      {
        path: "process",
        element: <ProcessPage />,
        routeMetadata: {
          pageIdentifier: 'process',
        },
      },
      {
        path: "case-studies",
        element: <CaseStudiesPage />,
        routeMetadata: {
          pageIdentifier: 'case-studies',
        },
      },
      {
        path: "founder-letter",
        element: <FounderLetterPage />,
        routeMetadata: {
          pageIdentifier: 'founder-letter',
        },
      },
      {
        path: "application",
        element: <ApplicationPage />,
        routeMetadata: {
          pageIdentifier: 'application',
        },
      },
      {
        path: "faq",
        element: <FAQPage />,
        routeMetadata: {
          pageIdentifier: 'faq',
        },
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
        routeMetadata: {
          pageIdentifier: 'privacy',
        },
      },
      {
        path: "terms",
        element: <TermsPage />,
        routeMetadata: {
          pageIdentifier: 'terms',
        },
      },
      {
        path: "philosophy",
        element: <PhilosophyPage />,
        routeMetadata: {
          pageIdentifier: 'philosophy',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
