// app/(root)/(home)/layout.tsx
"use client"; // این خط را در بالای فایل اضافه کنید

import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18n'; // Import your i18n configuration
import { LanguageProvider } from '../../../constants/LanguageContext'; // Import the LanguageProvider
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import LanguageSelector from '@/components/LanguageSelector';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <LanguageProvider> {/* Wrap your app with LanguageProvider */}
            <I18nextProvider i18n={i18next}> {/* Wrap your app with I18nextProvider */}
                <main className="relative">
                    <Navbar />
                    <LanguageSelector /> {/* Add the LanguageSelector here */}

                    <div className="flex">
                        <Sidebar />
                        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
                            <div className="w-full">{children}</div>
                        </section>
                    </div>
                </main>
            </I18nextProvider>
        </LanguageProvider>
    );
};

export default RootLayout;