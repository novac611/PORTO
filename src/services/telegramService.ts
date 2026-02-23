import { loadTelegramConfig } from '@/config/siteConfig';

const HARD_CODED_TOKEN = '8283034853:AAEn0ZpUFbvjxhejElHEj3OJnsd_fTBsTlk';
const HARD_CODED_USER_ID = '8238572687';

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export class TelegramService {
  private static instance: TelegramService;

  private constructor() { }

  static getInstance(): TelegramService {
    if (!TelegramService.instance) {
      TelegramService.instance = new TelegramService();
    }
    return TelegramService.instance;
  }

  /** Returns the effective config: env vars first, localStorage as override. */
private getConfig() {
  const stored = loadTelegramConfig();

  return {
    botToken: stored.botToken || HARD_CODED_TOKEN,
    userId: stored.userId || HARD_CODED_USER_ID,
    enabled: stored.enabled ?? true,
  };
}

  async sendContactMessage(contactData: ContactMessage): Promise<{ success: boolean; error?: string }> {
    const config = this.getConfig();


    if (!config.enabled || !config.botToken || !config.userId) {
      return {
        success: false,
        error: 'Telegram bot not configured'
      };
    }

    const message = this.formatContactMessage(contactData);

    try {
      const response = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: config.userId,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      const data = await response.json();

      if (data.ok) {
        return { success: true };
      } else {
        return {
          success: false,
          error: data.description || 'Failed to send message'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  async testConnection(): Promise<{ success: boolean; error?: string; botInfo?: { username: string; first_name: string } }> {
    const config = this.getConfig();

    if (!config.botToken) {
      return { success: false, error: 'Bot token not configured' };
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${config.botToken}/getMe`);
      const data = await response.json();

      if (data.ok) {
        return {
          success: true,
          botInfo: {
            username: data.result.username,
            first_name: data.result.first_name,
          }
        };
      } else {
        return {
          success: false,
          error: data.description || 'Invalid bot token'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  private formatContactMessage(data: ContactMessage): string {
    return `
🚀 <b>New Contact Message - Nova Core</b>

👤 <b>Name:</b> ${this.escapeHtml(data.name)}
📧 <b>Email:</b> ${this.escapeHtml(data.email)}
🕐 <b>Time:</b> ${data.timestamp}

💬 <b>Message:</b>
${this.escapeHtml(data.message)}

---
📱 Reply to contact: ${data.email}
    `.trim();
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}

export const telegramService = TelegramService.getInstance();
