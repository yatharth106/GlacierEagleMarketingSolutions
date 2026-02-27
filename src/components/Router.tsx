import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import PhilosophyFrameworkPage from '@/components/pages/PhilosophyFrameworkPage';
import ServicesFrameworkPage from '@/components/pages/ServicesFrameworkPage';
import CaseStudiesDetailPage from '@/components/pages/CaseStudiesDetailPage';
import FAQDetailPage from '@/components/pages/FAQDetailPage';
import ApplyPage from '@/components/pages/ApplyPage';
import PrivacyPage from '@/components/pages/PrivacyPage';
import TermsPage from '@/components/pages/TermsPage';

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
        path: "philosophy",
        element: <PhilosophyFrameworkPage />,
        routeMetadata: {
          pageIdentifier: 'philosophy',
        },
      },
      {
        path: "framework",
        element: <PhilosophyFrameworkPage />,
        routeMetadata: {
          pageIdentifier: 'framework',
        },
      },
      {
        path: "services",
        element: <ServicesFrameworkPage />,
        routeMetadata: {
          pageIdentifier: 'services',
        },
      },
      {
        path: "case-studies",
        element: <CaseStudiesDetailPage />,
        routeMetadata: {
          pageIdentifier: 'case-studies',
        },
      },
      {
        path: "faq",
        element: <FAQDetailPage />,
        routeMetadata: {
          pageIdentifier: 'faq',
        },
      },
      {
        path: "apply",
        element: <ApplyPage />,
        routeMetadata: {
          pageIdentifier: 'apply',
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
