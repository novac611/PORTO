import React, { createContext, useContext, useState } from 'react';
import {
    type SiteConfig,
    loadSiteConfig,
    type TelegramConfig,
    loadTelegramConfig,
} from '@/config/siteConfig';

interface SiteConfigContextType {
    config: SiteConfig;
    telegramConfig: TelegramConfig;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
    const [config] = useState<SiteConfig>(loadSiteConfig);
    const [telegramConfig] = useState<TelegramConfig>(loadTelegramConfig);

    return (
        <SiteConfigContext.Provider value={{ config, telegramConfig }}>
            {children}
        </SiteConfigContext.Provider>
    );
}

export function useSiteConfig() {
    const context = useContext(SiteConfigContext);
    if (context === undefined) {
        throw new Error('useSiteConfig must be used within a SiteConfigProvider');
    }
    return context;
}


