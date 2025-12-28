import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContractSignedRequest {
  contractId: string;
  clientName: string;
  clientEmail?: string;
  tenantId: string;
  signedAt: string;
}

async function sendEmail(to: string[], subject: string, html: string, fromName: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `${fromName} <onboarding@resend.dev>`,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return response.json();
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contractId, clientName, clientEmail, tenantId, signedAt }: ContractSignedRequest = await req.json();

    console.log("Processing contract signed notification:", { contractId, clientName, tenantId });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch tenant info
    const { data: tenant, error: tenantError } = await supabase
      .from("tenants")
      .select("name, whatsapp_number")
      .eq("id", tenantId)
      .single();

    if (tenantError) {
      console.error("Error fetching tenant:", tenantError);
    }

    const tenantName = tenant?.name || "Bella Arte";
    const tenantPhone = tenant?.whatsapp_number || "";
    const signedDate = new Date(signedAt).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Send email to client if email is provided
    if (clientEmail) {
      console.log("Sending confirmation email to client:", clientEmail);

      const clientEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">✅ Contrato Assinado com Sucesso!</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="font-size: 16px;">Olá <strong>${clientName}</strong>,</p>
            
            <p>Seu contrato foi assinado digitalmente com sucesso!</p>
            
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>📅 Data da Assinatura:</strong> ${signedDate}</p>
              <p style="margin: 0;"><strong>✍️ Assinado por:</strong> ${clientName}</p>
            </div>
            
            <p>Este e-mail serve como confirmação da sua assinatura digital. Guarde-o para seus registros.</p>
            
            <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #065f46; font-size: 14px;">
                🔒 <strong>Assinatura Digital Verificada</strong><br>
                Sua assinatura foi registrada com data, hora e informações do dispositivo para garantir a autenticidade do documento.
              </p>
            </div>
            
            ${tenantPhone ? `
            <p style="text-align: center; margin-top: 30px;">
              <a href="https://wa.me/${tenantPhone.replace(/\D/g, '')}" style="display: inline-block; background: #25d366; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold;">
                💬 Entrar em contato via WhatsApp
              </a>
            </p>
            ` : ''}
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
              ${tenantName}<br>
              Este é um e-mail automático, por favor não responda.
            </p>
          </div>
        </body>
        </html>
      `;

      const clientEmailResponse = await sendEmail(
        [clientEmail],
        `✅ Contrato Assinado - ${tenantName}`,
        clientEmailHtml,
        tenantName
      );

      console.log("Client email sent:", clientEmailResponse);
    }

    // Get tenant owner email to notify them
    const { data: ownerData } = await supabase
      .from("tenants")
      .select("owner_id")
      .eq("id", tenantId)
      .single();

    if (ownerData?.owner_id) {
      const { data: userData } = await supabase.auth.admin.getUserById(ownerData.owner_id);
      
      if (userData?.user?.email) {
        console.log("Sending notification to tenant owner:", userData.user.email);

        const ownerEmailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🎉 Contrato Assinado!</h1>
            </div>
            
            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px;">Boas notícias!</p>
              
              <p>O cliente <strong>${clientName}</strong> acabou de assinar o contrato digitalmente.</p>
              
              <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0;"><strong>👤 Cliente:</strong> ${clientName}</p>
                ${clientEmail ? `<p style="margin: 0 0 10px 0;"><strong>📧 Email:</strong> ${clientEmail}</p>` : ''}
                <p style="margin: 0;"><strong>📅 Data:</strong> ${signedDate}</p>
              </div>
              
              <p>Acesse o painel administrativo para visualizar a assinatura e baixar o contrato em PDF.</p>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0;">
                Sistema de Contratos - ${tenantName}
              </p>
            </div>
          </body>
          </html>
        `;

        const ownerEmailResponse = await sendEmail(
          [userData.user.email],
          `🎉 Novo Contrato Assinado - ${clientName}`,
          ownerEmailHtml,
          "Sistema de Contratos"
        );

        console.log("Owner notification email sent:", ownerEmailResponse);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contract-signed-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
