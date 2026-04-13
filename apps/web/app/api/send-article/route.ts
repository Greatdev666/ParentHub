import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, article } = await req.json();

    if (!email || !article || !article.title || !article.url) {
      return NextResponse.json(
        { error: "Missing required fields (email, article title, or url)." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set.");
      return NextResponse.json(
        { error: "Email service is not configured on the server." },
        { status: 500 }
      );
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${article.title}</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px; color: #333; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
          .header { background: #0f172a; padding: 24px; text-align: center; }
          .logo { color: white; font-size: 24px; font-weight: 800; margin: 0; }
          .logo span { color: #f97316; }
          .content { padding: 32px; }
          h1 { color: #0f172a; margin-top: 0; font-size: 24px; line-height: 1.3; }
          p { color: #475569; font-size: 16px; line-height: 1.6; }
          .btn-container { text-align: center; margin-top: 32px; margin-bottom: 16px; }
          .btn { background: #f97316; color: white !important; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; }
          .footer { text-align: center; padding: 24px; color: #94a3b8; font-size: 14px; background: #f8fafc; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 class="logo">Parent<span>Hub</span></h2>
          </div>
          <div class="content">
            <h1>${article.title}</h1>
            <p>${article.excerpt || "We saved this article for you to read later. See the full post on ParentHub!"}</p>
            <div class="btn-container">
              <a href="${article.url}" class="btn">Read Full Article</a>
            </div>
            <p style="font-size: 14px; color: #64748b; margin-top: 32px;">You are receiving this email because someone (hopefully you!) requested a link to this article.</p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} ParentHub. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    const data = await resend.emails.send({
      from: "ParentHub <noreply@resend.dev>", // Note: For production, use your verified domain
      to: email,
      subject: `Your ParentHub Article: ${article.title}`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, id: data.data?.id });
  } catch (error) {
    console.error("Resend API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending the email." },
      { status: 500 }
    );
  }
}
