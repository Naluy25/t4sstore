
/**
 * Utility functions for handling webhook notifications
 */

interface PurchaseData {
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
    paymentMethod: string;
    notes?: string;
    accountName: string;
    characterName: string;
    characterId: string;
    discordId: string;
  };
  orderInfo: {
    items: {
      name: string;
      price: number;
      quantity: number;
      total: number;
    }[];
    subtotal: number;
    discount: number;
    finalTotal: number;
    promoCode?: string;
    orderDate: string;
  };
}

/**
 * Send purchase data to Discord webhook
 */
export const sendPurchaseToDiscord = async (purchaseData: PurchaseData): Promise<boolean> => {
  try {
    const webhookUrl = "https://discord.com/api/webhooks/1395456999633981551/UtVIS7BFNUJ_LN40sH00ujHOzkYTjxFiHRM3qm8KOhcGrPyFs_pbm82JxHmdLk5vgcQq";
    
    // Format the order items into a nice table format for Discord
    let itemsTable = "```\n";
    itemsTable += "🛒 المنتج              | سـعـر | كـمـيـة | مجـموع\n";
    itemsTable += "----------------------|------|------|-------\n";
    purchaseData.orderInfo.items.forEach(item => {
      const name = item.name.padEnd(20, ' ');
      const price = `${item.price.toFixed(2)}`.padStart(5, ' ');
      const quantity = `${item.quantity}`.padStart(3, ' ');
      const total = `${item.total.toFixed(2)}`.padStart(6, ' ');
      itemsTable += `${name} | ${price} | ${quantity} | ${total} $\n`;
    });
    itemsTable += "```";
    
    // Create Discord embed for the webhook
    const embed = {
      title: "🛒 طلب جديد",
      color: 0x4CAF50, // Green color
      timestamp: new Date().toISOString(),
      footer: {
        text: "متجر الفور سيزون | نظام الطلبات",
      },
      fields: [
        {
          name: "👤 بيانات العميل",
          value: [
            `**اسم الحساب:** ${purchaseData.customerInfo.accountName}`,
            `**اسم الشخصية:** ${purchaseData.customerInfo.characterName}`,
            `**ايدي الشخصية:** ${purchaseData.customerInfo.characterId}`,
            `**ديسكورد:** ${purchaseData.customerInfo.discordId}`
          ].join("\n"),
          inline: false,
        },
        {
          name: "📦 تفاصيل المنتجات",
          value: itemsTable,
          inline: false,
        },
        {
          name: "💰 ملخص الطلب",
          value: [
            `**المجموع الفرعي:** ${purchaseData.orderInfo.subtotal.toFixed(2)} $`,
            purchaseData.orderInfo.discount > 0 ? `**الخصم:** ${purchaseData.orderInfo.discount.toFixed(2)} $` : null,
            purchaseData.orderInfo.promoCode ? `**كود الخصم:** ${purchaseData.orderInfo.promoCode}` : null,
            `**المجموع النهائي:** ${purchaseData.orderInfo.finalTotal.toFixed(2)} $`,
          ].filter(Boolean).join("\n"),
          inline: false,
        }
      ],
    };
    
    // Add notes if available
    if (purchaseData.customerInfo.notes) {
      embed.fields.push({
        name: "📝 ملاحظات",
        value: purchaseData.customerInfo.notes,
        inline: false,
      });
    }
    
    const payload = {
      username: "نظام المبيعات - متجر فور سيزون",
      avatar_url: "https://j.top4top.io/p_34850o5h31.png",
      embeds: [embed],
    };
    
    // Send to Discord
    console.log("Sending order to Discord webhook...");
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      const responseText = await response.text();
      console.error("Discord webhook error:", response.status, responseText);
      return false;
    }
    
    console.log("Order successfully sent to Discord");
    return true;
  } catch (error) {
    console.error("Error sending order to Discord:", error);
    return false;
  }
};
