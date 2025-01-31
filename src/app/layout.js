import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Components/header/Header";
import Footer from "./Components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Live View Page -  348 fresh zone Template",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAk1BMVEUBaskAZsoAZMoAZcwAZ8wAaMwAZ8oAZ8kAZccAZckAZssAZ8sAY8sAXsd5n9lShtIAWcfe6fj////P3fIAWcPH1+8AWchznt26zu9EgNNmldc4ec8vd9KhueKcteBajtSRreCxyO3v9fwAQcDp7/oAXs4ARbwfcc4ATrwAUcGxxOoAU8sMZ8IAYsEAWb86e8y6yer/nq/xAAABe0lEQVR4AVXSBbbDIBRFUXgkEKxC3d11/qP79zWL/vTUu5EKQkgi1axAZakNEpUx1nF4z3MaMTHaytbovXNSSkhWK6iCgRDoi7pGa4kCSaxXo89sgbDYapN0eA36Ji2JYF2nm3p97Afi9bX2BXIElCRSGnSwdsAaMZIp+cEpCiK44SilsYpxMp3NW4vlKsbVerHG2ChC2CRuu+viLqHNOKH9MB6A4y3b5rjHQ6+XcqMhkDonLHvsnzFmfT5Cx+LSTul6A0pi7BPj/fFcpDS14pXSG6gczbFPP1yAj8dzCTT/qIDvL9YzJxl52U38QfPFABzcwmWfl22ikwmfaHLB96yq5xpINmNRdLr5RzA2YuYoOOCAsSz8ablYtGJ7upLazabTeVm66WoSo8DZ0DbGGDQR4Q/BPY6Qp6AKJZRGUudKXXKe/zUnnP6E+XxXh9WQI6GsbpQZyV80jRGwzzHRMp83Vj5mjk+p/RwwzADUsSEPI2BlmmEYs5YWmT95/Cm2zxaRWAAAAABJRU5ErkJggg=="
        />
      </head>
      <body className="text-[#6a6651] font-[Lucida Sans Unicode, Lucida Grande, sans-serif] text-xs leading-[1.4] bg-[#faf8ec] flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow my-5">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

